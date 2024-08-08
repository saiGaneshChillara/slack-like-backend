const Message = require('../models/Message');

/**
 * Retrieves a list of messages from the database.
 *
 * @param {Object} req - The request object containing query parameters.
 * @param {Object} res - The response object to send back the retrieved messages.
 *
 * @returns {Promise} A promise that resolves to the retrieved messages or rejects with an error.
 *
 * @example
 * // GET /messages?teamId={teamId}
 */
exports.getMessages = async (req, res) => {
    const { teamId } = req.query;

    try {
        const messages = await Message.find({ teamId })
                                      .populate('sender', 'email');
        res.json({ messages });

    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: err.message,
        });
    }
};

exports.sendMessage = async (req, res) => {
    const { content } = req.body;
    const { teamId } = req.query;
    const senderId = req.user._id;

    try {
        const message = new Message({
            teamId,
            sender: senderId,
            content
        });
        
        await message.save();
        res.status(201).json({
            message: 'Message sent successfully!',
            message
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: err.message,
        });
    }
};

exports.uploadFile = async (req, res) => {
    const { teamId } = req.query;
    const senderId = req.user._id;
    const file = req.file;

    try {
        const fileUrl = `/uploads/${file.filename}`;
        
        const message = new Message({
            teamId,
            sender: senderId,
            fileUrl,
        });

        await message.save();
        res.status(201).json({
            message: 'File uploaded successfully!',
            message
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: err.message,
        });
    }
};