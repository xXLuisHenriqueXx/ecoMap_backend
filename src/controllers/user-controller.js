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
            const user = req.user;

            if (!req.file) {
                return res.status(400).json({ error: 'Profile picture is required' });
            }

            if (user.profilePicture && user.profilePicture.filename) {
                const oldPath = path.resolve("public", "uploads", "profile-pictures", user.profilePicture.filename);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }

            user.profilePicture = {
                _id: new mongoose.Types.ObjectId(),
                filename: req.file.filename,
                url: `${process.env.APP_URL}/uploads/profile-pictures/${req.file.filename}`
            };

            await user.save();

            return res.status(204).json({ message: 'Profile picture updated', profilePicture: user.profilePicture });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    removeProfilePicture: async (req, res) => {
        try {
            const user = req.user;

            if (!user.profilePicture || !user.profilePicture.filename) {
                return res.status(400).json({ error: 'Profile picture not found' });
            }

            const oldPath = path.resolve("public", "uploads", "profile-pictures", user.profilePicture.filename);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }

            user.profilePicture = undefined;

            await user.save();

            return res.status(204).json({ message: 'Profile picture removed' });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}