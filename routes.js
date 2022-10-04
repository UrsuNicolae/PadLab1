const ROUTES = [
    {
        url: '/register',
        auth: false,
        proxy: {
            target: "https://localhost:7100/api/Account/Register",
            changeOrigin: true,
            pathRewrite: {
                [`^/register`]: '',
            },
        }
    },
    {
        url: '/test',
        auth: false,
        proxy: {
            target: "https://www.google.com/",
            changeOrigin: true,
            pathRewrite: {
                [`^/test`]: '',
            },
        }
    },
    {
        url: '/login',
        auth: false,
        proxy: {
            target: "https://localhost:7100/api/Account/Login",
            changeOrigin: true,
            pathRewrite: {
                [`^/login`]: '',
            },
        }
    }
]

exports.ROUTES = ROUTES;