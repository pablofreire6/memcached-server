"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CronJob = require('cron').CronJob;
const Cache_1 = require("./lib/Cache");
const Server_1 = __importDefault(require("./lib/Server"));
const server = new Server_1.default();
server
    .start()
    .then((message) => {
    console.log(message);
})
    .catch((err) => {
    console.log(err);
});
Cache_1.Cache.getInstance().getExpired();
const job = new CronJob('*/1 * * * *', function () {
    let expired = Cache_1.Cache.getInstance().getExpired();
    expired.forEach((item) => {
        console.log('remove ' + item.getKey());
        Cache_1.Cache.getInstance().remove(item.getKey());
    });
}, null, true, 'America/Los_Angeles');
job.start();
