const CronJob = require('cron').CronJob;
import { Cache } from './lib/Cache';

import Server from './lib/Server';

const server = new Server();
server
  .start()
  .then((message) => {
    console.log(message);
  })
  .catch((err) => {
    console.log(err);
  });

const job = new CronJob(
  '*/10 * * * *',
  function () {
    let expired = Cache.getInstance().clearExpired();
  },
  null,
  true,
  'America/Los_Angeles',
);
job.start();
