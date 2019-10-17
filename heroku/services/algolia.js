const algoliasearch = require('algoliasearch')
const ALGOLIA_APPID = process.env.ALGOLIA_APPID
const ALGOLIA_ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY

module.exports = algoliasearch(ALGOLIA_APPID, ALGOLIA_ADMIN_KEY);;
