import express from 'express';
import ChatRoom from '../../models/ChatRoom.model.js';

const chatRouter = express.Router();

chatRouter.post('/', async (req, res, next) => {
  const { listingId, buyerId, uploaderId } = req.body;

  try {
    // 밤 만들기 전에 일단 있는 방인가 췤
    let room = await ChatRoom.findOne({
      listingId,
      participants: { $all: [buyerId, uploaderId] },
    });

    if (!room) {
      const roomId = `${listingId}_${buyerId.slice(0, 6)}_${uploaderId.slice(
        0,
        6,
      )}`;

      room = await ChatRoom.create({
        roomId,
        listingId,
        participants: [buyerId, uploaderId],
      });
    }

    res.send({ message: 'created', id: room._id });
  } catch (error) {
    console.log('채팅방 생성 오류');
  }
});

export default chatRouter;
