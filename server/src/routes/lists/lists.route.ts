import express from 'express';
import Lists from '../../models/Lists.model.js';
import Region from '../../models/Regions.model.js';

const listsRouter = express.Router();

listsRouter.get('/', async (req, res, next) => {
  const param: {
    gu?: string;
    dong?: string;
  } = req.query;

  // 기본 - 구단위 그룹화 하고 매물 개수, 구 평균좌표를 계산해서 내려쥼
  const lists = await Lists.aggregate([
    { $group: { _id: '$cgg_nm', count: { $sum: 1 } } },
    {
      $lookup: {
        from: 'regions',
        let: { guName: '$_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$gu', '$$guName'] } } },
          {
            $group: {
              _id: '$gu',
              gu_coord: { $first: '$gu_coord' },
            },
          },
        ],
        as: 'region',
      },
    },
    {
      $unwind: '$region',
    },
    {
      $project: {
        _id: 0,
        gu: '$_id',
        count: 1,
        gu_coord: '$region.gu_coord',
      },
    },
  ]);

  // 선택한 구 내에 있는 동들의 그룹. 매물 개수, 동 평균좌표 계산해서 내려쥼
  if (param.gu) {
    const lists = await Lists.aggregate([
      { $match: { cgg_nm: param.gu } },
      {
        $group: {
          _id: '$stdg_nm',
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'regions',
          let: { dongName: '$_id', guName: param.gu },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$dong', '$$dongName'] },
                    { $eq: ['$gu', '$$guName'] },
                  ],
                },
              },
            },
            {
              $group: {
                _id: '$dong',
                dongCoord: { $first: '$dongCoord' },
              },
            },
          ],
          as: 'region',
        },
      },

      {
        $unwind: '$region',
      },

      {
        $project: {
          _id: 0,
          dong: '$_id',
          count: 1,
          dongCoord: '$region.dongCoord',
        },
      },
    ]);

    res.send(lists);
  }

  if (param.dong && !param.gu) {
    const lists = await Lists.aggregate([{ $match: { stdg_nm: param.dong } }]);
    res.send(lists);
  }

  res.send(lists);
});

export default listsRouter;
