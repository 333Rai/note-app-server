const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const tokenService = require('./tokenService');
const UserDto = require('../dtos/userDto');

class AuthService {
	async signup(email, password) {
		try {
			const oldUser = await User.findOne({ email });
			if (oldUser) {
				throw new Error(`${email} уже существует`);
			}
			const hashPassword = await bcrypt.hash(password, 3);
			const newUser = await User.create({
				email,
				password: hashPassword,
			});
			const userDto = new UserDto(newUser);
			const tokens = tokenService.generateTokens({ ...userDto });
			await tokenService.saveRefreshToken(
				userDto.id,
				tokens.refreshToken
			);
			return {
				...tokens,
				user: userDto,
			};
		} catch (error) {
			console.log(error);
		}
	}
	async signin(email, password) {
		try {
			const user = await User.findOne({ email });
			if (!user) {
				throw new Error(`${email} не существует`);
			}
			const validPassword = bcrypt.compare(password, user.password);
			if (!validPassword) {
				throw new Error('Неверный логин или пароль');
			}
			const userDto = new UserDto(user);
			const tokens = tokenService.generateTokens({ ...userDto });
			await tokenService.saveRefreshToken(
				userDto.id,
				tokens.refreshToken
			);
			return {
				...tokens,
				user: userDto,
			};
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = new AuthService();
