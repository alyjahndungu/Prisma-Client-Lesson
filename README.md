In this step, you will set up a plain TypeScript project using npm. This project will be the foundation for the REST API you’re going to build throughout the small project.

mkdir jamila
cd jamila
npm init -y - initialize an empty npm project

npm install typescript ts-node @types/node -D -> Setup TypeScript

###Step 2 — Setting Up Prisma with PostgreSQL
npm install prisma -D

nano docker-compose.yml - Setup Postgres or MySQL compose commands

npx prisma init

npx prisma migrate dev --name "init" - Creating the corresponding tables

npm install @prisma/client
