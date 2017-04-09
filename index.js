class StatusCheck {
  constructor(options = {}) {
    this.url = options.url || '/status-check'
    this.lastCheck = null
    this.handler = this.handler.bind(this)
    this.middleware = this.middleware.bind(this)
  }

  updateLastCheck() {
    const lastCheck = this.lastCheck
    this.lastCheck = (new Date()).getTime()
    return lastCheck
  }

  handler(req, res) {
    return {
      stillAlive: true,
      lastCheck: this.updateLastCheck(),
    }
  }

  middleware(next) {
    return (req, res) => {
      if (req.url === this.url) {
        return this.handler(req, res)
      }
      return next(req, res)
    }
  }
}

module.exports = (...args) => new StatusCheck(...args)
