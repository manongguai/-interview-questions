// 在NodeJS中，中间件主要是指封装所有Http请求细节处理的方法。一次Http请求通常包含很多工作，如记录日志、ip过滤、查询字符串、请求体解析、Cookie处理、权限验证、参数验证、异常处理等，但对于Web应用而言，并不希望接触到这么多细节性的处理，因此引入中间件来简化和隔离这些基础设施与业务逻辑之间的细节，让开发者能够关注在业务的开发上，以达到提升开发效率的目的。

// 中间件的行为比较类似Java中过滤器的工作原理，就是在进入具体的业务处理之前，先让过滤器处理。

const http = require('http')
function compose(middlewareList) {
  return function (ctx) {
    function dispatch (i) {
      const fn = middlewareList[i]
      try {
        return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)))
      } catch (err) {
        Promise.reject(err)
      }
    } 
    return dispatch(0)
  }
}
class App {
  constructor(){
    this.middlewares = []
  }
  use(fn){
    this.middlewares.push(fn)
    return this
  }
  handleRequest(ctx, middleware) {
    return middleware(ctx)
  }
  createContext (req, res) {
    const ctx = {
      req,
      res
    }
    return ctx
  }
  callback () {
    const fn = compose(this.middlewares)
    return (req, res) => {
      const ctx = this.createContext(req, res)
      return this.handleRequest(ctx, fn)
    }
  }
  listen(...args) {
    const server = http.createServer(this.callback())
    return server.listen(...args)
  }
}
module.exports = App