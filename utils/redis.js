const AsyncRedis = require('async-redis');
const RedisDb = AsyncRedis.createClient();

module.exports = {
    setObj: async (id, obj) => await RedisDb.set(id.toString(), JSON.stringify(obj)),
    getObj: async (id) => JSON.parse(await RedisDb.get(id.toString())),
    delObj: async (id) => await RedisDb.del(id.toString())

}