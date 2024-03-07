const express = require('express');
const { Translate } = require('@google-cloud/translate').v2;

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Google Translate API client
const translate = new Translate();

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle translation requests
app.post('/translate', async (req, res) => {
    try {
        const { text, targetLanguage } = req.body;

        if (!text || !targetLanguage) {
            return res.status(400).json({ error: 'Text and target language are required.' });
        }

        // Translate the text
        const [translation] = await translate.translate(text, targetLanguage);

        // Send back the translated text
        res.json({ translation });
    } catch (error) {
        console.error('Error translating text:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
