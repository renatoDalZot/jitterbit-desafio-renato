# Jitterbit Desafio - API de Pedidos

API RESTful para gerenciar pedidos (CRUD) desenvolvida com Node.js, Express, Prisma e PostgreSQL, dentro do propósito de processo de seleção.

Obrigado pela oportunidade!

## Índice

- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Configuração](#configuração)
- [Executar a aplicação](#executar-a-aplicação)
- [Swagger](#swagger)
- [Endpoints da API](#endpoints-da-api)
- [Autor](#autor)
- [Licença](#licença)
- [Observações do desenvolvedor (candidato)](#observações-do-desenvolvedor-candidato)
- [Agradecimento](#agradecimento)

## Arquitetura do Projeto

```
src/
├── application/
│   ├── dto/                    # Data Transfer Objects
│   │   ├── create-order.dto.js
│   │   ├── update-order.dto.js
│   │   └── order-response.dto.js
│   ├── mapper/                 # Mapeadores de dados
│   │   └── order.mapper.js
│   └── service/                # Lógica de negócio
│       └── order.service.js
├── controller/                 # Controladores da API
│   └── order.controller.js
├── domain/                     # Domínio da aplicação
│   ├── model/                  # Modelos de domínio
│   │   ├── order.model.js
│   │   └── item.model.js
│   └── repository/             # Interfaces de repositório
│       └── order.repository.js
├── infrastructure/             # Camada de infraestrutura
│   └── database/
│       └── order.repository.impl.js
├── module/                     # Módulos NestJS
│   ├── app.module.js
│   └── order.module.js
└── main.js                     # Ponto de entrada da aplicação
```

## Tecnologias

- **Node.js** - Runtime JavaScript
- **Prisma** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **JavaScript**

## Pré-requisitos

- Node.js
- PostgreSQL
- npm ou yarn

## Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar banco de dados

Edite o arquivo `.env` com as credenciais do seu PostgreSQL:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/jitterbit_db?schema=public"
PORT=3000
```

### 3. Criar banco de dados

```bash
# Criar o banco de dados no PostgreSQL
createdb jitterbit_db
```

### 4. Executar migrations do Prisma

```bash
npm run prisma:migrate
```

### 5. Gerar Prisma Client

```bash
npm run prisma:generate
```

### 6. Deploy das migrations
```bash
npm run prisma:deploy
```

## Executar a aplicação

### Modo desenvolvimento (com recarregamento automático pós-alterações)

```bash
npm run dev
```

### Modo produção

```bash
npm start
```

A API estará disponível em `http://localhost:3000`

## Swagger

- UI interativa: `http://localhost:3000/docs`
- JSON OpenAPI: `http://localhost:3000/docs-json`

## Endpoints da API
Ver Swagger para detalhes completos, mas os principais são:
- `POST /order` - Criar um novo pedido
- `GET /order/:numeroPedido` - Buscar pedido por número
- `GET /order/list` - Listar todos os pedidos
- `PUT /order/:numeroPedido` - Atualizar pedido existente
- `DELETE /order/:numeroPedido` - Excluir pedido

## Autor

**Renato Dal Zot**

## Licença

MIT

## Observações do desenvolvedor (candidato)

Foi implementada uma autenticação básica JWT, não vinculada aos pedidos (qualquer usuário 
registrado e logado pode consultar e alterar todos os pedidos). Isso porque foi dado 
prioridade ao escopo do Desafio, com foco principal nas operações CRUD na arquitetura 
limpa e bem estruturada (seguindo princípios de DDD), swagger, migrations do Prisma e 
modelagem do banco de dados e mapeamento correto de DTOs conforme especificação.

Uma aplicação de backend naturalmente deveria contar com testes automatizados. Entretanto, 
uma vez que a API realiza operações básicas de CRUD, sem lógica de regras de negócio 
(valida-se apenas a presença dos campos obrigatórios e o tipo), não se mostrou conveniente a estruturação de testes, especialmente unitários.  
Além disso, honestamente, tenho atuado predominantemente com aplicações em Java, e a definição dos perfis de teste e de produção, com o Prisma ORM (dificuldades de alterar as variáveis de ambiente dentro do schema), para o contexto de aplicação dos testes integrados se mostrou uma tarefa complexa demais para a ocasião.


## Agradecimento

Agradeço pela oportunidade e espero poder prosseguir neste processo seletivo. 

