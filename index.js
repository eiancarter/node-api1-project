// implement your API here
const express = require('express');

const server = express();

const db = require('./data/db.js');

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
//find user by id
server.get('/api/users/:id', (req, res) => {
    db.findById(req.params.id).then(user => {
        res.status(200).json(user);
    }).catch(err=> {
        console.log(err)
        res.status(500).json({ errorMessage: 'The user information could not be retrieved.'})
    })
})
//post a new user
server.post('/api/users', (req, res) => {

    const userInfo = req.body;
    console.log('body', req.body)

    db.insert(userInfo).then(user => {
        res.status(201).json(user)
    }).catch(error => {
        console.log(error)
        res.status(500).json({ errorMessage: 'There was an error while saving the user to the database'})
    })
})
//delete a user 
server.delete('/api/users/:id', (req, res) => {
    db.remove(req.params.id).then( user => {
        res.status(200).json(user);
    }).catch(err=> {
        console.log(err);
        res.status(500).json({ errorMessage: 'The user could not be removed'})
    })

})
//edits a user
server.put('/api/users/:id', (req, res) => {

    const updateUser = req.body

    db.update(updateUser.params.id).then( user => {
        if (!name || !bio) {
            res.status(400).json({ errorMessage: 'Please provide name and bio for the user.'})
        } else {
            res.status(200).json(user);
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'The user information could not be modified.' })
    })
})

const port = 5500;
server.listen(port, () => {
    console.log(`API on port ${port} works!`)
})