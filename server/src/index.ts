import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import http from 'http';
import connectDB from './db/db.js';
import { authRouter } from './routes/auth/auth.route.js';
import regionRouter from './routes/reigon/region.route.js';
import listsRouter from './routes/lists/lists.route.js';
import chatRouter from './routes/chat/chat.route.js';
import { Server } from 'socket.io';
import ChatRoom from './models/ChatRoom.model.js';
import Message from './models/message.model.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const ioServer = http.createServer(app);
const io = new Server(ioServer, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

// 미들웨어
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));

// socket IO
io.on('connection', (socket) => {
  console.log('connected:', socket.id);

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`👥 ${socket.id} joined ${roomId}`);
  });

  socket.on('sendMessage', async (data) => {
    const { roomId, senderId, message } = data;

    const newMessage = await Message.create({ roomId, senderId, message });

    await ChatRoom.findOneAndUpdate(
      { roomId },
      { lastMessage: message, lastUpdated: new Date() },
    );

    io.to(roomId).emit('receiveMessage', {
      roomId,
      senderId,
      message,
      createdAt: newMessage.createdAt,
    });
  });

  socket.on('disconnect', () => {
    console.log('disconnected:', socket.id);
  });
});

// 라우팅
app.use('/auth', authRouter);
app.use('/region', regionRouter);
app.use('/lists', listsRouter);
app.use('/chat', chatRouter);

// 404
app.use((req: Request, res: Response) => {
  res.status(404).send('not Found');
});

// 서버에러 처링
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);

  if (res.headersSent) {
    return next(error);
  }

  const status = error.status || 500;
  const message = status === 500 ? 'Internal Server Error' : error.message;

  res.status(status).json({ error: message });
});

// DB 연결
await connectDB();

// 서버 시작
ioServer.listen(PORT, async () => {
  console.log(`✅ Server listening on port ${PORT}!!`);
});
