import express from 'express';
import bodyParser from 'body-parser';
import OpenAI from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Provide your OpenAI API key here
const openai = new OpenAI({
  apiKey: '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'  // Replace with your actual OpenAI API key
});

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Resolve __dirname (necessary in ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//
let plantData;

//
fs.readFile(path.join(__dirname, 'plants.txt'), 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading plants file:', err);
  } else {
    plantData = data.split('\n').reduce((acc, line) => {
      const [name, description] = line.split(':');
      acc[name.trim()] = description.trim();
      return acc;
    }, {});
    console.log('Plant data loaded:', plantData);
  }
});

// Global variables to store the assistant and thread ID
let assistant;
let thread;

// Create the assistant once when the server starts
/* (async () => {
  try {
    assistant = await openai.beta.assistants.create({
      name: "Plant Helper",
      instructions: "You are a personal plant care assistant. Provide support and instructions for plant care. Do not provide any other support or assistance outside the scope of plant care.",
      model: "gpt-3.5-turbo"
    });
    console.log("Assistant created:", assistant.id);
  } catch (error) {
    console.error("Error creating assistant:", error);
  }
}) ();*/

// Serve the HTML file when accessing the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'chatbot_draft.html'));
});

// Endpoint to handle user messages and communicate with OpenAI Assistant
app.post('/ask-assistant', async (req, res) => {
  try {
    const { message } = req.body;

    // Check if the message contains a plant name
    const plantInfo = Object.entries(plantData).find(([name]) =>
      message.toLowerCase().includes(name.toLowerCase())
    );

    
    if (plantInfo) {
      const [plantName, plantDetails] = plantInfo;
      res.json({ response: `Here's what I know about ${plantName}: ${plantDetails}` });
      return;
    }

    // Check if the thread already exists, if not create one
    if (!thread) {
      thread = await openai.beta.threads.create();
      console.log("New thread created:", thread.id);
    }

    // Add the user's message to the existing thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message
    });

    // Run the assistant on the thread
    let run = await openai.beta.threads.runs.createAndPoll(thread.id, { 
      //assistant_id: assistant.id,
      assistant_id: 'asst_CYcOKzQcQZWclLJuUH7l0V9O',
      //instructions: "Please address the user as Jane Doe. The user has a premium account. Your name is Plant Helper. You are only allowed to provide assistance as it relates to caring for plants. You are expressly forbidden from deviating from these instructions."
    });

    // Check the run status and send the response
    if (run.status === 'completed') {
      const messages = await openai.beta.threads.messages.list(run.thread_id);
      const assistantMessage = messages.data[0].content[0].text.value;
      res.json({ response: assistantMessage });
    } else {
      res.json({ response: "The assistant is still thinking. Please try again." });
    }

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
