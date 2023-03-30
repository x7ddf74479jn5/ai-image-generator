const { app } = require("@azure/functions");
const axios = require("axios");
const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
const generateSASToken = require("../../lib/generateSASToken");

const accountName = process.env.accountName;
const accountKey = process.env.accountKey;

const containerName = "images";

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, sharedKeyCredential);

app.http("getImages", {
  method: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const imageUrls = [];
    const sasToken = await generateSASToken();

    for await (const blob of containerClient.listBlogsFlat()) {
      const imageUrl = `${blob.name}?${sasToken}`;
      const url = `https://${accountName}.blob.core.windows.net/images/${imageUrl}`;
      imageUrls.push({ url, name: blob.name });
    }

    const sortedImageUrls = imageUrls.sort((a, b) => {
      // draw-a-dinosaur_16261200000000.png
      const aName = a.name.split("_").pop().toString().split(".").shift();
      const bName = b.name.split("_").pop().toString().split(".").shift();
      return bName - aName;
    });

    console.log(`Http function processed request for url "${request.url}"`);

    return {
      jsonBody: {
        imageUrls: sortedImageUrls,
      },
    };
  },
});
