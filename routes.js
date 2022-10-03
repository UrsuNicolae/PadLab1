const ROUTES = [
    {
        url: '/register',
        auth: false,
        proxy: {
            target: "https://localhost:7100/api/Account/Register",
            changeOrigin: true,
            pathRewrite: {
                [`^/free`]: '',
            },
        }
    },
    {
        url: '/login',
        auth: true,
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