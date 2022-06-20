class QueueService {

    constructor(app) {
        console.log('app', app);
        this.clss = require('./' + app.config.qservice);
        this.q = new this.clss(app);
        console.log('qservice', this.q);
    }

    name() {
        return this.q.name.call(this.q);
    }

    enqueue() {
        return this.q.enqueue.apply(this.q, arguments);
    }

    dequeue() {
        return this.q.dequeue.apply(this.q, arguments);
    }
}

module.exports = QueueService;