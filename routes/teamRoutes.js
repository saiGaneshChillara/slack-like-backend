const express = require('express');

const auth = require('../middleware/auth');
const { createTeam, getTeams, addMember } = require('../controllers/teamController');

const router = express.Router();

router.route('/')
      .get(auth, getTeams)
      .post(auth, createTeam);

router.route('/:userId')
      .post(auth, addMember);

module.exports = router;