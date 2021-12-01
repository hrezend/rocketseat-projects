<h3 align="center">
    <img alt="Logo" title="#logo" width="300px" src="./wallpapers/logo.png">
    <br><br>
    <b>Recicle! Ajude o meio ambiente!</b> 
</h3>

# Índice

- [Database](#database)
- [Back-end](#back-end)
- [Front-end](#tecnologias-utilizadas)
- [Mobile](#como-usar)

<a id="database"></a>

# 📄 Database

Na aplicação vamos utilizar o **SQLite3** para nosso banco de dados, pois além de ser **MySQL** ele não precisa de nenhum ambiente de configuração na máquina para rodar.

## Dependências

- sqlite3
- knex

### SQLite3

- Primeiro precisamos instalar o pacote do **SQLite3** na nossa aplicação:

```sh
  $ npm install sqlite3
```

### Knex

- O **Knex** é um query builder que nos permite escrever comandos **SQL** com a sintaxe do **JavaScript**. Iremos utiliza-lo para manusear o banco de dados da aplicação.

1. Primeiro, vamos instalar o knex:

```sh
  $ npm install knex
```

2. Em seguida, podemos configurar um script para executar as migrations de forma mais fácil. Para isso, dentro do arquivo `package.json` adicione este comando:

```json
  "scripts": {
    "knex:migrate": "knex --knexfile knexfile.ts migrate:latest",
  },
```

- Para executar as migrations utilize o comando: `npm run knex:migrate`

3. Por fim, vamos configurar um script para excutar as seeds do banco de dados logo abaixo do `knex:migrate` dentro do `package.json`:

```json
  "scripts": {
    "knex:migrate": "knex --knexfile knexfile.ts migrate:latest",
    "knex:seed": "knex --knexfile knexfile.ts seed:run"
  },
```

- Para executar as seeds basta executar este comando: `npm run knex:seed`

<a id="back-end"></a>

# 📃 Back-end

Para iniciarmos com o desenvolvimento do <strong>Back-end</strong> da nossa aplicação, vamos precisar configurar e instalar alguns pacotes para o </strong>Node.js</strong> rodar junto ao <strong>TypeScript</strong>.

## Dependências

- typescript
- express | @types/express
- ts-node
- ts-node-dev
- cors | @types/cors
- celebrate

### Configuração Inicial

- Para iniciar qualquer projeto com <strong>Node.js</strong> você precisar criar o arquivo de configuração inicial `package.json`. Para isso, basta executar:

```sh
  $ npm init -y
```

### TypeScript

- Para utilizar **TypeScript** em qualquer projeto precisamos instalar a sua própria dependência.

```sh
  $ npm install typescript
```

- Após a intalação do pacote podemos criar as configurações padrões para a utilização do typescript com o comando:

```sh
  $ npx typescript --init
```

### Express

- O express será o responsável pelo roteamento do nosso servidor. Precisamos instalr o pacote padrão do express e também o @types, para utilizarmos com o TypeScript.

```sh
  # Instação do express
  $ npm install express

  # instalação do express com tipagem para TypeScript
  $ npm install @types/express -D

```

### ts-node

- O **ts-node** serve para compilarmos através do **Node** arquivos **TypeScript**, pois o por padrão o **Node** executa somente **JavaScript**. Para isso, vamos instalar da seguinte forma:

```sh
  $ npm install ts-node -D
```

### ts-node-dev

- O pacote **ts-node-dev** faz o monitoramento da pasta configurada, assim não precisamos executar `npx ts-node-dev src/server.ts` todas as vezes que fizermos alguma alteração no código.

```sh
  $ npm install ts-node-dev -D
```

- Após instalar a dependência, vamos configurar o script para executar o arquivo do nosso servidor. Dentro de `package.json` vamos adicionar a seguinte linha de comando:

```json
  "scripts": {
    "dev": "ts-node-dev src/server.ts"
  },
```

- Por fim, podemos executar o servidor dessa maneira: `npm run dev`. Dessa forma, sempre que houver alguma alteração do código, o **ts-node-dev** irá fazer a reinicialização automática.

### CORS

- O express será o responsável por permitir que outras urls acessem nossa API. Precisamos instalr o pacote padrão do cors e também o @types, para utilizarmos com o TypeScript.

```sh
  # Instação do express
  $ npm install cors

  # instalação do express com tipagem para TypeScript
  $ npm install @types/cors -D

```

### CELEBRATE

- O celebrate é responsável por fazer a validação de dados diretamente na fase de rotas da aplicação.

```sh
  # Instalação do celebrate
  $ npm install celebrate
```

<a id="front-end"></a>

# 🖥 Front-end e Mobile

## Dependências

- react-icons
- react-router-dom | @types/react-router-dom
- leaflet | react-leaflet | @types/leaflet
- axios
- react-native-picker-select

### Criando o template React

- Para iniciarmos a parte front-end vamos criar nosso ambiente com react utilizando typescript. Para isso, vamos executar o seguinte comando:

```sh
  $ npx create-react-app nomedapasta --template=typescript
``` 

### React Icons

- O **React Icons** irá nos ajudar na utilização de ícones na aplicação web. Esse pacote é bem completo e conta com várias coleções de ícones fomosas como **Font Awesome**, **Feather Icons**, **Meterial Icons**, entre outros....

1. Primeiro vamos instalar a dependência:

```sh
  $ npm install react-icons
```

2. Para usar é bem simples, vamos importar esse pacote no arquivo onde queremos adicionar os ícones. Note que após 'react-icons' é passado uma '/' e após essa barra você irá informar qual coleção de ícones irá utilizar. Por fim, pasta criar o component com o nome do ícone que você importou.

```javascript
  // Importação
  import { FiArrowLeft } from 'react-icons/fi'

  // Component
  <FiArrowLeft size={32} color="#fff" />
```

### React Router DOM

- O **React Router DOM** será responsável pelo roteamento da nossa aplicação web. para isso vamos fazer sua instalação e em seguida instalar sua tipagem.

```sh
  # Instação do react-router-dom
  $ npm install react-router-dom

  # instalação do react-router-dom com tipagem para TypeScript
  $ npm install @types/react-router-dom -D
```

### Leaflet

- Para manusearmos um mapa nós vamos utilizar o **Leaflet**. O **Leaflet** é uma alternativa open source para utilização de mapas com **javascript**. Para utilizarmos vamos precisar instalar o seu próprio pacote, o pacote para **ReactJS** e também o pacote de tipagems

```sh
  # Instação do leaflet e react-leaflet
  $ npm install leaflet react-leaflet

  # instalação do react-leaflet com tipagem para TypeScript
  $ npm install @types/react-leaflet -D
```

### Axios

- Utilizamos o **Axios** para realizar todas as requisições HTTP da nossa aplicação. É importante descatar que o axios também pode ser utilizar no **React Native**.

```sh
  $ npm install axios
```

### PickerSelect

- Utilizamos o **PickerSelect** para criar os componentes de input-select no mobile da aplicação.

```sh
  $ npm install react-native-picker-select
```
