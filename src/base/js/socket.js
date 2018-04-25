export default class Socket {
    constructor(url) {
        this.url = url;
        this.wsSate = false;
        this.ws = '';
        this.msgQuere = [];
    }
    connect(cb) {
        this.ws = new WebSocket(`${this.url}`);
        this.onOpen(cb);
    }
    onOpen(cb) {
        this.ws.addEventListener('open', () => {
            this.wsSate = true;
            cb && cb();
        });
    }
    onMessage(cb) {
        if (!this.wsSate) {
            console.log('socket is closed');
            return;
        }
        this.ws.addEventListener('message', (imsg) => {
            if (imsg && imsg.isTrusted) {
                const msg = JSON.parse(imsg.data);
                cb && cb(msg);
            }
        });
    }
    send(imsg) {
        if (!this.wsSate) {
            console.log('socket is closed');
            return;
        }
        this.ws.send(JSON.stringify(imsg));
    }
    onClose() {
        this.ws.addEventListener('close', () => {
            this.wsSate = false;
        });
    }
    close() {
        if (!this.wsSate) {
            console.log('socket is closed');
            return;
        }
        this.ws.close();
        this.wsSate = false;
    }
    error(cb) {
        this.ws.addEventListener('error', () => {
            this.wsSate = false;
            cb && cb();
        });
    }
}
