
const logger = (request, response, next) => { // View logger de todas las solicitudes
  console.log(request.method)
  console.log(request.path)
  console.log(request.body)
  console.log('--------------------')
  next()
}

module.exports = logger
