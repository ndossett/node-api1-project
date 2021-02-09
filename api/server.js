// BUILD YOUR SERVER HERE
const express = require("express");
const generate = require('shortid').generate;

const server = express();
server.use(express.json());

let user = [
    {id:generate(), name:'Janette Doe', bio: 'School Student'},
    {id:generate(), name:'Johnny Doe', bio: 'School Teacher'}
]

console.log(user)

module.exports = server; // EXPORT YOUR SERVER instead of {}
