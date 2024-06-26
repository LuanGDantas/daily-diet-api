# Daily Diet API

API para controle de dieta diária.

## Entidades de Banco de dados

### Users

- id
- name
- email
- password
- session_id
- created_at
- updated_at

### Meals

- id
- name
- description
- date_time
- is_on_diet
- user_id
- created_at
- updated_at

## Regras de Negócio

- [x] As refeições devem ser relacionadas a um usuário.;
- [x] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

## Requisitos

### Requisitos Funcionais

- [x] Deve ser possível criar um usuário
- [x] Deve ser possível identificar o usuário entre as requisições
- [x] Deve ser possível registrar uma refeição feita
- [x] Deve ser possível editar uma refeição, podendo alterar todos os dados
- [x] Deve ser possível apagar uma refeição
- [x] Deve ser possível listar todas as refeições de um usuário
- [x] Deve ser possível visualizar uma única refeição
- [x] Deve ser possível recuperar as métricas de um usuário
  - [x] Quantidade total de refeições registradas
  - [x] Quantidade total de refeições dentro da dieta
  - [x] Quantidade total de refeições fora da dieta
  - [x] Melhor sequência de refeições dentro da dieta

### Requisitos Não-Funcionais

- [x] Utilizar banco de dados Sqlite em Desenvolvimento e PostgreSQL em Produção
