const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));
app.use(bodyParser.json());

// Paths
const chatLogPath = path.join(__dirname, 'data', 'chatLog.json');

// Initialize chat log file if it doesn't exist
if (!fs.existsSync(chatLogPath)) {
  fs.writeFileSync(chatLogPath, JSON.stringify([]));
}

// Load chat log from file
const loadChatLog = () => JSON.parse(fs.readFileSync(chatLogPath, 'utf8'));

// Save chat log to file
const saveChatLog = (log) => fs.writeFileSync(chatLogPath, JSON.stringify(log, null, 2));

// API endpoint to retrieve chat log
app.get('/api/chat-log', (req, res) => {
  const chatLog = loadChatLog();
  res.json(chatLog);
});

// Mock database for books
let books = [
  { id: 1, title: 'Book One', author: 'Author A', votes: 0 },
  { id: 2, title: 'Book Two', author: 'Author B', votes: 0 },
  { id: 3, title: 'Book Three', author: 'Author C', votes: 0 }
];

app.get('/api/books', (req, res) => res.json(books));

app.post('/api/vote', (req, res) => {
  const { bookId } = req.body;
  const book = books.find(b => b.id === bookId);
  if (book) {
    book.votes += 1;
    res.json({ success: true, votes: book.votes });
  } else {
    res.status(404).json({ success: false, message: 'Book not found' });
  }
});

// Socket.IO
io.on('connection', (socket) => {
  console.log('A user connected');

  // Send the current chat history to the new user
  const chatLog = loadChatLog();
  socket.emit('chatHistory', chatLog);

  // Handle new chat messages
  socket.on('newMessage', (message) => {
    const chatLog = loadChatLog();
    chatLog.push(message);
    saveChatLog(chatLog);

    // Broadcast the new message to all connected clients
    io.emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
