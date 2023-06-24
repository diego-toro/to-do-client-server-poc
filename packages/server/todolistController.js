const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const controller = {};

controller.index = async (req, res) => {
  const todoList = await prisma.ticket.findMany();

  res.json(todoList);
};

controller.show = async (req, res) => {
  const { id } = req.params;

  const ticket = await prisma.ticket.findUnique({
    where: { id: Number(id) },
  });

  if (ticket) {
    res.json(ticket);
  } else {
    res.status(400).json({ message: "400", err: "todo not found" });
  }
};

controller.create = async (req, res) => {
  const { title } = req.body;
  const result = await prisma.ticket.create({
    data: {
      title,
    },
  });

  res.json(result);
};

controller.update = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const ticket = await prisma.ticket.update({
      where: { id: Number(id) },
      data: {
        title,
      },
    });
    console.log(`🚀 ~ controller.update= ~ ticket:`, ticket);

    res.json(ticket);
  } catch (error) {
    res.json({ error: `Post with ID ${id} does not exist in the database` });
  }
};

controller.destroy = async (req, res) => {
  const { id } = req.params;
  await prisma.ticket.delete({
    where: {
      id: Number(id),
    },
  });

  res.status(204).send();
};

module.exports = controller;
