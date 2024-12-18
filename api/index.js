import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import { AzureOpenAI } from "openai";
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let imageUrl = '';

app.post("/api/generate-image", async (req, res) => {
  const { prompt } = req.body;
  // console.log("sadfghfdsfgh",process.env.AZURE_OPENAI_API_KEY,"dsfghfdsdafg")
  const size = "1024x1024";
  const n = 1;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }
  try {
    const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
    const apiKey = "replace"
    console.log(apiKey,endpoint);
    const deployment = "dall-e-3";
    const apiVersion = "2024-04-01-preview";
    const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });
    const results = await client.images.generate({ prompt, model: "", n, size });
    for (const image of results.data) {
      imageUrl = image.url;
    }
    res.json({ imageUrl })
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to generate image." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});