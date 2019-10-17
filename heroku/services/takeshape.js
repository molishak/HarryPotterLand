const fetch = require('node-fetch').default;
const TAKESHAPE_PROJECTID = process.env.TAKESHAPE_PROJECTID
const TAKESHAPE_KEY = process.env.TAKESHAPE_KEY

module.exports = (query) => {

	return new Promise((resolve, reject) => {

		fetch(`https://api.takeshape.io/project/${TAKESHAPE_PROJECTID}/graphql`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${TAKESHAPE_KEY}`
			},
			body: JSON.stringify({ query })
		}).then(res => {

			return res.json()

		}).then(res => {

			// When we got data we come here.
			resolve(res)

		}).catch(reject)

	})

}
