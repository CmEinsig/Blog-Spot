const router = require('express').Router()
const { Comment, User, Post } = require('../../models')
const withAuth = require('../../utils/auth')

//Create a comment 
router.post('/:id', withAuth, async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.session.username
            }
        })
        const userId = user.id

        const post = await Post.findOne({
            where: {
                id: req.params.id
            }
        })
        const postId = post.id
  
        const newComment = await Comment.create({
            content: req.body.content, 
            user_id: userId, 
            post_id: postId
        })

        res.status(200).json(newComment)

    } catch (err) {
        res.status(400).json(err)
    }
})

//Update existing comment
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedComment = await Comment.update(
            {
                content: req.body.content
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )
        res.status(200).json(updatedComment)
    } catch (err) {
        res.status(400).json(err)
    }
})

//Delete existing comment 
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
            }
        })
        if (!commentData) {
            res.status(404).json({ message: 'No comment found!' })
            return
          }
      
          res.status(200).json(commentData)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router