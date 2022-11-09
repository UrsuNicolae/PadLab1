const express = require('express')
const {createProxyMiddleware} = require("http-proxy-middleware")
const rateLimit = require('express-rate-limit')
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` } )

const PORT =  8000;
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
console.log(process.env.authServiceTarget);
app.use(
  "/auth",
  createProxyMiddleware({
    target: process.env.authServiceTarget,
    changeOrigin: true,
    pathRewrite: function (path, req) { return path.replace('/auth', '') }
  })
);

app.use(
    "/main",
    createProxyMiddleware({
      target: process.env.mainServiceTarget,
      changeOrigin: true,
      pathRewrite: function (path, req) { return path.replace('/main', '') }
    })
  );

app.listen(PORT, () =>
  console.log(`Proxy is running on port: ${PORT}`)
);
