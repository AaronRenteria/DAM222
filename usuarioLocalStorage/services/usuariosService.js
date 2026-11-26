import { guardarDato, obtenerDato } from '../storage/localStorage';

const CLAVE_USUARIOS = 'usuarios';

export const validarUsuario = (nombre, edad) => {
  const nombreLimpio = (nombre ?? '').toString().trim();
  const edadTexto = (edad ?? '').toString().trim();

  if (nombreLimpio === '' || edadTexto === '') {
    return { valido: false, mensaje: 'Todos los campos son obligatorios.' };
  }
  if (nombreLimpio.length < 3) {
    return { valido: false, mensaje: 'El nombre debe tener al menos 3 caracteres.' };
  }
  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü ]+$/.test(nombreLimpio)) {
    return { valido: false, mensaje: 'El nombre solo puede contener letras y espacios.' };
  }
  if (!/^\d+$/.test(edadTexto)) {
    return { valido: false, mensaje: 'La edad debe ser un número entero.' };
  }
  const edadNumero = parseInt(edadTexto, 10);
  if (edadNumero < 1 || edadNumero > 120) {
    return { valido: false, mensaje: 'La edad debe estar entre 1 y 120 años.' };
  }
  return { valido: true, nombre: nombreLimpio, edad: edadNumero };
};

export const obtenerUsuarios = async () => {
  const usuarios = await obtenerDato(CLAVE_USUARIOS, []);
  return Array.isArray(usuarios) ? usuarios : [];
};

export const obtenerUsuarioPorId = async (id) => {
  const usuarios = await obtenerUsuarios();
  return usuarios.find((u) => u.id === String(id)) ?? null;
};

export const agregarUsuario = async (nombre, edad) => {
  const validacion = validarUsuario(nombre, edad);
  if (!validacion.valido) return { ok: false, mensaje: validacion.mensaje };

  const usuarios = await obtenerUsuarios();
  const nuevo = {
    id: Date.now().toString(),
    nombre: validacion.nombre,
    edad: validacion.edad,
  };
  await guardarDato(CLAVE_USUARIOS, [...usuarios, nuevo]);
  return { ok: true, mensaje: 'Usuario guardado correctamente.', usuario: nuevo };
};

export const actualizarUsuario = async (id, nombre, edad) => {
  const validacion = validarUsuario(nombre, edad);
  if (!validacion.valido) return { ok: false, mensaje: validacion.mensaje };

  const usuarios = await obtenerUsuarios();
  const indice = usuarios.findIndex((u) => u.id === String(id));
  if (indice === -1) return { ok: false, mensaje: 'El usuario no existe.' };

  const actualizado = { ...usuarios[indice], nombre: validacion.nombre, edad: validacion.edad };
  const nuevaLista = [...usuarios];
  nuevaLista[indice] = actualizado;
  await guardarDato(CLAVE_USUARIOS, nuevaLista);
  return { ok: true, mensaje: 'Usuario actualizado correctamente.', usuario: actualizado };
};

export const eliminarUsuario = async (id) => {
  const usuarios = await obtenerUsuarios();
  const nuevaLista = usuarios.filter((u) => u.id !== String(id));
  if (nuevaLista.length === usuarios.length) {
    return { ok: false, mensaje: 'El usuario no existe.' };
  }
  await guardarDato(CLAVE_USUARIOS, nuevaLista);
  return { ok: true, mensaje: 'Usuario eliminado correctamente.' };
};
