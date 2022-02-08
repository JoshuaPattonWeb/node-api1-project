// BUILD YOUR SERVER HERE
const User = require('./users/model')

const express = require('express')
const res = require('express/lib/response')

const server = express()

server.use(express.json())

server.get('/api/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})

server.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if(!user) {
            res.status(404).json({ message: 'The user with the specified ID does not exist' })
        } else {
            res.status(200).json(user)
        }
    } catch (error) {
        res.status(500).json({ message: 'The user information could not be retrieved'})
    }
})

server.post('/api/users', async (req, res) => {
   try {
    const user = req.body
    if(!user.name || !user.bio) {
        res.status(400).json({ message: 'Please provide name and bio for the user' })
    } else {
        const newUser = await User.insert(user)
        res.status(201).json(newUser)
    }
   } catch (error) {
       res.status(500).json({ message: 'There was an error while saving the user to the database' })
   }
})

server.put('/api/users/:id', async (req, res) => {
    try {
    const findUser = await User.findById(req.params.id)
        if(!findUser) {
            res.status(404).json({
                message: 'The user with the specified ID does not exist'
            })
        } else {
            if(!req.body.name || !req.body.bio) {
                res.status(400).json({ 
                    message: 'Please provide name and bio for the user'
                })
            } else {
                const updates = await User.update(req.params.id, req.body)
                res.status(200).json(updates)
            }
        }
    } catch (error) {
        res.status(500).json({ 
            message: 'The user information could not be modified'
        })
    }
})

server.delete('/api/users/:id', async (req, res) => {
    try {
        const findUser = await User.findById(req.params.id)
        if(!findUser) {
            res.status(404).json({ 
                message: 'The user with the specified ID does not exist'
            })
        } else {
            const deletedUser = await User.remove(findUser.id)
            res.status(200).json(deletedUser)
        }
    } catch (error) {
        res.status(500).json({
            message: "The user could not be removed"
        })
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
