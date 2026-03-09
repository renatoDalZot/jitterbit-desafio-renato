// Controller para autenticação de usuários
class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    async register(req, res) {
        try {
            const { email, password, name } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
            }
            const user = await this.authService.register({ email, password, name });
            return res.status(201).json({ message: 'Usuário criado com sucesso.', user });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
            }
            const result = await this.authService.login({ email, password });
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({ error: err.message });
        }
    }

    async me(req, res) {
        return res.status(200).json({ user: req.user });
    }
}

module.exports = { AuthController };