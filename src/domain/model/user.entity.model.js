// Modelo de Domínio - Entidade Usuário
class UserEntity {
    constructor({ id, email, name, createdAt }) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.createdAt = createdAt;
    }
}

module.exports = { UserEntity };