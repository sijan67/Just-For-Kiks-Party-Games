const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get('/numberOrdering/numberlist1', (req, res) => {
    res.write(JSON.stringify(Array.from({length: 9}, () => Math.floor(Math.random() * 100))));
});     

router.get('/numberOrdering/numberlist2', (req, res) => {
    res.write(JSON.stringify(Array.from({length: 16}, () => Math.floor(Math.random() * 100))));
});  

router.get('/numberOrdering/numberlist3', (req, res) => {
    res.write(JSON.stringify(Array.from({length: 25}, () => Math.floor(Math.random() * 100))));
});  

