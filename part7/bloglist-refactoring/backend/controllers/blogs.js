
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const jwt = require('jsonwebtoken')



blogRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)

})

blogRouter.post('/', async (req, res) => {
    const blog = new Blog(req.body)
    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (!req.token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if (!blog.title || !blog.url) {
        return res.status(400).send({ error: 'title of url missing' })
    }

    if (!blog.likes) {
        blog.likes = 0
    }
    blog.user = user

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    res.json(savedBlog.toJSON())
})

blogRouter.delete('/:id', async (req, res) => {

    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (!req.token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    const deletingBlog = await Blog.findById(req.params.id)

    if (!deletingBlog) {
        return res.status(404).json({ error: 'Blog not found' })
    }
    if (deletingBlog.user.toString() !== user.id.toString()) {
        return res.status(400).json({ error: 'Not authorized' })
    }

    await Blog.findByIdAndDelete(req.params.id)

    res.status(204).end()
})

blogRouter.put('/:id', async (req, res) => {
    const blog = req.body

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    res.json(updatedBlog.toJSON())

})

blogRouter.post('/:id/comments', async (req, res) => {
    const comment = req.body
    const id = req.params.id

    const blogToUpdate = await Blog.findById(id)
    blogToUpdate.comments = [...blogToUpdate.comments, comment]
    const t = blogToUpdate.comments.length
    
    const savedBlog = await blogToUpdate.save()
    res.json(savedBlog.comments[t - 1].toJSON())

})

blogRouter.get('/:id/comments', async (req, res) => {
    const id = req.params.id

    const blog = await Blog.findById(id)
    const comments = blog.comments

    res.json(comments)
})


module.exports = blogRouter