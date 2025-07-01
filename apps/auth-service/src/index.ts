
const express = require("express");
const dotenv = require("dotenv");
const prisma = require('./config/prisma.config');
const { redisClient, connectRedis } = require('./config/redis.config');
const authController = require('./controllers/auth.controller');
const { errorHandler } = require('./middlewares/error.middleware');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use((req: any, res: any, next: any) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const PORT = process.env.PORT || 3001;

app.use('/auth', authController);

app.use(errorHandler);

async function startServer() {
  try {
    await prisma.$connect();
    await connectRedis();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
}

startServer();
