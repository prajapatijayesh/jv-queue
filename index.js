
const rqueue = require('./QueueService');

// init redis queue
// const obj = new rqueue({
//     config: {
//         qservice: 'RedisQueue',
//         qoptions: {
//             redis: {
//                 port: 6379,
//                 host: '127.0.0.1'
//             }
//         }
//     }
// });

// init aws queue
const obj = new rqueue({
    config: {
        qservice: 'SQSQueue',
        qoptions: {
            aws: {
                region: 'REGION',
                apiVersion: '2012-11-05',
                queueURL: 'SQS_QUEUE_URL'
            }
        }
    }
});

(async () => {
    console.log('--- start ---');
    await obj.enqueue('msg', { amount: 1011, currency: 'MXN' });
    const single_msg = await obj.dequeue('msg');
    console.log('single_msg', single_msg);
    console.log('--- end ---');
    process.exit(0);
})();