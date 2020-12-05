const db = require('./config/mongoose');
const app = require('./config/express');
const dotEnv = require('dotenv');

process.on('uncaughtException', (err) => {
    console.log('Unhandled Exception! Shutting Down');
    console.log(err.message);
    process.exit(1);
});

dotEnv.config({ path: './config/config.env' });

db(process.env.DATABASE_LOCAL);

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
