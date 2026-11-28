import { obtenerConexion } from '../database/database';

export const obtenerTodos = async () => {
  const db = await obtenerConexion();
  return db.getAllAsync('SELECT id, nombre, edad FROM usuarios ORDER BY id DESC');
};

export const obtenerPorId = async (id) => {
  const db = await obtenerConexion();
  return db.getFirstAsync('SELECT id, nombre, edad FROM usuarios WHERE id = ?', [id]);
};

export const insertar = async (nombre, edad) => {
  const db = await obtenerConexion();
  const resultado = await db.runAsync(
    'INSERT INTO usuarios (nombre, edad) VALUES (?, ?)',
    [nombre, edad]
  );
  return resultado.lastInsertRowId;
};

export const actualizar = async (id, nombre, edad) => {
  const db = await obtenerConexion();
  const resultado = await db.runAsync(
    'UPDATE usuarios SET nombre = ?, edad = ? WHERE id = ?',
    [nombre, edad, id]
  );
  return resultado.changes;
};

export const eliminar = async (id) => {
  const db = await obtenerConexion();
  const resultado = await db.runAsync('DELETE FROM usuarios WHERE id = ?', [id]);
  return resultado.changes;
};
