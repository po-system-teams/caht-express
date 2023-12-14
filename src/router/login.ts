import express from 'express';
import { rejectRes, resolveRes } from '../utils/respone';
import moment from 'moment';
import { UserType } from '../types/chat';
import { getUserByName } from '../mysql';
const User = require('../model/User');
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const findResult = await getUserByName(req.body.userName);
    if (findResult.length) {
      res.cookie('login', findResult[0].name, { signed: true });
      res.send(resolveRes(findResult[0]));
      return;
    }
    // 没有该用户，创建一个
    const inserList: UserType = {
      name: req.body.userName,
      last_login_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    };
    const createResult = await User.create(inserList);
    if (createResult) {
      res.cookie('login', createResult.name, { signed: true });
      res.send(resolveRes(createResult));
    }
  } catch (err) {
    console.log(err);
    res.send(rejectRes(err));
  }
});

module.exports = router;
