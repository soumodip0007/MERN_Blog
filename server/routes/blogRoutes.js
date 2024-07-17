const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const BlogModel = require('../models/Blog');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), (req, res) => {
    const { title, details } = req.body;
    BlogModel.create({ title, details, image: req.file.filename })
        .then(result => res.json(result))
        .catch(err => console.log(err));
});

router.get('/blogs', (req, res) => {
    BlogModel.find()
        .then(blogs => res.json(blogs))
        .catch(err => res.json(err));
});

router.get('/blogs/:id', (req, res) => {
    BlogModel.findById(req.params.id)
        .then(blog => res.json(blog))
        .catch(err => res.json(err));
});

router.put('/blogs/:id', upload.single('file'), (req, res) => {
    const { title, details } = req.body;
    const updatedData = { title, details };

    if (req.file) {
        updatedData.image = req.file.filename;

        // Delete the old image file
        BlogModel.findById(req.params.id)
            .then(blog => {
                if (blog.image) {
                    fs.unlink(path.join('public/images', blog.image), (err) => {
                        if (err) console.log(err);
                    });
                }
            })
            .catch(err => console.log(err));
    }

    BlogModel.findByIdAndUpdate(req.params.id, updatedData, { new: true })
        .then(updatedBlog => res.json(updatedBlog))
        .catch(err => res.json(err));
});

router.delete('/blogs/:id', (req, res) => {
    BlogModel.findByIdAndDelete(req.params.id)
        .then(blog => {
            if (blog.image) {
                fs.unlink(path.join('public/images', blog.image), (err) => {
                    if (err) console.log(err);
                });
            }
            res.json({ message: 'Blog deleted successfully' });
        })
        .catch(err => res.json(err));
});

module.exports = router;
