const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session
const sessionConfig = require('./config/session');
app.use(session(sessionConfig));

// ✅ Gắn session vào res.locals để view EJS dùng được
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Static
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/suppliers', require('./routes/suppliers'));
app.use('/products', require('./routes/products'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server chạy tại http://localhost:${PORT}`));
