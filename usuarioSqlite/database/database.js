import * as SQLite from 'expo-sqlite';

const NOMBRE_BD = 'usuarios.db';

let conexion = null;

const crearTablas = async (db) => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      edad INTEGER NOT NULL CHECK (edad BETWEEN 1 AND 120)
    );
  `);
};

const abrirBaseDeDatos = async () => {
  const db = await SQLite.openDatabaseAsync(NOMBRE_BD);
  await crearTablas(db);
  return db;
};

export const obtenerConexion = () => {
  if (!conexion) {
    conexion = abrirBaseDeDatos().catch((error) => {
      conexion = null;
      throw error;
    });
  }
  return conexion;
};

export const inicializarBaseDeDatos = async () => {
  await obtenerConexion();
};
