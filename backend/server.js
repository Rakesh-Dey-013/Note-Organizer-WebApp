import express from 'express';
import fs from 'fs/promises';
import cors from 'cors';
import dotenv from 'dotenv';
import { log } from 'console';
import { title } from 'process';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// ✅ GET all tasks (list of files)
app.get('/api/tasks', async (req, res) => {
    try {
        const files = await fs.readdir('./files');
        // console.log(files);
        res.json(files);

    } catch (error) {
        console.error('Error reading directory : ', error);
        res.status(500).json({ error: 'Failed to read directory' });
    }
});


// ✅ POST create a new task (save file)
app.post('/api/tasks', (req, res) => {
    try {
        const { title, message } = req.body;

        if (!title || !message) {
            return res.status(400).json({ error: 'Title and message are required.' })
        }

        const filename = `./files/${req.body.title.split(' ').join('')}.txt`;

        console.log(req.body);

        fs.writeFile(filename, message);
        console.log(`File created : ${filename}`);

        res.status(201).json({ message: 'Task saved successfully', filename });

    } catch (error) {
        console.error('Error writing file : ', error);
        res.status(500).json({ error: "Failed to save task" });
    }
});


// ✅ GET a single task content by filename
app.get('/api/tasks/:filename', async (req, res) => {
    try {
        const { filename } = req.params;
        const filePath = `./files/${filename}.txt`;
        const message = await fs.readFile(filePath, 'utf-8');
        res.json({ title: filename, message });
    } catch (error) {
        console.error('Error reading file: ', error);
        res.status(404).json({ error: 'File not found' });
    }
})


// ✅ PUT (Update) a task — overwrite existing file content
app.put('/api/tasks/:filename', async (req, res) => {
    try {
        const { filename } = req.params;
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required.' });
        }

        const filePath = `./files/${filename}.txt`;
        await fs.writeFile(filePath, message);

        console.log(`Updated ${filePath}`);
        res.json({ message: `Task ${filename} updated successfully.` });

    } catch (error) {
        console.error('Error updating file: ', error);
        res.status(500).json({ error: 'Failed to update file.' });
    }
});


// ✅ DELETE a task (remove file)
app.delete('/api/tasks/:filename', async (req, res) => {
    try {
        const { filename } = req.params;
        const filePath = `./files/${filename}.txt`;

        await fs.unlink(filePath);
        console.log(`Deleted: ${filePath}`);
        res.json({ message: `Task ${filename} deleted successfully.` });

    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(404).json({ error: 'File not found or failed to delete.' });
    }
})


app.get('/api/health', (req, res) => {
    res.json('API is working.');
});


app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📝 API available at http://localhost:${PORT}/api/health`);
});