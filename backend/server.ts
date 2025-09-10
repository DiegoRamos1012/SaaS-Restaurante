import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { MenuItem, Order } from "../shared/types";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

const menuPath = path.join(__dirname, "data/menu.json");
const ordersPath = path.join(__dirname, "data/orders.json");

// Rotas

// Rota de teste de funcionamento
app.get("/test", (req, res) => {
    res.json({ message: "Backend funcionando" })
});

app.get("/menu", (req, res) => {
  const menu: MenuItem[] = JSON.parse(fs.readFileSync(menuPath, "utf-8"));
  res.json(menu);
});

app.get("/orders", (req, res) => {
  const orders: Order[] = JSON.parse(fs.readFileSync(ordersPath, "utf-8"));
  res.json(orders);
});

app.post("/orders", (req, res) => {
  const orders: Order[] = JSON.parse(fs.readFileSync(ordersPath, "utf-8"));
  const newOrder: Order = {
    id: (orders.length + 1).toString(),
    tableNumber: req.body.tableNumber,
    items: req.body.items,
    total: req.body.total,
    createdAt: new Date().toISOString() // <-- aqui
  };
  orders.push(newOrder);
  fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2));
  res.status(201).json(newOrder);
});

app.listen(3001, () => console.log("Backend rodando em http://localhost:3001"));
