const expressSession = require('express-session');
 
const mongoDbStore = require('connect-mongodb-session');

function createSessionStore() {
    const MongoDBStore = mongoDbStore(expressSession);
    const store = new MongoDBStore({
        uri: 'mongodb://localhost:27017/',
        database: 'online-shop',
        collection: 'sessions'

    })
    return store;
};

function createSessionConfig() {
    return { 
        secret: 'so-so-secret',
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        cookie: {
            maxAge: 2 * 24 * 60 * 60 * 1000
        }
    };
}
g
module.exports = createSessionConfig;