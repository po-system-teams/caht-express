const { serverconfig, radisconfig } = require("../config");

const redis = require('redis');
const redisClient = redis.createClient(radisconfig.port,radisconfig.host);
redisClient.on('error',(err)=>{
  console.error(err)
})
redisClient.on('ready', () => {
  console.log('Redis client connected');
});

redisClient.on('end', () => {
  console.log('Redis client disconnected');
});
console.log(__filename,'Redis connect successfully');

module.exports = redisClient;