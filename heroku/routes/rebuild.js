const fetch = require('node-fetch').default;
const _ = require('underscore')
const titleCase = require('title-case')

// Services
const algolia = require('../services/algolia');
const takeshape = require('../services/takeshape')

module.exports = (req, res) => {

	if (!req.query.contentType) {
		res.status(200).send('Sorry you need to the the content type. ?contentType=cheese')
		return
	}

	// Setup the index.
	const index = algolia.initIndex(req.query.contentType);

	// Set the query name.
	var queryName = 'get' + titleCase(req.query.contentType) + 'List'

	// Set the Query for the content type.
	var query = `{
		${queryName} {
			items {
				_id
		    about
		    addPictures {
		      picturesOfFarm {
		        path
		        sourceUrl
		      }
		    } 
		    address {
		      street
		      town
		      zipCode
		    }
		    farmName
		    hours
		    phoneNumber
		    preferences {
		      acceptedPayment
		      farmType
		      products
		    }
		    website
			}
		}
	}
	`

	takeshape(query).then(result => {

		// Check if we have the content type in the results.
		if (!_.has(result.data, queryName)) {
			console.log('Dump the query result', result);
			return res.status(200).send(`Sorry, could not find the content type "${req.query.contentType}". (${queryName}) Check your content type again.`)
		}

		var items = result.data[queryName].items
		var list = [];

		// Loop the fields and set the data as needed.
		_.each(items, item => {
			var object = item
			item.objectID = item._id;
			if (item.photo) item.photoUrl = 'https://images.takeshape.io/' + item.photo.path;
			list.push(item)
		})

		index
			.addObjects(list)
			.then((data) => {
				res.status(200).send(`Rebuild all takeshape data to the index "${req.query.contentType}", having ${data.objectIDs.length} records.`)
			})
			.catch(err => {
				console.log('Got an Eror', err);
				res.status(500).send(err.message)
			});

	}).catch(err => {
		res.status(500).send(err.message)
	})

}
