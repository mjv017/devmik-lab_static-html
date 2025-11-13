/*
server.js is for defining what the node.js app does.
*/

// Import node express library.
const express = require('express');
// Import node path module.
const path = require('path');
// Import sqlite3 module. verbose() adds extra debug logs.
const sqlite3 = require('sqlite3').verbose();

// Create express application instance.
const app = express();
// Define port number server will listen on.
const PORT = 5000;

// Setup database.
const db = new sqlite3.Database('./wiki.db');
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT
    )`);
})

// Use Express middleware to parse JSON requests.
app.use(express.json());

// Serve static content from the 'site' folder.
app.use(express.static(path.join(__dirname, 'site')));

// Define Get endpoint at /api/notes.
// db.all() fetches all rows from notes.
app.get('/api/notes', (req, res) => {
    db.all("SELECT * FROM notes", [], (err, rows) => {
        if(err) return res.status(500).json(err);
        res.json(rows);
    });
});

// Define post endpoint.
// req.body contains 'title' and 'content' from frontend form.
// ? is a placeholder to prevent SQL injection.
app.post('/api/notes', (req, res) => {
  const { title, content } = req.body;
  db.run("INSERT INTO notes(title, content) VALUES (?, ?)", [title, content], function(err){
    if(err) return res.status(500).json(err);
    res.json({ id: this.lastID, title, content });
  });
});

// Start server. Print message to verify running.
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));