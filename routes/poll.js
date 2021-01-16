const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Pusher = require('pusher');

//Model for votes
const Vote = require('../models/Vote');

//Pusher configuration
const pusher = new Pusher({
    appId: "1138493",
    key: "f55b1a96cc02cb8911b3",
    secret: "b279d6aae8dbf12b2881",
    cluster: "ap2",
    useTLS: true
  });

router.get('/', (req,res) => {
    Vote.find().then(votes => res.json({
        success: true,
        votes:votes
    }));
});

router.post('/', (req, res) => {
    const newVote = {
        os: req.body.os,
        points: 1
    }
    let uservote = new Vote(newVote);
    uservote.save().then(vote => {
        pusher.trigger("os-poll", "os-vote", {
            points: parseInt(vote.points),
            os: vote.os
    });
    
      return res.json({success: true, message: 'Thank you for voting', votes:vote})
    });
});
module.exports = router