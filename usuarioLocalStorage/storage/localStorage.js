const obtenerStorage = () => {
  if (typeof window === 'undefined' || !window.localStorage) {
    throw new Error('LocalStorage no está disponible. Ejecuta la app en el navegador web.');
  }
  return window.localStorage;
};

export const guardarDato = async (clave, valor) => {
  const storage = obtenerStorage();
  storage.setItem(clave, JSON.stringify(valor));
  return true;
};

export const obtenerDato = async (clave, valorPorDefecto = null) => {
  const storage = obtenerStorage();
  const texto = storage.getItem(clave);
  if (texto === null) return valorPorDefecto;
  try {
    return JSON.parse(texto);
  } catch (error) {
    console.warn(`El valor de "${clave}" no es JSON válido`, error);
    return valorPorDefecto;
  }
};

export const eliminarDato = async (clave) => {
  const storage = obtenerStorage();
  storage.removeItem(clave);
  return true;
};
