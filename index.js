/**
 * bd-dist - index.js
 * Created by jiasm on 18/04/19
 */

'use strict'

/**
 * Module dependencies.
 */

const resolve = require('path').resolve
const assert = require('assert')
const send = require('koa-send')

/**
 * Expose `serve()`.
 */

const routes = {}

/**
 * Serve static files from `root`.
 *
 * @param {String} root
 * @param {Object} [opts]
 * @return {Function}
 * @api public
 */

module.exports = function serve (root, route = '/', opts = {}) {
  console.log(root, route, opts)
  assert(root, 'root directory is required to serve files')

  // options
  opts.root = resolve(root)
  opts.index = opts.index || 'index.html'

  routes[route] = opts
  return async function serve (context, next) {
    await next()
    var route = context.path.split('/')[1] || '/'
    if (context.method !== 'HEAD' && context.method !== 'GET') return
    // response is already handled
    if ((context.body !== null && context.body !== undefined) || context.status !== 404) return

    await send(context, context.path.slice(1 + route.length) || '/', routes[route])
  }
}
