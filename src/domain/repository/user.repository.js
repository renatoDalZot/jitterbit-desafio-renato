// Interface para o repositório de usuários
class UserRepository {
    async findByEmail(email) { throw new Error('Not implemented'); }
    async findById(id)        { throw new Error('Not implemented'); }
    async create(data)        { throw new Error('Not implemented'); }
    async update(id, data)    { throw new Error('Not implemented'); }
    async delete(id)          { throw new Error('Not implemented'); }
}

module.exports = { UserRepository };