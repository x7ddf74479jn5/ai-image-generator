const { app } = require("@azure/functions");
const { openai } = require("../../lib/openai");
const axios = require("axios");
const generateSASToke = require("../../lib/generateSASToken");

const { BlobServiceClient } = require("@azure/storage-blob");

const accountName = process.env.accountName;

const containerName = "images";

app.http("generateImage", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    const { prompt } = await request.json();

    console.log(`Prompt is ${prompt}`);

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
    });

    image_url = response.data.data[0].url;
    const res = axios.get(image_url, {
      responseType: "arraybuffer",
    });

    const arrayBuffer = res.data;

    sasToken = await generateSASToken();

    const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net?${sasToken}`);

    const containerClient = blobServiceClient.getContainerClient(containerName);

    const timestamp = new Date().getTime();
    const file_name = `${prompt}_${timestamp}.png`;

    const blockBlobClient = containerClient.getBlockBlobClient(file_name);

    try {
      await blockBlobClient.uploadData(arrayBuffer);
      console.log("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error.message);
    }

    return { body: "Successfully uploaded image" };
  },
});
