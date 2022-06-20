const AWS = require('aws-sdk');
const uuid = require('uuid');

class SQSQueue {
    constructor(app) {
        console.log('app', JSON.stringify(app));
        AWS.config.update({ region: app.config.aws.region });
        this.sqs = new AWS.SQS({ apiVersion: app.config.aws.apiVersion });
        this.queueURL = app.config.aws.queueURL;
    }

    name() {
        return 'SQSQueue';
    }

    async enqueue(queue, message) {
        //
        console.log('queueName', queue);
        const sendObj = {
            queueUrl: this.queueURL,
            MessageBody: JSON.stringify(message),
            DelaySeconds: 0
        };

        return this.sqs.sendMessage(sendObj);
    }

    async dequeue(queue) {
        // code for receiveMessage from SQS
    }
}

module.exports = SQSQueue;