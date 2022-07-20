const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// Require para usar Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Cors
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:8081"
}
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json({ message: "alive" });
});

app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});

//API
//Endpoint de tabla Explorers
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

//DELETE para eliminar explorer
app.delete('/explorers/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	await prisma.explorer.delete({where: {id: id}});
	return res.json({message: "Eliminado correctamente"});
});


//Endpoint de tabla ExplorerInfo
//Get obtener toda la información
app.get("/explorerinfo", async(req, res) => {
  const allExplorersInfo = await prisma.ExplorerInfo.findMany({});
  res.json(allExplorersInfo);
})
//Get obtener información por id
app.get("/explorerinfo/:id", async(req, res) => {
  const id = req.params.id;
  const allExplorersInfo = await prisma.ExplorerInfo.findUnique({
    where: {id: parseInt(id)}
  });
  res.json(allExplorersInfo);
})
//Post crear nuevo explorer
app.post("/explorerinfo", async(req, res) => {
  const explorer = {
    name: req.body.name,
    lang: req.body.lang,
    missionCommander: req.body.missionCommander,
    enrollments: req.body.enrollments
  }
  const message = "Explorer registrado";
  await prisma.ExplorerInfo.create({data: explorer});
  return res.json({message});
})
//PUT modificar explorer
app.put("/explorerinfo/:id", async(req, res) => {
  const id = parseInt(req.params.id);

  await prisma.ExplorerInfo.update({
    where: {
      id: id,
    },
    data: {
      hasCertification: req.body.hasCertification
    }
  });

  return res.json({message: "Actulizado correctamente"});
});
//DELETE explorer
app.delete("/explorerinfo/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.ExplorerInfo.delete({ where: {id: id}});
  return res.json({message: "Eliminado"})
})

//API missionCommander
app.get("/missionCommander", async (req, res) => {
  const allCommanders = await prisma.missionCommander.findMany({});
  res.json(allCommanders);
})

app.get("/missionCommander/:id", async(req, res) => {
  const id = req.params.id;
  const Comander = await prisma.missionCommander.findUnique({
    where: {id: parseInt(id)}
  })
  res.json(Comander);
})

app.post("/missionCommander", async(req, res) => {
  const commander = {
    name: req.body.name,
    username: req.body.username,
    mainStack: req.body.mainStack,
    currentEnrollment: req.body.currentEnrollment,
    hasAzureCertification: req.body.hasAzureCertification
  }
  const message = "missionCommander registrado";
  await prisma.missionCommander.create({data: commander});
  return res.json({message});
})