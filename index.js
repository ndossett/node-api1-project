// import { server } from './api/server';

const server = require('./api/server');

// const http = require('http');

const PORT = 5000;

// START YOUR SERVER HERE

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})