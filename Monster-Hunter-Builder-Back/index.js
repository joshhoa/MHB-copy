require('dotenv').config();

const http = require('http');
const logger = require('./app/utils/logger');
const app = require('./app/app');

const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  logger.log(`Server launched at http://localhost:${port}`);
});
