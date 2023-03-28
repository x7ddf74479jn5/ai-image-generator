import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPEN_AI_EKY,
});

export const openai = new OpenAIApi(config);
