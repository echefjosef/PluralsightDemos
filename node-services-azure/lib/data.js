'use strict'

let _data = []

exports.get = function () {
  return new Promise(function (resolve, reject) {
    resolve(_data)
  })
}

exports.getById = function (id) {
  return new Promise(function (resolve, reject) {
    // Retrieve funciton
    resolve(_data[id])
  })
}

exports.add = function (data) {
  return new Promise(function (resolve, reject) {
    // Add data here with id based on array count
    let record = data
    record.id = _data.length
    _data.push(record)
  })
}

exports.update = function (id, data) {
  return new Promise(function (resolve, reject) {
    // update data here with id based on array count
    let record = data
    record.id = id
    _data[id] = record
  })
}
