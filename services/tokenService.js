const jwt = require('jsonwebtoken');
const tokenModel = require('../models/tokenModel');

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_KEY, { expiresIn: '3d' });
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_KEY, { expiresIn: '30d' });
		return {
			accessToken,
			refreshToken,
		}
	}
	async saveRefreshToken(userID, refreshToken) {
		const tokenData = await tokenModel.findOne({ user: userID });
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}
		const newToken = await tokenModel.create({ user: userID, refreshToken });
		return newToken;
	}
};

module.exports = new TokenService();