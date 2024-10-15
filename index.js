const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

app.use(express.json());

const connection = mysql.createConnection({
    host: '127.0.0.1', 
    user: 'root',    
    password: '', 
    database: 'Prueba' 
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos con ID ' + connection.threadId);
});

// Api Tema B  inciso 3
app.get('/apiInciso3', (req, res) => {
    const query = `
    SELECT 
        P.PROYECTO_ID,
        P.NOMBRE,
        P.CODIGO_SAP,
        P.ALMACEN,
        E.NOMBRE AS EMPRESA_NOMBRE
    FROM PROYECTOS P
    INNER JOIN EMPRESAS E ON E.EMPRESA_ID = P.EMPRESA_ID
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error ejecutando la consulta:', err.stack);
            res.status(500).send('Error en el servidor al ejecutar la consulta.');
            return;
        }
        res.json(results); // Enviar los resultados como JSON al client
    });
});

/////////////////////////////////////////////////////////
//CREATE
app.post('/proyectos', (req, res) => {
    console.log(req.body);
    const {DESCRIPCION, NOMBRE, DIRECCION, TOTAL_OBRAS, CODIGO_SAP, ALMACEN, EMPRESA_ID } = req.body;
    
    const query = `INSERT INTO PROYECTOS (DESCRIPCION, NOMBRE, DIRECCION, TOTAL_OBRAS, CODIGO_SAP, ALMACEN, EMPRESA_ID) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    connection.query(query, [DESCRIPCION, NOMBRE, DIRECCION, TOTAL_OBRAS, CODIGO_SAP, ALMACEN, EMPRESA_ID], (err, results) => {
        if (err) {
            console.error('Error al insertar el proyecto:', err.stack);
            res.status(500).send('Error en el servidor al insertar el proyecto.');
            return;
        }
        res.status(201).json({ message: 'Proyecto creado exitosamente', id: results.insertId });
    });
});

// READ
app.get('/proyectos/:id', (req, res) => {
    const { id } = req.params;
    
    const query = `SELECT * FROM PROYECTOS WHERE PROYECTO_ID = ?`;
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error ejecutando la consulta:', err.stack);
            res.status(500).send('Error en el servidor al obtener el proyecto.');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Proyecto no encontrado');
            return;
        }
        res.json(results[0]);
    });
});

// UPDATE
app.put('/proyectos/:id', (req, res) => {
    const { id } = req.params;
    const { NOMBRE, DESCRIPCION, CODIGO_SAP, ALMACEN, EMPRESA_ID } = req.body;
    
    const query = `UPDATE PROYECTOS SET NOMBRE = ?, DESCRIPCION = ?, CODIGO_SAP = ?, ALMACEN = ?, EMPRESA_ID = ? WHERE PROYECTO_ID = ?`;
    connection.query(query, [NOMBRE, DESCRIPCION, CODIGO_SAP, ALMACEN, EMPRESA_ID, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar el proyecto:', err.stack);
            res.status(500).send('Error en el servidor al actualizar el proyecto.');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Proyecto no encontrado');
            return;
        }
        res.json({ message: 'Proyecto actualizado exitosamente' });
    });
});

// DELETE
app.delete('/proyectos/:id', (req, res) => {
    const { id } = req.params;
    
    const query = `DELETE FROM PROYECTOS WHERE PROYECTO_ID = ?`;
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar el proyecto:', err.stack);
            res.status(500).send('Error en el servidor al eliminar el proyecto.');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Proyecto no encontrado');
            return;
        }
        res.json({ message: 'Proyecto eliminado exitosamente' });
    });
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

