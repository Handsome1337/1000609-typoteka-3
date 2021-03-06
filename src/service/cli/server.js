'use strict';

const express = require(`express`);
const {ExitCode, HttpCode, API_PREFIX} = require(`../../constants`);
const getRoutes = require(`../api/api`);
const {getLogger} = require(`../lib/logger`);

const DEFAULT_PORT = 3000;

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    const logger = getLogger({name: `api`});

    const app = express();
    app.use(express.json());

    app.use((req, res, next) => {
      logger.debug(`${req.method} request on route ${req.url}`);
      res.on(`finish`, () => {
        logger.info(`Request on route ${res.req.originalUrl} finished. Response status code ${res.statusCode}`);
      });
      return next();
    });

    app.use(API_PREFIX, await getRoutes());

    app.use((req, res) => {
      res
        .status(HttpCode.NOT_FOUND)
        .send(`Not found`);

      logger.error(`Route not found: ${req.url}`);
    });

    app.use((err, _req, _res, _next) => {
      logger.error(`An error occurred on processing request: ${err.message}`);
    });

    app.listen(port)
      .on(`listening`, () => logger.info(`Listening to connections on ${port}`))
      .on(`error`, (err) => {
        logger.error(`An error occurred: ${err.message}`);
        process.exit(ExitCode.ERROR);
      });
  }
};
