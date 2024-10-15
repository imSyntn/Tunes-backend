const Redis = require('ioredis')

// const host = process.env.REDIS_HOSTNAME;
// const port = process.env.REDIS_PORT;
// const username = process.env.REDIS_USERNAME;
// const password = process.env.REDIS_PASSWORD;

const client = new Redis()

// {
//     host,
//     port,
//     username,
//     password
// }

module.exports = { client }