import 'dotenv/config'


const { REDIS_USERNAME, REDIS_PASSWORD, REDIS_PORT, REDIS_URI, PORT } = process.env



const getConfig = () => {
    return {
        server: {
            port: PORT,
            host: "http://localhost:3000",
            title: "Proxigram",
            withCache: true
        },
        cache: {
            expiresIn: 900,
            username: REDIS_USERNAME,
            password: REDIS_PASSWORD,
            port: REDIS_PORT,
            uri: REDIS_URI
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
}


export default getConfig()