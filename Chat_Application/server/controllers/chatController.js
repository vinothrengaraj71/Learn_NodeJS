const chatModel = require("../models/chatModel");

const createChat = async (req, res) => {
    const { firstId, secondId } = req.body;

    console.log(firstId,secondId);

    try {
        const chat = await chatModel.findOne({
            members: {
                $all: [firstId, secondId]
            }
        });

        if (chat) {
            return res.status(200).json(chat);
        }

        const newChat = new chatModel({
            members: [firstId, secondId]
        });

        const response = await newChat.save();
        res.status(201).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

const findUserChats = async (req, res) => {
    const { userId } = req.params;

    try {
        const chats = await chatModel.find({
            members: { $in: [userId] }
        });

        res.status(200).json(chats);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

const findChat = async (req, res) => {
    const { firstId, secondId } = req.params;

    try {
        const chat = await chatModel.findOne({
            members: {
                $all: [firstId, secondId]
            }
        });

        res.status(200).json(chat);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createChat,
    findUserChats,
    findChat
};
