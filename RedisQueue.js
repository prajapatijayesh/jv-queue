const redis = require('redis');
const uuid = require('uuid');

class RedisQueue {
    constructor(app) {
        this.client = redis.createClient(app.config.qoptions.port, app.config.qoptions.host, app.config.qoptions.options);
    }

    name() {
        return 'RedisQueue';
    }

    async enqueue(queue, message) {
        await this.client.connect();
        const id = uuid.v4();
        message = {
            uuid: id,
            ...message
        };
        return this.client.RPUSH(queue, JSON.stringify(message));
    }

    async dequeue(queue) {
        return this.client.RPOP(queue);
    }
}

module.exports = RedisQueue;