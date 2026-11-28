import {
  actualizar,
  eliminar,
  insertar,
  obtenerPorId,
  obtenerTodos,
} from '../repositories/usuariosRepository';

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

const validarId = (id) => {
  const numero = Number(id);
  return Number.isInteger(numero) && numero > 0 ? numero : null;
};

export const obtenerUsuarios = async () => {
  return obtenerTodos();
};

export const obtenerUsuarioPorId = async (id) => {
  const idValido = validarId(id);
  if (idValido === null) return null;
  return obtenerPorId(idValido);
};

export const agregarUsuario = async (nombre, edad) => {
  const validacion = validarUsuario(nombre, edad);
  if (!validacion.valido) return { ok: false, mensaje: validacion.mensaje };

  const id = await insertar(validacion.nombre, validacion.edad);
  return {
    ok: true,
    mensaje: 'Usuario guardado correctamente.',
    usuario: { id, nombre: validacion.nombre, edad: validacion.edad },
  };
};

export const actualizarUsuario = async (id, nombre, edad) => {
  const idValido = validarId(id);
  if (idValido === null) return { ok: false, mensaje: 'El usuario no existe.' };

  const validacion = validarUsuario(nombre, edad);
  if (!validacion.valido) return { ok: false, mensaje: validacion.mensaje };

  const cambios = await actualizar(idValido, validacion.nombre, validacion.edad);
  if (cambios === 0) return { ok: false, mensaje: 'El usuario no existe.' };
  return {
    ok: true,
    mensaje: 'Usuario actualizado correctamente.',
    usuario: { id: idValido, nombre: validacion.nombre, edad: validacion.edad },
  };
};

export const eliminarUsuario = async (id) => {
  const idValido = validarId(id);
  if (idValido === null) return { ok: false, mensaje: 'El usuario no existe.' };

  const cambios = await eliminar(idValido);
  if (cambios === 0) return { ok: false, mensaje: 'El usuario no existe.' };
  return { ok: true, mensaje: 'Usuario eliminado correctamente.' };
};
