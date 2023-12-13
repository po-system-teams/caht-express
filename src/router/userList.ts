import express from 'express';
import { getBatchUser } from '../mysql';
import { RedisKey } from '../types/redis';
import { getRedis } from '../utils/redisUtils';
import { rejectRes, resolveRes } from '../utils/respone';
const router = express.Router();

// 获取在线用户列表
router.get('/userList', async (req, res) => {
  try {
    const { userId } = req.query;
    // get redis from RedisKey.CONNECT_USER_LIST
    let userList = await getRedis(RedisKey.CONNECT_USER_LIST);
    userList = JSON.parse(userList);
    // 剔除自己
    userList = userList
      .filter((item) => item.id !== Number(userId))
      .map((ite) => ite.id);
    // 查询数据库
    const data = await getBatchUser(userList);
    res.send(resolveRes(data));
  } catch (err) {
    console.log(err);
    res.send(rejectRes(err));
  }
});

module.exports = router;
