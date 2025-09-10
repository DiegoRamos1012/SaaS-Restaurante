import express from "express";
import fs from "fs";
import path from "path";

const app = express();
app.use(express.json());

const menuPath = path.join(__dirname, "data/menu.json");
const ordersPath = path.join(__dirname, "data/orders.json");

// GET /menu → retorna cardápio
app.get("/menu", (req, res) => {
  const menu = JSON.parse(fs.readFileSync(menuPath, "utf-8"));
  res.json(menu);
});

// GET /orders → retorna pedidos
app.get("/orders", (req, res) => {
  const orders = JSON.parse(fs.readFileSync(ordersPath, "utf-8"));
  res.json(orders);
});

// POST /orders → cria pedido
app.post("/orders", (req, res) => {
  const orders = JSON.parse(fs.readFileSync(ordersPath, "utf-8"));
  const newOrder = {
    id: (orders.length + 1).toString(),
    tableNumber: req.body.tableNumber,
    items: req.body.items,
    total: req.body.total,
    createdAt: new Date()
  };

  orders.push(newOrder);
  fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2));

  res.status(201).json(newOrder);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor mock rodando em http://localhost:${PORT}`);
});
