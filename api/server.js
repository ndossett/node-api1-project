// BUILD YOUR SERVER HERE
const express = require("express");
const generate = require('shortid').generate;

const server = express();
server.use(express.json());

let users = [
    {id:generate(), name:'Janette Doe', bio: 'School Student'},
    {id:generate(), name:'Johnny Doe', bio: 'School Teacher'}
]

server.get('/users', (req, res)=> {
    res.status(200).json(users)
})

server.get('/users/:id', (req, res)=> {
   const id = req.params.id
   const idOfUser = users.find(user => user.id === id)
   if(!idOfUser){
       res.status(404).json({message:`The user with ID: ${id} does not exist`})
   }else {
       res.status(200).json(idOfUser)  
   }
})

server.post('/users', (req, res)=> {
    const { name, bio } = req.body
    if(!name || !bio){
        res.status(400).json({message:'Please provide name and bio for the user'})
    }else {
        const newUser = {id:generate(), name, bio}
        users.push(newUser)
        res.status(201).json(newUser)
    }
})

server.put('/users/:id', (req, res)=> {
    const id = req.params.id
    const { name, bio } = req.body
    const indexOfUser = users.findIndex(user => user.id ===id)
    
    try{
        if(indexOfUser != -1){
            users[indexOfUser] = { id, name, bio}
            res.status(200).json({id, name, bio})
        }else if(!name || !bio) {
            res.status(400).json({message:'Please provide name and bio for the user'})
        }else{
            res.status(404).json({message: `The user with the specified ID does not exist`})
        }
    }catch(e){
        res.status(500).json({message: `Server error: ${e}`})
    }
})

server.delete('/users/:id', (req, res)=> {
    const id = req.params.id
    try{
        if(!users.find(user => user.id ===id)){
            res.status(404).json({message: `User with id: ${id} not found`})
        }else {
            users = users.filter(user => user.id !== id)
            res.status(200).json({message: `User: ${id} was deleted`})
        }
    }catch(e){
        res.status(500).json({message: `Server error: ${e}`})  
    }
})

server.use('*',(req, res) => {
    res.status(404).json({message:'404 Not Found)*:'})
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
