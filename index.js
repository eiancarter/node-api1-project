// implement your API here
const express = require('express');

const server = express();

const db = require('./data/db');

server.use(express.json());

//find 
server.get('/api/users', (req, res) => {
    db.find().then(users => {
        res.status(200).json(users);
    }).catch(err=>{
        console.log(err)
        res.status(500).json({ errorMessage: 'cannot get data'})
    })
})
//post a new user
server.post('/api/users', (req, res) => {

    const userInfo = req.body;
    console.log('body', req.body)

    db.add(userInfo).then(user => {
        res.status(201).json(user)
    }).catch(error => {
        console.log(error)
        res.status(500).json({ errorMessage: 'There was an error while saving the user to the database'})
    })
})

const port = 5500;
server.listen(port, () => {
    console.log(`API on port ${port} works!`)
})