const express = require("express");
const OpenAI = require("openai");
require("dotenv").config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

// handle route
router.route("/:name/:amount/:walletAddress").post(generateSummary);

// response to api call
async function generateSummary(req, res) {
  const name = await req.params.name;
  const amount = await req.params.amount;
  const walletAddress = await req.params.walletAddress;

  const messages = [
    {
      role: "assistant",
      content: "You are a helpful assistant.",
    },
    {
      role: "user",
      content: `Generate a professional payment summary for ${name}. Amount: ${amount} Flow tokens, Wallet Address: ${walletAddress}. (Keep your response reasonably short and return it as a styled and formatted component). Then at the end of the summary, add the tagline: "Thanks for using SwiftPay - Brought to you by Flow Blockchain and Streamr Network.`,
    },
  ];

  const completion = await openai.chat.completions.create({
    // model: "gpt-3.5-turbo",
    model: "gpt-4",
    messages: messages,
  });
  console.log(completion.choices[0].message);
  const theResponse = completion.choices[0].message;

  res.status(200).json(theResponse);
}

// export router
module.exports = router;
