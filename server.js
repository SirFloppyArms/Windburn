const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3001;
const SECRET_KEY = 'windburn-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.'));

// File paths
const newsFile = path.join(__dirname, 'data', 'news.json');
const usersFile = path.join(__dirname, 'data', 'users.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}

// Initialize news file if it doesn't exist
if (!fs.existsSync(newsFile)) {
  fs.writeFileSync(newsFile, JSON.stringify([], null, 2));
}

// Initialize users file if it doesn't exist
if (!fs.existsSync(usersFile)) {
  const defaultUsers = [
    {
      id: 1,
      name: 'Coach Dave',
      email: 'dave@windburn.local',
      password: bcrypt.hashSync('windburn123', 10) // You should change this
    },
    {
      id: 2,
      name: 'Admin',
      email: 'admin@windburn.local',
      password: bcrypt.hashSync('windburn123', 10) // You should change this
    }
  ];
  fs.writeFileSync(usersFile, JSON.stringify(defaultUsers, null, 2));
}

// Helper functions
const readNews = () => {
  try {
    return JSON.parse(fs.readFileSync(newsFile, 'utf-8'));
  } catch (e) {
    return [];
  }
};

const writeNews = (news) => {
  fs.writeFileSync(newsFile, JSON.stringify(news, null, 2));
};

const isBcryptHash = (value) => /^\$2[aby]\$/.test(value || '');

const normalizeUsers = (users) => {
  let updated = false;
  const normalized = users.map((user) => {
    if (!isBcryptHash(user.password)) {
      updated = true;
      return {
        ...user,
        password: bcrypt.hashSync(user.password, 10)
      };
    }
    return user;
  });

  if (updated) {
    fs.writeFileSync(usersFile, JSON.stringify(normalized, null, 2));
  }

  return normalized;
};

const readUsers = () => {
  try {
    const users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
    return normalizeUsers(users);
  } catch (e) {
    return [];
  }
};

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

// Routes

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  
  const users = readUsers();
  const user = users.find(u => u.email === email);
  
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    SECRET_KEY,
    { expiresIn: '24h' }
  );
  
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

// Get all news
app.get('/api/news', (req, res) => {
  const news = readNews();
  // Sort by date descending
  const sorted = news.sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json(sorted);
});

// Get single news item
app.get('/api/news/:id', (req, res) => {
  const news = readNews();
  const item = news.find(n => n.id === parseInt(req.params.id));
  
  if (!item) {
    return res.status(404).json({ error: 'News item not found' });
  }
  
  res.json(item);
});

// Create news (protected)
app.post('/api/news', verifyToken, (req, res) => {
  const { title, excerpt, content, month, day } = req.body;
  
  if (!title || !excerpt) {
    return res.status(400).json({ error: 'Title and excerpt required' });
  }
  
  const news = readNews();
  const newItem = {
    id: news.length > 0 ? Math.max(...news.map(n => n.id)) + 1 : 1,
    title,
    excerpt,
    content: content || excerpt,
    month: month || new Date().toLocaleDateString('en-US', { month: 'short' }),
    day: day || new Date().getDate(),
    date: new Date().toISOString(),
    author: req.user.name,
    link: req.body.link || '#'
  };
  
  news.push(newItem);
  writeNews(news);
  
  res.status(201).json(newItem);
});

// Update news (protected)
app.put('/api/news/:id', verifyToken, (req, res) => {
  const { title, excerpt, content, month, day, link } = req.body;
  const news = readNews();
  const index = news.findIndex(n => n.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ error: 'News item not found' });
  }
  
  news[index] = {
    ...news[index],
    title: title || news[index].title,
    excerpt: excerpt || news[index].excerpt,
    content: content || news[index].content,
    month: month || news[index].month,
    day: day !== undefined ? day : news[index].day,
    link: link || news[index].link,
    updatedAt: new Date().toISOString()
  };
  
  writeNews(news);
  res.json(news[index]);
});

// Delete news (protected)
app.delete('/api/news/:id', verifyToken, (req, res) => {
  const news = readNews();
  const filteredNews = news.filter(n => n.id !== parseInt(req.params.id));
  
  if (filteredNews.length === news.length) {
    return res.status(404).json({ error: 'News item not found' });
  }
  
  writeNews(filteredNews);
  res.json({ message: 'News item deleted' });
});

app.listen(PORT, () => {
  console.log(`
🏊 Windburn News API Server
=============================
Running on http://localhost:${PORT}
API available at http://localhost:${PORT}/api/news
Admin panel at http://localhost:8000/src/pages/admin.html
  `);
});
