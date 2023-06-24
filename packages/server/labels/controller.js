const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const controller = {};

controller.index = async (req, res) => {
  const labels = await prisma.label.findMany();

  res.json(labels);
};

controller.show = async (req, res) => {
  const { id } = req.params;

  const result = await prisma.label.findUnique({
    where: { id: Number(id) },
  });

  if (result) {
    res.json(result);
  } else {
    res.status(400).json({ message: "400", err: "label not found" });
  }
};

controller.create = async (req, res) => {
  const { label } = req.body;
  const result = await prisma.label.create({
    data: {
      label,
    },
  });

  res.json(result);
};

controller.update = async (req, res) => {
  const { id } = req.params;
  const { label } = req.body;

  try {
    const result = await prisma.label.update({
      where: { id: Number(id) },
      data: {
        label,
      },
    });

    res.json(result);
  } catch (error) {
    res.status(400).json({ error });
  }
};

controller.destroy = async (req, res) => {
  const { id } = req.params;
  await prisma.label.delete({
    where: {
      id: Number(id),
    },
  });

  res.status(204).send();
};

module.exports = controller;
