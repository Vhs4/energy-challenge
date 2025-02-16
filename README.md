## Contato

Se precisar de suporte, entre em contato pelo e-mail: [contatovhs4@gmail.com](mailto:contatovhs4@gmail.com).

# Front-end

- Variável de ambiente obrigatória: `NEXT_PUBLIC_API_BASE_URL`

## Requisitos

- Node.js (versão recomendada: 18+)
- NPM ou Yarn

## Instalação

1. Clone este repositório:
   ```sh
   git clone https://github.com/Vhs4/energy-challenge.git
   ```

2. Acesse a pasta do projeto:
   ```sh
   cd nome-do-projeto
   ```

3. Instale as dependências:
   ```sh
   npm install
   # ou
   yarn install
   ```

## Executando o Projeto

Para iniciar o servidor de desenvolvimento, execute:
   ```sh
   npm run dev
   # ou
   yarn dev
   ```

O projeto estará disponível em: [http://localhost:3000](http://localhost:3000)

## Build para Produção

Para gerar os arquivos otimizados para produção, utilize:
   ```sh
   npm run build
   # ou
   yarn build
   ```

## Tecnologias Utilizadas

- Next.js
- React
- Tailwind CSS
- TypeScript
- ShadCN

# Back-end

- Variável de ambiente obrigatória: `DATABASE_URL`

```
docker-compose up --build
```
## Após isso
```
docker-compose exec backend npx prisma migrate dev
docker-compose exec backend npm run prisma:seed
```

### O back-end estará disponível em `http://localhost:3001`

## Todas as rotas do back-end:

1. **Listar todos os fornecedores (GET)**
URL: `http://localhost:3001/api/suppliers`

Parâmetros de query opcionais:

1. `consumption`: Filtra fornecedores por consumo mínimo
2. `page`: Número da página (padrão: 1)
3. `perPage`: Itens por página (padrão: 6)


Exemplo: `http://localhost:3001/api/suppliers?consumption=10000&page=1&perPage=10`


2. **Obter um fornecedor específico (GET)**
URL: `http://localhost:3001/api/suppliers/:id`

Exemplo: `http://localhost:3001/api/suppliers/1`


3. **Criar um novo fornecedor (POST)**
URL: `http://localhost:3001/api/suppliers`

JSON para teste:

```json
{
  "name": "Nova Energia",
  "logo": "/placeholder.svg?height=80&width=80",
  "state": "Santa Catarina",
  "costPerKWh": 0.54,
  "minKWh": 12000,
  "totalCustomers": 35000,
  "averageRating": 4.6,
  "whatsapp": "5548999999906"
}
```

**Atualizar um fornecedor existente (PUT)**
URL: `http://localhost:3001/api/suppliers/:id`

Exemplo: `http://localhost:3001/api/suppliers/1`

JSON para teste:

```json
{
  "name": "EcoEnergy Atualizada",
  "costPerKWh": 0.56,
  "totalCustomers": 55000,
  "averageRating": 4.7
}
```

**Excluir um fornecedor (DELETE)**
URL: `http://localhost:3001/api/suppliers/:id`

Exemplo: `http://localhost:3001/api/suppliers/1`


Para testar a filtragem por consumo e paginação, você pode usar:

```plaintext
http://localhost:3001/api/suppliers?consumption=10000&page=1&perPage=10
```