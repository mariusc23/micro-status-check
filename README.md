# micro-status-check

## Installation

    npm install --save @mariusc23/micro-status-check

## Usage

```js
const { applyMiddleware } = require('@mariusc23/micro-middleware')
const { middleware: statusCheck } = require('@mariusc23/micro-status-check')()

const middleware = [
  statusCheck,
]

const handler = (req, res) => {
  return 'Hello world!'
}

module.exports = applyMiddleware(middleware, handler)
```

## License

Copyright (c) 2017 Marius Craciunoiu. Licensed under the MIT license.
