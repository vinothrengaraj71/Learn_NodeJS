const messageModel = require("../models/messageModel");

const createMessage = async (req, res) => {
    const { chatId, senderId, text } = req.body;

    const message = new messageModel({
        chatId,
        senderId,
        text
    });

    try {
        const response = await message.save();
        res.status(201).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message }); 
    }
};

const getMessage = async (req, res) => {
    const { chatId } = req.params;
    console.log(`Fetching messages for chatId: ${chatId}`);

    try {
        const messages = await messageModel.find({ chatId });
        console.log(`Messages found: ${messages.length}`);
        res.status(200).json(messages);
    } catch (err) {
        console.log(`Error occurred: ${err}`);
        res.status(500).json({ message: err.message }); 
    }
};


module.exports = {
    createMessage,
    getMessage
};
