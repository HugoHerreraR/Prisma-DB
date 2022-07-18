const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// Require para usar Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.json({ message: "alive" });
});

app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});

//Metodo get para obtener tener todos los datos de explorers
app.get("/explorers", async (req, res) => {
  const allExplorers = await prisma.explorer.findMany({});
  res.json(allExplorers);
});

//endpoint GET que te regresa el explorer al enviar un ID por query params
app.get("/explorers/:id", async (req, res) => {
  const id = req.params.id;
  const explorer = await prisma.explorer.findUnique({
    where: { id: parseInt(id) },
  });
  res.json(explorer);
});

//POST crear nuevos explorers
app.post("/explorers", async (req, res) => {
  const explorer = {
    name: req.body.name,
    username: req.body.username,
    mission: req.body.mission,
  };
  const message = "Explorer creado.";
  await prisma.explorer.create({ data: explorer });
  return res.json({ message });
});

//PUT, en el cuál recibirás el ID del explorer a actualizar
app.put("/explorers/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  await prisma.explorer.update({
    where: {
      id: id,
    },
    data: {
      mission: req.body.mission,
    },
  });

  return res.json({ message: "Actualizado correctamente" });
});
