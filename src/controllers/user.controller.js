const {
    getUserById,
    updateUser,
    getAllUsers
} = require('../services/user.service');

const getProfile = async (req, res, next) => {
    try {
        const user = await getUserById(req.user.sub);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

const updateProfile = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        const updatedUser = await updateUser(req.user.sub, { name });
        return res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};

const listUsers = async (req, res, next) => {
    try {
        const users = await getAllUsers();
        return res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getProfile,
    updateProfile,
    listUsers
};
