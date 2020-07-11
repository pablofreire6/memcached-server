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
