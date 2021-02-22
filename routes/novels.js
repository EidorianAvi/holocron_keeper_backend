const express = require('express');
const router = express.Router();
const Novel = require('../models/Novel');
const multer = require('multer');
require('dotenv/config');

// Configure file storage properties for images via Multer

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './uploads/');
    },
    filename: function(req, file, callback){
        callback(null, Date.now() + '-' + file.originalname)
    },
});


const upload = multer({ 
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter(req, file, callback){
        
        if(!file.originalname.endsWith(".png" || ".jpg" || ".jpeg")){
            callback(new Error("Must be an image file", false))
        } else {
            callback(null, true);
        }
    },
});



//Get all Novels
router.get('/', async (req, res) => {
    try {
        const novels = await Novel.find();
        // const novels = await Novel.find(null, {book_cover: 0});
        res.json(novels);
    } catch(e){
        res.json(e);
    }
});

//Get a single novel by ID
router.get('/:id', async (req, res) => {
    try {
        const novel = await Novel.findById(req.params.id);
        res.send(novel); 
    } catch(e){
        res.json({message: "Couldn't find novel"});
    }
});

router.get('/:id/book_cover', async (req, res) => {
    try{
        const novel = await Novel.findById(req.params.id)
        if (!novel || !novel.book_cover) {
            console.log("hit")
        }
        res.set('Content-Type', 'image/jpg')
        res.send(novel.book_cover)
    } catch(e) {
        res.status(404).send()
    }
})

//Post a new novel
router.post('/', upload.single('book_cover') ,async (req, res) => {

    console.log(req.file);

    try {
        const novel = new Novel({
            title: req.body.title,
            author: req.body.author,
            publisher: req.body.publisher,
            summary: req.body.summary,
            release_date: req.body.release_date,
            era: req.body.era,
            timeline: req.body.timeline,
            book_cover: req.file.path,
        });

        const savedNovel =  await novel.save();
        res.json(savedNovel);
    } catch(e) {
        res.json({ message: e})
    }
});


//Update a novels info
router.patch('/:id', async (req, res) => {
    try {
        const updatedNovel = await Novel.updateOne(
            { _id: req.params.id },
            { $set: {
                title: req.body.title,
                author: req.body.author,
                publisher: req.body.publisher,
                summary: req.body.summary,
                release_date: req.body.release_date,
                era: req.body.era,
                timeline: req.body.timeline
            }});

        res.json(updatedNovel);
    } catch(e) {
        res.json({  message: "Couldn't update user" });
    }
});

//Delete a novel
router.delete('/:id', async(req, res) => {
    try {
        const deletedNovel = await Novel.remove({_id: req.params.id});
        res.json(deletedNovel);
    } catch(e) {
        res.json({ message: "Couldn't delete novel"})
    }
});

module.exports = router;