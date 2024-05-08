# Desafio 02 da Formação de Node.js da Rocketseat

**Módulo: Criando APIs RESTfull com Node.js**

## Sobre o desafio

Desenvolver uma API para controle de dieta diária, a Daily Diet API.

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

## Requisitos

### Requisitos Funcionais

- [] Deve ser possível criar um usuário
- [] Deve ser possível identificar o usuário entre as requisições
- [] Deve ser possível registrar uma refeição feita, com as seguintes informações:
- [] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- [] Deve ser possível apagar uma refeição
- [] Deve ser possível listar todas as refeições de um usuário
- [] Deve ser possível visualizar uma única refeição
- [] Deve ser possível recuperar as métricas de um usuário
  - [] Quantidade total de refeições registradas
  - [] Quantidade total de refeições dentro da dieta
  - [] Quantidade total de refeições fora da dieta
  - [] Melhor sequência de refeições dentro da dieta

### Requisitos Não Funcionais

- [] As refeições devem ser relacionadas a um usuário.;
- [] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou
