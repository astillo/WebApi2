const express = require('express')
const data = require('./data/db.js')
const server = express()

server.use(express.json())

server.get('/', (req, res) => {

    res.status(200).json({ api: 'hello' })

})

server.post('/api/posts', (req, res) => {
    const title = req.body.title
    const contents = req.body.contents

    if (!title || !contents) {
        res.status(401).json({ errorMessage: "Please provide title and contents for the post." })
    }
    else {
        data.insert(req.body).then((result) => {
            res.status(201).json({ result })
        })
            .catch((err) => {
                res.status(500).json({ error: "There was an error while saving the post to the database" })
            })
    }
})

server.post('/api/posts/:id/comments', (req, res) => {
    const id = req.params.id;
    post = data.findById(id)
    if (!post) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
    if (!req.body.text) {
        res.status(404).json({ errorMessage: "Please provide text for the comment." })
    }
})


module.exports = { server }