var keystone = require('keystone');
var Album = keystone.list('Album');
var fs = require('fs');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'music';
	locals.album = [];

	// Load all albums
	view.on('init', function (next) {
		Album.model.find()
			.where('state', 'published')
			.sort('-publishedAt')
			.exec(function(err, albums) {
				if (err) res.err(err);
				locals.albums = albums;
				next();
			});
	});
	
	// Render the view
	view.render('index');
};
