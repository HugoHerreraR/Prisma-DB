const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

(async function main() {
  try {
    const user = await prisma.explorer.upsert({
      where: { name: "user" },
      update: {},
      create: {
        name: "Pepito",
        username: "ajolonauta",
        mission: "Node",
      },
    });

    const user2 = await prisma.explorer.upsert({
      where: { name: "user2" },
      update: {},
      create: {
        name: "Roberto",
        username: "robert",
        mission: "Node",
      },
    });

    const user3 = await prisma.explorer.upsert({
      where: { name: "user3" },
      update: {},
      create: {
        name: "Renata",
        username: "nati",
        mission: "Java",
      },
    });

    const user4 = await prisma.explorer.upsert({
      where: { name: "user4" },
      update: {},
      create: {
        name: "Woopa 3",
        username: "ajolonauta3",
        mission: "Node",
      },
    });

    const user5 = await prisma.explorer.upsert({
      where: { name: "user5" },
      update: {},
      create: {
        name: "Paola",
        username: "pao",
        mission: "Node",
      },
    });

    console.log("Create 5 explorers");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
