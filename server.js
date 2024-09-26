import express from "express";
import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client/edge";

/*

 API de usuários

    - Cadastrar usuários
    - Listar usuários
    - Editar usuários
    - Deletar usuários

*/

const prisma = new PrismaClient();

const App = express();
App.use(express.json());

App.post("/users", async (req, res) => {
  await prisma.user.create({
    data: {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
    },
  });

  res.status(201).json(req.body);
});

App.get("/users", async (req, res) => {
  let users = [];
  if (req.query) {
    users = await prisma.user.findMany({
      where: {
        name: req.query.name,
      },
    });
  } else {
    users = await prisma.user.findMany();
  }

  res.status(200).json(users);
});

App.put("/users/:id", async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id,
    },

    data: {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
    },
  });

  res.status(201).json(req.body);
});

App.delete("/users/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ message: "Usuário deletado com sucesso!" });
});

App.listen(3000);
