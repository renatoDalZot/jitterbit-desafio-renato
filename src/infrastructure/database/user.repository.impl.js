const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

class UserRepositoryImpl {
    constructor() {
        const connectionString = process.env.DATABASE_URL;
        if (!connectionString) {
            throw new Error('DATABASE_URL nao definida nas variaveis de ambiente');
        }

        const pool = new Pool({ connectionString });
        const adapter = new PrismaPg(pool);
        this.prisma = new PrismaClient({ adapter });
    }

    /**
     * Busca um usuário por email
     * @param {string} email - Email do usuário
     * @returns {Promise<Object|null>} Usuário encontrado ou null
     */
    async findByEmail(email) {
        try {
            if (!email || typeof email !== 'string') {
                throw new Error('Email invalido');
            }

            return await this.prisma.user.findUnique({
                where: { email: email.toLowerCase() }
            });
        } catch (error) {
            if (error.code === 'P2025') {
                return null;
            }
            throw new Error(`Erro ao buscar usuario por email: ${error.message}`);
        }
    }

    /**
     * Busca um usuário por ID
     * @param {number|string} id - ID do usuário
     * @returns {Promise<Object|null>} Usuário encontrado ou null
     */
    async findById(id) {
        try {
            if (!id) {
                throw new Error('ID invalido');
            }

            const userId = typeof id === 'string' ? parseInt(id, 10) : id;
            if (isNaN(userId)) {
                throw new Error('ID deve ser um numero valido');
            }

            return await this.prisma.user.findUnique({
                where: { id: userId }
            });
        } catch (error) {
            if (error.code === 'P2025') {
                return null;
            }
            throw new Error(`Erro ao buscar usuario por ID: ${error.message}`);
        }
    }

    /**
     * Cria um novo usuário
     * @param {Object} data - Dados do usuário { email, password, name }
     * @returns {Promise<Object>} Usuário criado
     */
    async create({ email, password, name }) {
        try {
            if (!email || !password) {
                throw new Error('Email e senha sao obrigatorios');
            }

            if (typeof email !== 'string' || typeof password !== 'string') {
                throw new Error('Email e senha devem ser strings');
            }

            // Verificar se usuário já existe
            const existingUser = await this.findByEmail(email);
            if (existingUser) {
                throw new Error('Usuario com este email ja existe');
            }

            return await this.prisma.user.create({
                data: {
                    email: email.toLowerCase(),
                    password,
                    name: name || null
                }
            });
        } catch (error) {
            if (error.code === 'P2002') {
                throw new Error('Usuario com este email ja existe');
            }
            throw new Error(`Erro ao criar usuario: ${error.message}`);
        }
    }

    /**
     * Atualiza um usuário existente
     * @param {number} id - ID do usuário
     * @param {Object} data - Dados a atualizar
     * @returns {Promise<Object>} Usuário atualizado
     */
    async update(id, data) {
        try {
            if (!id) {
                throw new Error('ID invalido');
            }

            const userId = typeof id === 'string' ? parseInt(id, 10) : id;
            if (isNaN(userId)) {
                throw new Error('ID deve ser um numero valido');
            }

            return await this.prisma.user.update({
                where: { id: userId },
                data
            });
        } catch (error) {
            if (error.code === 'P2025') {
                throw new Error('Usuario nao encontrado');
            }
            throw new Error(`Erro ao atualizar usuario: ${error.message}`);
        }
    }

    /**
     * Deleta um usuário
     * @param {number} id - ID do usuário
     * @returns {Promise<Object>} Usuário deletado
     */
    async delete(id) {
        try {
            if (!id) {
                throw new Error('ID invalido');
            }

            const userId = typeof id === 'string' ? parseInt(id, 10) : id;
            if (isNaN(userId)) {
                throw new Error('ID deve ser um numero valido');
            }

            return await this.prisma.user.delete({
                where: { id: userId }
            });
        } catch (error) {
            if (error.code === 'P2025') {
                throw new Error('Usuario nao encontrado');
            }
            throw new Error(`Erro ao deletar usuario: ${error.message}`);
        }
    }
}

module.exports = { UserRepositoryImpl };