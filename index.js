const express = require('express')
const {createProxyMiddleware} = require("http-proxy-middleware")
const rateLimit = require('express-rate-limit')
require('dotenv').config()


const PORT =  8000;
const authServiceTarget =  "http://localhost:5100";
const mainServiceTarget =  "http://localhost:5000";

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
    target: authServiceTarget,
    changeOrigin: true,
    pathRewrite: function (path, req) { return path.replace('/auth', '') }
  })
);

app.use(
    "/main",
    createProxyMiddleware({
      target: mainServiceTarget,
      changeOrigin: true,
      pathRewrite: function (path, req) { return path.replace('/main', '') }
    })
  );

app.listen(PORT, () =>
  console.log(`Proxy is running on port: ${PORT}`)
);
