require('dotenv').config();
const User = require("../models/User")
const fs = require('fs');
const path = require('path');

module.exports = {
    update: async (req, res) => {
        try {
            const { name, email } = req.body;

            const user = req.user;

            if (name) user.name = name;
            if (email) user.email = email;

            await user.save();

            return res.status(204).end();
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    updatePassword: async (req, res) => {
        try {
            const { password, newPassword } = req.body;

            const user = req.user;

            if (!user.checkPassword(password)) {
                return res.status(401).json({ error: "Invalid password" });
            }

            if (newPassword) user.password = newPassword;

            await user.save();

            return res.status(204).end();
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },  
    
    show: async (req, res) => {
        const { _id } =  req.params;
        
        try {
            const user = await User.findById(_id);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            return res.json(user);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    updateProfilePicture: async (req, res) => {
        try {
            const userId = req.user._id;
            const profilePicturePath = req.file.path;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            if (user.profilePicture) {
                fs.unlinkSync(path.resolve(user.profilePicture));
            }

            user.profilePicture = profilePicturePath;
            await user.save();

            return res.status(204).json({ message: 'Profile picture updated' });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    removeProfilePicture: async (req, res) => {
        try {
            const userId = req.user._id;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            if (user.profilePicture) {
                fs.unlinkSync(path.resolve(user.profilePicture));
                user.profilePicture = null;
                await user.save();
            }

            return res.status(204).json({ message: 'Profile picture removed' });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}