// implement your posts router here
const Post = require('./posts-model')
const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    Post.find(req.query)
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Post.findById(id)
        .then(post => {
            if (!post) {
                res.status(404).json('post not found')
            }
            else {
                res.status(200).json(post)
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })

})
router.post('/', (req, res) => {
    Post.insert(req.body)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body
    Post.update(id, changes)
        .then(post => {
            if (!changes.title || !changes.contents) {
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }
            else {
                if (!post) {
                    res.status(400).json({ message: "Please provide title and contents for the post" })
                }
                else {
                    res.status(200).json(post)
                }

            }

        })
        .catch(err => {
            res.status(500).json({ message: "The post information could not be modified" })
        })

})
router.delete('/:id', (req, res) => {
    const { id } = req.params
    Post.remove(id)
        .then(post => {
            if (!post) {
                res.status(404).json({ message: 'the post with the specified ID does not exist' })
            }
            else {
                res.status(201).json(post)
            }

        })
        .catch(err => {
            res.status(500).json({ message: "the post could not be removed" })
        })
})


router.get('/:id/comments', (req, res) => {
    const { id } = req.params
    Post.findPostComments(id)
        .then(comments => {
            if (!comments) {
                res.status(404).json({ message: "the post with the specified ID does not exist" })
            }
            else {
                res.status(200).json(comments)
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The comments information could not be retrieved" })
        })

})
module.exports = router
