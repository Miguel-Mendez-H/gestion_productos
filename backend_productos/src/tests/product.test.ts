import request from "supertest";
import app from "../index";

describe("🔹 Pruebas sobre la API de productos", () => {
  
  test("📌 GET /api/products debe devolver un array", async () => {
    const res = await request(app).get("/api/products");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("📌 POST /api/products debe crear un producto válido", async () => {
    const res = await request(app).post("/api/products").send({
      name: "Nuevo Producto",
      description: "Este es un producto de prueba",
      price: 5000,
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  test("📌 POST /api/products debe rechazar datos inválidos", async () => {
    const res = await request(app).post("/api/products").send({
      name: "",
      description: "Muy corto",
      price: -10,
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });
});
