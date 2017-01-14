var keystone = require('keystone');
var Band = keystone.list('Band');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'bands';
	locals.bands = [];

	// Load all bands
	view.on('init', function (next) {
		Band.model.find()
			.where('state', 'published')
			.sort('title')
			.exec(function(err, bands) {
				if (err) res.err(err);
				locals.bands = bands;
				next();
			});
	});

	// Render the view
	view.render('bands');
};
