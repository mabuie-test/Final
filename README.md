# Monitoramento VHF - Render

Este projeto consiste em um sistema simples de monitoramento com backend em **Express.js** e frontend em **React.js**, configurado para deploy na plataforma Render.com. O backend oferece rotas de autenticação (login/registro), registro de logs, status e localização no mapa, utilizando JSON Web Tokens (JWT) para autenticação e CORS habilitado para comunicação com o frontend. O frontend apresenta uma interface de login, um dashboard listando os status cadastrados e uma visualização em mapa com o Leaflet.

## Estrutura de Pastas

- **backend/**: código da API em Express.js
- **frontend/**: código da aplicação cliente em React.js
- Cada serviço possui seu próprio arquivo `.env.example` com variáveis de ambiente, pronto para configuração no Render.

## Backend (Express.js)

O servidor Express se conecta a um banco MongoDB usando a variável de ambiente `MONGO_URI`. As variáveis de ambiente suportadas são:
- `PORT`: porta para o servidor (padrão 5000)
- `MONGO_URI`: string de conexão do MongoDB Atlas
- `JWT_SECRET`: chave secreta para assinatura dos tokens JWT

O **backend** implementa as seguintes rotas:

- `POST /api/auth/register`: registra um novo usuário (usuário e senha criptografados)
- `POST /api/auth/login`: faz login e retorna um token JWT válido
- `GET /api/status`: retorna uma lista de status (requer JWT)
- `GET /api/map`: retorna marcadores de mapa ({lat, lng, name}) baseados nos status (requer JWT)
- `GET /api/logs`: lista todos os logs (requer JWT)
- `POST /api/logs`: cria um novo log (requer JWT)

Para habilitar CORS e permitir requisições do frontend, usamos o middleware `cors` (ex: `app.use(cors())`):contentReference[oaicite:0]{index=0}. A autenticação JWT é implementada com o pacote `jsonwebtoken`, usando `jwt.sign(...)` ao criar os tokens de login:contentReference[oaicite:1]{index=1}. 

Exemplo de arquivo `.env.example` no backend:
```env
PORT=5000
MONGO_URI=mongodb+srv://<usuario>:<senha>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=seu_jwt_secret_aqui
