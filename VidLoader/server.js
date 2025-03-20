const express = require("express");
const { exec } = require("child_process");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/download", (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: "No URL provided" });

    const command = `yt-dlp -f best -o "downloads/%(title)s.%(ext)s" ${url}`;

    exec(command, (error, stdout, stderr) => {
        if (error) return res.status(500).json({ error: stderr });
        res.json({ message: "Download started", output: stdout });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
