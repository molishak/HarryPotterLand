app({
	appId: 'CC3ECNJNA3',
	apiKey: 'bd4b136c9b29949f8815a0cf1033d4ab',
	indexName: 'cheese',
});

function app(opts) {
	const search = instantsearch({
		searchClient: algoliasearch(opts.appId, opts.apiKey),
		indexName: opts.indexName,
		searchFunction: opts.searchFunction,
	});

	search.addWidget(
		instantsearch.widgets.configure({
			hitsPerPage: 8,
			clickAnalytics: true
		})
	)

	search.addWidget(
		instantsearch.widgets.poweredBy({
			container: '#powered-by',
		})
	);

	search.addWidget(
		instantsearch.widgets.searchBox({
			container: '#search-query',
			cssClasses: {
				input: 'input is-large'
			},
			placeholder: 'Search for Harry Potter info...'
		})
	);

	search.addWidget(
		instantsearch.widgets.hits({
			container: '#hits',
			templates: {
				item: `
					<div class="columns" style="padding-top: 20px; padding-bottom: 20px; border-bottom: 1px solid #DFDFDF;">

							<div class="is-one-fifth">

								<figure class="image is-96x96" style="padding: 5px; border:1px solid #DFDFDF; float: left; margin-right: 10px;">
									<img src="{{ photoUrl}}">
								</figure>

							</div>

							<div class="is-four-fifth">

								<h3 class="is-size-3">
									{{{ _highlightResult.name.value }}}

									<p class="is-size-7 clearfix">
										{{ characteristics.flavors }}
									</p>

								</h3>

								<span class="clearfix">
									<b>Aged</b>: {{ characteristics.aged }},
									<b>Milks</b>: {{ characteristics.milk }},
									<b>Texture</b>: {{ characteristics.texture }}
								</span>

							</div>

					</div>
				`,
				empty: `
					<div id="no-results-message">
						<p>
							We didn't find any results for the search <em>"{{query}}"</em>.
						</p>
						<a href="." class='clear-all'>Clear search</a>
					</div>
				`
			},
			transformData: {
				item(item) {
					return item;
				},
			},
		})
	);

	search.addWidget(
		instantsearch.widgets.stats({
			container: '#stats'
		})
	);

	// Use this widget to set the input query box.
	search.addWidget(
		instantsearch.widgets.pagination({
			container: '#pagination',
			scrollTo: '#search-query',
			templates: {
				last: '',
				previous: 'Previous',
				next: 'Next'
			},
			cssClasses: {
				list: 'pagination-list',
				selectedItem: 'is-current',
				link: 'pagination-link'
			}
		})
	);

	// Use this widget to add the list of Coverings.
	search.addWidget(
		instantsearch.widgets.refinementList({
			container: '#wands',
			attribute: 'wands',
			showMore: false,
			showMoreLimit: 10,
			searchable: false,
			templates: {
				item: `
					<a href="{{url}}" style="{{#isRefined}}font-weight: bold{{/isRefined}}">
						<span>{{label}} ({{count}})</span>
					</a>
				`,
				noResults: '<div class="sffv_no-results">No matching brands.</div>',
				noRefinementRoot: '<div class="sffv_no-results">No matching brands.</div>'
			}
		})
	);

	// Use this widget to add the list of Coverings.
	search.addWidget(
		instantsearch.widgets.refinementList({
			container: '#magical',
			attribute: 'magical',
			showMore: false,
			showMoreLimit: 10,
			searchable: false,
			templates: {
				item: `
					<a href="{{url}}" style="{{#isRefined}}font-weight: bold{{/isRefined}}">
						<span>{{label}} ({{count}})</span>
					</a>
				`,
				noResults: '<div class="sffv_no-results">No matching brands.</div>',
				noRefinementRoot: '<div class="sffv_no-results">No matching brands.</div>'
			}
		})
	);

	search.addWidget(
		instantsearch.widgets.clearRefinements({
			container: "#clearAll",
			templates: {
				resetLabel: 'Reset',
			},
			cssClasses: {
				button: 'button is-small'
			}
		})
	);

	search.addWidget(
		instantsearch.widgets.refinementList({
			container: '#spells',
			attribute: 'spells',
			showMore: false,
			showMoreLimit: 10,
			searchable: false,
			cssClasses: {
				searchableInput: "input is-large",
			},
			templates: {
				item: `
					<a href="{{url}}" style="{{#isRefined}}font-weight: bold{{/isRefined}}">
						<span>
							{{label}} ({{count}})
						</span>
					</a>
				`,
				noResults: '<div class="sffv_no-results">No matching brands.</div>',
				noRefinementRoot: '<div class="sffv_no-results">No matching brands.</div>'
			}
		})
	);

	search.addWidget(
		instantsearch.widgets.refinementList({
			container: '#plants',
			attribute: 'plants',
			showMore: false,
			showMoreLimit: 10,
			searchable: false,
			templates: {
				item: `
					<a href="{{url}}" style="{{#isRefined}}font-weight: bold{{/isRefined}}">
						<span>{{label}} ({{count}})</span>
					</a>
				`,
				noResults: '<div class="sffv_no-results">No matching brands.</div>',
				noRefinementRoot: '<div class="sffv_no-results">No matching brands.</div>'
			},
		})
	);

	search.start();
}