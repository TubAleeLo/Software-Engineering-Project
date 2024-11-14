import express from 'express';
import bodyParser from 'body-parser';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY  // Use environment variable for security
});

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/ask-assistant', async (req, res) => {
  try {
    const { message } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }]
    });

    const assistantMessage = response.choices[0].message.content;
    res.json({ response: assistantMessage });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
