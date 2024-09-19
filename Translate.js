// Example Enmity plugin for translating text in Discord messages
// This example uses LibreTranslate API for simplicity

// Define the plugin metadata
module.exports = {
    name: "Translate Plugin",
    description: "Translates selected text to the desired language",
    version: "1.0.0",
    author: "vonanarchist",
};

// Import necessary libraries from Enmity
const { registerCommand } = require("enmity/commands");
const { sendMessage } = require("enmity/messages");
const fetch = require("enmity/fetch"); // For making HTTP requests

// Register the command to translate text
registerCommand({
    name: "translate",
    description: "Translate the selected text",
    options: [
        {
            name: "text",
            description: "Text to translate",
            type: 3, // Type 3 is for string input
            required: true
        },
        {
            name: "targetLang",
            description: "Language code to translate to (e.g., en, es, fr)",
            type: 3,
            required: true
        }
    ],
    execute: async (args, context) => {
        const textToTranslate = args[0].value;
        const targetLang = args[1].value;

        // Call LibreTranslate API (or any other translation API)
        const url = `https://libretranslate.com/translate`;
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                q: textToTranslate,
                target: targetLang,
            }),
        });

        const data = await response.json();

        // Check if translation was successful
        if (data && data.translatedText) {
            // Send the translated text as a message
            sendMessage(context.channel.id, `Translated Text: ${data.translatedText}`);
        } else {
            sendMessage(context.channel.id, "Translation failed. Please try again.");
        }
    },
});
