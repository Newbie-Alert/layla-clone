import express from 'express';
import Region from '../../models/Regions.model.js';

const regionRouter = express.Router();

regionRouter.get('/', async (req, res, next) => {
  try {
    const data = await Region.find({}).lean().exec();
    res.status(200).send(data);
  } catch (error) {
    throw Error('region 가져오기 실패');
  }
});

export default regionRouter;
