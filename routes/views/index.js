var keystone = require('keystone');
var Album = keystone.list('Album');

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
				var albumsColOne = [];
				var albumsColTwo = [];
				var albumsColThree = [];
				var i = 0;
				var j = 0;
				var k = 0;
				for (i = 0; i < albums.length; i = i+3) {
					albumsColOne.push(albums[i]);
				}
				for (j = 1; j < albums.length; j = j+3) {
					albumsColTwo.push(albums[j]);
				}
				for (k = 2; k < albums.length; k = k+3) {
					albumsColThree.push(albums[k]);
				}
				locals.albumColOne = albumsColOne;
				locals.albumColTwo = albumsColTwo;
				locals.albumColThree = albumsColThree;
				locals.albums = albums;
				next();
			});
	});
	// Render the view
	view.render('index');
};
