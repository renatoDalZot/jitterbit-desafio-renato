const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Serviço de autenticação
class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async register({ email, password, name }) {
        const existing = await this.userRepository.findByEmail(email);
        if (existing) {
            throw new Error('E-mail já cadastrado.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.userRepository.create({
            email,
            password: hashedPassword,
            name,
        });

        return { id: user.id, email: user.email, name: user.name };
    }

    async login({ email, password }) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Credenciais inválidas.');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Credenciais inválidas.');
        }

        const token = jwt.sign(
            { sub: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );

        return {
            token,
            user: { id: user.id, email: user.email, name: user.name },
        };
    }
}

module.exports = { AuthService };