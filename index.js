const express = require('express')
const { createProxyMiddleware } = require("http-proxy-middleware")
const rateLimit = require('express-rate-limit')
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const winston = require('winston');
const Elasticsearch = require('winston-elasticsearch');

const esTransportOpts = {
  level: 'info',
  clientOpts: {
    host: ((process.env.NODE_ENV !== 'production') ? "http://localhost:9200" : "http://host.docker.internal:9200"),
    log: "info"
  }
};

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "logfile.log", level: 'error' }), //save errors on file
    new Elasticsearch(esTransportOpts) //everything info and above goes to elastic
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({ //we also log to console if we're not in production
    format: winston.format.simple()
  }));
}

const PORT = 8000;
const app = express();
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 1 minute)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "To many request (100 request per 1 minute)",
});

app.use(limiter);
app.use(express.Router().get('/test', (_, res) => {
  res.status(200).send('Proxy is OK')
}))

app.use(
  "/auth",
  createProxyMiddleware({
    target: process.env.authServiceTarget,
    changeOrigin: true,
    pathRewrite: function (path, req) {
      logger.info("Redirect to auth")
      return path.replace('/auth', '')
    }
  })
);

app.use(
  "/main",
  createProxyMiddleware({
    target: process.env.mainServiceTarget,
    changeOrigin: true,
    pathRewrite: function (path, req) {
      logger.info("Redirect to main")
      return path.replace('/main', '')
    }
  })
);

app.listen(PORT, () =>
  logger.info(`Proxy is running on port: ${PORT}`)
);
