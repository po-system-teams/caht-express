const util = require('util');
const client = require('../redis');

export const getRedis = util.promisify(client.get).bind(client);
export const setRedis = util.promisify(client.set).bind(client);
export const delRedis = util.promisify(client.del).bind(client);
export const existsRedis = util.promisify(client.exists).bind(client);
