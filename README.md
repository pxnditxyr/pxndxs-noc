<p align="center">
    <a href="https://github.com/pxnditxyr/pxndxs-ui">
        <img width="20%" src="https://camo.githubusercontent.com/88a3d6c2df50a4514fe5058ac033ad70aa295adce83327062b7158ab647a27c9/68747470733a2f2f72656d696e642d6d652d706c7a2e6e65746c6966792e6170702f79756b692e737667" alt="Pxndxs" />
        <h1 align="center"> Pxndxs NOC </h1>
    </a>
</p>
</br>

# Pxndxs NOC 🌐🛠️ |  Typescript  

Network Operations Center (NOC) system developed using Node.js and TypeScript. The NOC is a crucial tool for monitoring and managing an organization's network of computer systems

## Prerequisites 📋

Make sure you have the following programs installed before getting started:

- [Bun 🧄](https://bun.sh/) (version 1.0.X)

Or

- [Node.js 🐦](https://nodejs.org/) (version 20.X.X)
- [npm  ](https://www.npmjs.com/) (version 10.X.X)

## Installation 🛠️

1. Clone the repository: 🧬

```bash
git clone https://github.com/pxnditxyr/pxndxs-noc
```

2. Navigate to the project directory: 📂

```bash
cd pxndxs-noc
```

3. Install dependencies:

```bash
bun i
```

## Configuration ⚙️

### Environment Variables

1. Copy the example environment file to create you `.env` file: 🔑

```bash
cp .env.example .env
```

2. Update the `.env` file with your configuration values.

### Database 🗄️

1. If you're using a containerized database, you can use Docker Compose to start it: 🐋

```bash
docker compose up -d
```

2. Then, run Prisma migrations: 🔄

```bash
bunx prisma db push
```
### Other considerations 📋

1. In your database, you must record the roles accepted by your system, and the name of each role must be written 📝 in the same way in the file: 
./src/users/enums/valid-roles.enum.ts 📂

## Usage 🚀

Run the application in Development Mode: 🚀

```bash
bun start:dev
```

## Technologies Used 🛠️

- [NestJS 🦁](https://nestjs.com/)
- [Bun 🧄](https://babeljs.io/) 📜
- [Prisma  ](https://www.prisma.io/)

## License 📄

This project is under the MIT License. Check the [LICENSE](LICENSE) file for more details. 📜
