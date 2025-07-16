const  { BlockList } = require('node:net');

const {
  IP_WHITELIST
} = require('../config.js')


const allowList = new BlockList()

const createAllowList = () => {
  const ips = IP_WHITELIST.split(',')
  ips.forEach((ip) => {
    const [net, prefix] = ip.split('/')
    const prefixNum = Number.isFinite(parseInt(prefix)) ? parseInt(prefix) : undefined
    if(prefixNum) {
      allowList.addSubnet(net, prefixNum)
    } else {
      allowList.addAddress(net)
    }
  })
}

createAllowList()


module.exports = allowList
