import pool from "../config/dbPool.js"; // Importamos la conexión a la base de datos PostgreSQL

// Función asíncrona para registrar un nuevo estudiante en la base de datos
export const registrarEstudiante = async (nombre, rut, curso, nivel) => {
  try {
    // Define el objeto queryObj con la consulta SQL y los valores dentro del try
    const queryObj = {
      text: 'INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4)',
      values: [nombre, rut, curso, nivel]
    };

    // Ejecuta la consulta utilizando el objeto queryObj
    const result = await pool.query(queryObj);
    console.log('Estudiante registrado exitosamente.');
    // Retorna el resultado si es necesario
    return result;
  } catch (error) {
    // Captura y maneja cualquier error ocurrido durante la ejecución de la consulta
    console.error('Error al registrar estudiante:', error.stack);
    // Lanza el error para que sea manejado por el código que llame a esta función
    throw error;
  }
};


// Función asíncrona para obtener por consola el registro de un estudiante por medio de su rut
export const obtenerEstudiantePorRut = async (rut) => {
  try {
      const queryObj = {
          text: 'SELECT * FROM estudiantes WHERE rut = $1',
          values: [rut]
      };
      const result = await pool.query(queryObj);
      console.log(result.rows);
      return result.rows;
  } catch (error) {
      console.error('Error al obtener estudiante por rut:', error.stack);
      throw error;
  }
}

// Función asíncrona para obtener por consola todos los estudiantes registrados
export const obtenerTodosLosEstudiantes = async () => {
  try {
      const queryObj = {
          text: 'SELECT * FROM estudiantes'
      };
      const result = await pool.query(queryObj);
      console.log(result.rows);
      return result.rows;
  } catch (error) {
      console.error('Error al obtener todos los estudiantes:', error.stack);
      throw error;
  }
}

// Función asíncrona para actualizar los datos de un estudiante en la base de datos
export const actualizarEstudiante = async (nombre, rut, curso, nivel) => {
  try {
      const queryObj = {
          text: 'UPDATE estudiantes SET nombre = $1, curso = $2, nivel = $3 WHERE rut = $4 RETURNING *',
          values: [nombre, curso, nivel, rut]
      };
      const result = await pool.query(queryObj);
      if (result.rows.length > 0) {
          console.log(`Estudiante con ${nombre} con RUT ${rut} ha sido actualizado.`);
      } else {
          console.log('No se encontró un estudiante con el RUT proporcionado para actualizar.');
      }
      return result.rows;
  } catch (error) {
      console.error('Error al actualizar el estudiante:', error.stack);
      throw error;
  }
}

// Función asíncrona para eliminar el registro de un estudiante de la base de datos
export const eliminarEstudiante = async (rut) => {
  try {
      const queryObj = {
          text: 'DELETE FROM estudiantes WHERE rut = $1 RETURNING *',
          values: [rut]
      };
      const result = await pool.query(queryObj);
      if (result.rows.length > 0) {
          console.log(`Registros de estudiante con RUT ${rut} ha sido eliminado.`);
          console.log(result.rows);
      } else {
          console.log('No se encontró un estudiante con el RUT proporcionado para eliminar.');
          console.log(result.rows);
      }
      return result.rows;
  } catch (error) {
      console.error('Error al eliminar el estudiante:', error.stack);
      throw error;
  }
}
