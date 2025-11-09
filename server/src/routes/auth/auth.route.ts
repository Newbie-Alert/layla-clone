import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import express from 'express';
import User from '../../models/User.model.js';

export const authRouter = express.Router();

// 회원가입
authRouter.post('/register', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const isExists = await User.findOne({ email });
    
    if (isExists) {
      res.status(400).send('이미 존재하는 이메일입니다');
      return;
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({ email, password: hashed });

    res.status(201).send('created')
  } catch (error) {
    console.log(error)
  }
})

// 로그인
authRouter.post('/login', async (req, res, next) => {
  const {email, password} = req.body;
  try {
    const isExistsUser = await User.findOne({ email });
    
    if (!isExistsUser) {
      res.status(400).send('이메일 또는 비밀번호를 확인해주세요');
      return;
    }

    const isComparedPassword = await bcrypt.compare(password, isExistsUser.password);

    if (!isComparedPassword) {
      res.status(400).send('이메일 또는 비밀번호를 확인해주세요');
      return;
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn:'1d'
    })

    res.status(200).send({
      message: 'logined',
      token
    })

  } catch (error) {
    console.log(error)
  }
})