const { expect } = require('chai')
const sinon = require('sinon')
const statusCheck = require('../')

describe('micro-status-check', () => {
  const sc = statusCheck()

  it('should have default url', () => {
    expect(sc.url).to.equal('/status-check')
  })

  it('should default lastCheck to null', () => {
    expect(sc.lastCheck).to.equal(null)
  })

  it('should update lastCheck', () => {
    sc.handler()
    expect(sc.lastCheck).to.be.a('number')
  })

  it('should return stillAlive and lastCheck', () => {
    const result = sc.handler()
    expect(result.stillAlive).to.equal(true)
    expect(result.lastCheck).to.be.a('number')
  })

  it('should call handler if url matches', () => {
    const next = sinon.spy()
    const handler = sc.middleware(next)
    const req = { url: sc.url }
    expect(handler(req)).to.have.keys(['stillAlive', 'lastCheck'])
    expect(next.calledOnce).to.equal(false)
  })

  it('should call next if url does not match', () => {
    const next = sinon.spy()
    const handler = sc.middleware(next)
    const req = { url: '/definitely-not-status-check' }
    handler(req)
    expect(next.calledOnce).to.equal(true)
  })
})
