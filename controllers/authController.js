const User = require('../models/userModel');
const authService = require('../services/authService');

class AuthController {
	async signup(req, res) {
		try {
			const { email, password } = req.body;
			const userData = await authService.signup(email, password)
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
			return res.json(userData);
		} catch (error) {
			console.log(error);
		}
	}
	async signin(req, res) {
		try {
			const { email, password } = req.body;
			const userData = await authService.signin(email, password);
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
			return res.json(userData);
		} catch (error) {
			console.log(error);
		}
	}
	async signout(req, res) {
		try {

		} catch (error) {

		}
	}
	async refresh(req, res) {
		try {

		} catch (error) {

		}
	}
	async removeOneUser(req, res) {
		try {
			const { id } = req.params;
			if (!id) {
				res.json({ message: 'Something went wrong((' });
			}
			const removedUser = await User.findByIdAndDelete(id);
			return res.json(removedUser);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}
	async removeAllUsers(req, res) {
		try {
			await User.deleteMany({});
			res.status(200).json({ message: 'Все заметки успешно удалены' });
		} catch (error) {
			res.status(500).json({ error: 'Внутренняя ошибка сервера' });
		}
	}
	async fetchOneUser(req, res) {
		try {
			const { id } = req.params;
			const user = await User.findById(id);
			return res.json(user);
		} catch (error) {
			console.log(error.message);
			// res.json({ message: 'Something went wrong((' })
		}
	}
	async fetchAllUsers(req, res) {
		try {
			const users = await User.find();
			return res.json(users);
		} catch (error) {
			// res.json({ message: 'Something went wrong((' })
			console.log(error.message);
		}
	}
}

module.exports = new AuthController();