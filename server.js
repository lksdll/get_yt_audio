const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = 3000;

app.get('/download', async (req, res) => {
    const videoUrl = req.query.url;
    if (!videoUrl) {
        return res.status(400).send('No URL provided');
    }
    try {
        res.header('Content-Disposition', 'attachment; filename="audio.mp3"');
        ytdl(videoUrl, { filter: 'audioonly', quality: 'highestaudio' })
            .pipe(res);
    } catch (error) {
        res.status(500).send('Error downloading audio');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});