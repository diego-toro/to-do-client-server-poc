const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const controller = {};

controller.index = async (req, res) => {
  const tasks = await prisma.ticket.findMany({
    include: {
      labels: true,
    },
  });

  res.json(tasks);
};

controller.show = async (req, res) => {
  const { id } = req.params;

  const ticket = await prisma.ticket.findUnique({
    where: { id: Number(id) },
    include: {
      labels: true,
    },
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

function arrayDifference(array1, array2) {
  return array1.filter(
    ({ id }) => array2.find(({ id: labelId }) => labelId === id) === undefined
  );
}

controller.update = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, labels } = req.body;

  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: Number(id) },
      include: {
        labels: true,
      },
    });

    let disconnectLabels = arrayDifference(ticket.labels, labels);

    let connectLabels = arrayDifference(labels, ticket.labels);

    const updatedTicket = await prisma.ticket.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        status,
        labels: {
          connect: connectLabels.map(({ id }) => ({ id })),
          disconnect: disconnectLabels.map(({ id }) => ({ id })),
        },
      },
      include: { labels: true },
    });

    res.json(updatedTicket);
  } catch (error) {
    console.log(
      "🚀 ~ file: controller.js:59 ~ controller.update= ~ error:",
      error
    );
    res.status(400).json({ error });
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
