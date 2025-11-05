const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
res.send('Hello World');
});

// 1. Create new blog
app.post('/blogs', (req, res) => {
const { title, content } = req.body;

if (!title || !content) {
return res.status(400).send('Title and content are required!');
}

fs.writeFileSync(title, content);
res.send('ok');
});

// 2. Update blog
app.put('/blogs/:title', (req, res) => {
const title = req.params.title;
const { content } = req.body;

if (!content) {
return res.status(400).send('Content is required!');
}

if (!fs.existsSync(title)) {
return res.status(404).send('This post does not exist!');
}

fs.writeFileSync(title, content);
res.send('ok');

});

// 3. Delete blog
app.delete('/blogs/:title', (req, res) => {
const title = req.params.title;

if (fs.existsSync(title)) {
fs.unlinkSync(title);
res.send('ok');
} else {
res.status(404).send('This post does not exist!');
}
});

// 4. Read blog
app.get('/blogs/:title', (req, res) => {
const title = req.params.title;

if (fs.existsSync(title)) {
const post = fs.readFileSync(title, 'utf-8');
res.send(post);
} else {
res.status(404).send('This post does not exist!');
}
});

app.listen(3000, () => {
console.log('Server is running on port 3000');
});
