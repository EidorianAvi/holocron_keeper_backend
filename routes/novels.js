const express = require('express');
const router = express.Router();
const Novel = require('../models/Novel');
const multer = require('multer');
const fs = require('fs');
require('dotenv/config');


//Get all Novels
router.get('/', async (req, res) => {
    try {
        const novels = await Novel.find();
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

//Post a new novel
router.post('/', async (req, res) => {

    console.log(request.file);

    try {
        const novel = new Novel({
            title: req.body.title,
            author: req.body.author,
            publisher: req.body.publisher,
            summary: req.body.summary,
            release_date: req.body.release_date,
            era: req.body.era,
            timeline: req.body.timeline,
            book_cover: request.file.filename,
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