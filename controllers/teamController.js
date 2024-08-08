const Team = require('../models/Team');
const User = require('../models/User');

exports.createTeam = async (req, res) => {
    const { name } = req.body;
    const leaderId = req.user._id;
    
    try {
        const team = new Team({ name, leader: leaderId});
        await team.save();

        return res.status(201).json({
            message: 'Team created successfully',
            team,
        });
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            message: err.message,
        });
    }
};

exports.getTeams = async (req, res) => {
    try {
        const teams = await Team.find()
                                .populate('leader', 'email')
                                .populate('members', 'email');
        
        res.json({ teams });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    }
};

exports.addMember = async (req, res) => {
    const { userId } = req.params;
    const { teamId } = req.query;

    const leaderId = req.user._id;
    
    try {
        const team = await Team.findById(teamId);
        
        if (!team) {
            return res.status(404).json({
                message: 'Team not found'
            });
        }

        if (team.leader.toString()!== leaderId.toString()) {
            return res.status(403).json({
                message: 'You are not the leader of this team'
            });
        }

        team.members.push(userId);
        await team.save();

        return res.json({
            message: 'Member added successfully',
            team,
        });
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            message: err.message
        });
    }
};