const User = require('../models/user');

const findAll = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
}

const save = async (req, res) => {
    try {
        const user = new User(req.body);
        const result = await user.save();

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

const findById = async function (req, res) {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const result = await user.deleteOne();
        res.status(200).json({ "message": `User: '${user.username}' deleted`, ...result });
    } catch (error) {
        res.status(500).json(error);
    }
}

const update = async (req, res) => {
    const updated = req.body;
    const user = User.findByIdAndUpdate(req.params.id, updated);
    res.status(200).json({ "message": `User: '${user.username}' updated`, ...user });
}
module.exports = { findAll, save, findById, deleteById };