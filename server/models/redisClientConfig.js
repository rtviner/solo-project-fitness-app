const redis = require('redis');
const path = require('path');
const dotenv = require('dotenv')

dotenv.config({ path: path.resolve(__dirname, '../../.env')});

const config= {
  port: process.env.PORT,
  redis: {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  }
};

const client = redis.createClient(config.redis.port, config.redis.host, {no_ready_check: true});

client.on('error', error => console.error('Error Connecting to the Redis Cluster', error));

client.on('connect', () => {
  console.log('Successfully connected to the Redis cluster!');
});

module.exports = client;