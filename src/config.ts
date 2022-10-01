export default {
    server: {
        port: 3000,
        host: "http://localhost:3000",
        title: "Proxigram",
    },
    services: {
        instastories: {
            api: "https://instastories.watch/api",
        },
        instagram: {
            cdn: "https://scontent.cdninstagram.com"
        }
    },
    globals: {
        username_regex: /^[a-zA-Z0-9@._]*$/
    }
};