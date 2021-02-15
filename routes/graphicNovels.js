const express = require('express');
const router = express.Router();
const GraphicNovel = require('../models/GraphicNovel');
require('dotenv/config');

//Get all Graphic Novels
router.get('/', async (req, res) => {
    try {
        const graphicNovels = await GraphicNovel.find();
        res.json(graphicNovels);
    } catch(e){
        res.json(e);
    }
});

//Get a single graphic novel by ID
router.get('/:id', async (req, res) => {
    try {
        const graphicNovel = await GraphicNovel.findById(req.params.id);
        res.send(graphicNovel); 
    } catch(e){
        res.json({message: e});
    }
});

//Post a new novel
router.post('/', async (req, res) => {
    try {
        const graphicNovel = new GraphicNovel({
            title: req.body.title,
            author: req.body.author,
            publisher: req.body.publisher,
            summary: req.body.summary,
            release_date: req.body.release_date,
            era: req.body.era,
            timeline: req.body.timeline
        });

        const savedGraphicNovel =  await graphicNovel.save();
        res.json(savedGraphicNovel);
    } catch(e) {
        res.json({ message: e})
    }
});


//Update a novels info
router.patch('/:id', async (req, res) => {
    try {
        const updatedGraphicNovel = await GraphicNovel.updateOne(
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

        res.json(updatedGraphicNovel);
    } catch(e) {
        res.json({  message: e});
    }
});

//Delete a novel
router.delete('/:id', async(req, res) => {
    try {
        const deletedGraphicNovel = await Novel.remove({_id: req.params.id});
        res.json(deletedGraphicNovel);
    } catch(e) {
        res.json({ message: e })
    }
});

module.exports = router;