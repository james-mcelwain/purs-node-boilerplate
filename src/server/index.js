const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = 8080

const handleRequest = (request, response) => {
  console.log(`Request received for ${request.url}`)
  if (request.url === '/') {
    return fs.readFile(path.resolve('.', 'src/server/index.html'), (err, file) => {
      if (err) {
        console.log(err)
        response.writeHead(500)
        return response.end()
      }
      response.writeHead(200, { 'Content-Type': 'text/html' })
      return response.end(file)
    })
  }

  if (request.url === '/bundle.js') {
    response.setHeader('cache-control', 'max-age=0, no-cache, no-store')
    response.setHeader('pragma', 'no-cache')
    response.setHeader('expires', 'Mon, 11 Jan 1988 12:00:00 GMT')

    return fs.readFile(path.resolve('.', 'dist/bundle.js'), (err, file) => {
      if (err) {
        console.log(err)
        response.writeHead(500)
        return response.end()
      }

      response.writeHead(200, { 'Content-Type': 'application/javascript' })
      return response.end(file)
    })
  }

  console.log(`[404]: ${request.url}`)
  response.writeHead(404)
  return response.end()
}

const server = http.createServer(handleRequest)

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

module.exports = server

