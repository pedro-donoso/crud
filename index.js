const http = require('http')
const url = require('url')
const fs = require('fs')
http
.createServer(function (req, res) {
const params = url.parse(req.url, true).query
const nombre = params.nombre
const contenido = params.contenido
if (req.url.includes('/crear')) {
fs.writeFile(nombre, contenido, () => {
res.write('Archivo creado exitosamente!')
res.end()
})
}
if (req.url.includes('/leer')) {
fs.readFile(nombre, (err, data) => {
    res.write(`Su Key provisorio es ${ data }`)
res.end()
})
}
if (req.url.includes('/renombrar')) {
fs.rename('file.txt', nombre, (err, data) => {
res.write(`Archivo file.txt cambiado por ${nombre}`)
res.end()
})
}
if (req.url.includes('/eliminar')) {
fs.unlink(nombre, (err, data) => {
res.write(`Archivo ${nombre} eliminado exitosamente`)
res.end()
})
}
})
.listen(3000, () => console.log('Escuchando el puerto 3000'))