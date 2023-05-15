const router = require('express').Router()
const { User, Post, Comment } = require('../models')
const withAuth = require('../utils/auth')

//Posts show on homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username', 'id']
                },
            ],
        })

        const posts = postData.map((post) => post.get({ plain: true }))

        res.render('homepage', {
            posts,
            logged_in: req.session.loggedIn,
            userId: req.session.userId
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

//Syncs user data with posts and comments
router.get('/blog/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['username']
                    },
                },
            ],
        })
        const post = postData.get({ plain: true })
        const postId = postData.id

        res.render('blogPost', {
            ...post,
            logged_in: req.session.loggedIn,
            postId: req.params.id,
            userId: req.session.userId
        })

    } catch (err) {
        res.status(500).json(err)
    }
})

// Syncs user data with post data 
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.userId, {
            include: [
                { model: Post }
            ]
        })

        const user = userData.get({ plain: true })

        res.render('dashboard', {
            ...user, 
            logged_in: req.session.loggedIn,
            userId: req.session.userId
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

//Get request to render login page
router.get('/login', (req, res) => {
    // Redirects user if logged in
    if (req.session.logged_in) {
      res.redirect('/dashboard')
      return
    }
  
    res.render('login')
  })

router.get('/newpost', (req, res) => {
    try {
        res.render('newPostForm', {
            logged_in: req.session.loggedIn
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router