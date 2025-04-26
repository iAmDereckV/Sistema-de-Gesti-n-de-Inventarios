const initialData = {
  productos: [
    {
      id: 1,
      nombre: "Producto A",
      categoria: "Electrónicos",
      stock: 10,
      precio: 150.0,
    },
    { id: 2, nombre: "Producto B", categoria: "Ropa", stock: 5, precio: 50.0 },
  ],
  categorias: [
    { id: 1, nombre: "Electrónicos" },
    { id: 2, nombre: "Ropa" },
  ],
  proveedores: [
    {
      id: 1,
      nombre: "Proveedor X",
      telefono: "12345678",
      email: "provx@mail.com",
    },
  ],
  compras: [
    { id: 1, proveedor: "Proveedor X", total: 200.0, fecha: "2024-04-02" },
  ],
  ventas: [{ id: 1, usuario: "Usuario 1", total: 100.0, fecha: "2024-04-02" }],
  movimientos_inventario: [
    {
      id: 1,
      producto: "Producto A",
      tipo: "ingreso",
      cantidad: 5,
      fecha: "2024-04-02",
    },
  ],
  cajas: [
    {
      id: 1,
      usuario: "Usuario 1",
      monto_apertura: 500.0,
      monto_cierre: 450.0,
      fecha: "2024-04-02",
    },
  ],
};

export default initialData;
