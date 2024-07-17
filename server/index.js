const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

const dir = path.join(__dirname, 'public/images');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

mongoose.connect('mongodb+srv://GokuDB:test1234@cluster0.rwe14nz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

app.use(blogRoutes);

app.listen(4000, () => {
    console.log('Server Listening on Port 4000');
});
