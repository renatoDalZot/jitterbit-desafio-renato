const { UserRepositoryImpl } = require('../infrastructure/database/user.repository.impl.js');
const { AuthService } = require('../application/service/auth.service.js');

const userRepository = new UserRepositoryImpl();
const authService = new AuthService(userRepository);

module.exports = { authService };