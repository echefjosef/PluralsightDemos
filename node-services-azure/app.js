'use strict'

let app = require('koa')()
let cors = require('kcors')
let router = require('koa-router')()
let data = require('./lib/data')
const coBody = require('co-body')

// Koa Error out to 401
app.on('error', function (err) {
  this.status = 401
  this.body = err
  console.log(err)
})

// CORS Support
app.use(cors({
  origin: '*',
  allowHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  allowMethods: ['GET', 'POST']
}))

// Custom 401 -- Wrap errors so we don't expose internal errors to users where possible
app.use(function * custom401 (next) {
  try {
    yield next
  } catch (err) {
    if (err.status === 401) {
      this.status = 401
      this.body = 'An Error has occured in the system.  If this persists, please contact Support.'
      
      console.log('Error in service: ' + err)
    } else {
      // For non-web transport failures, rely on Koa error reporting
      throw err
    }
  }
})

router
  .get('/', readRecord)
  .post('/', addRecord)
  .put('/:id', updateRecord)

// Auth Routes
app.use(router.routes())
app.use(router.allowedMethods())

// GET
function readRecord (next) {
  this.status = 200
  this.body = data.get()
}

// POST
function * addRecord (next) {
  this.status = 200
  let formData = yield coBody(this)
  this.body = yield data.add(JSON.parse(formData))
}

// PUT
function * updateRecord (next) {
  this.status = 200
  let formData = yield coBody(this)
  this.body = yield data.update(this.params.id, JSON.parse(formData))
}

app.listen(4000)
console.log('Listening on port 4000')
