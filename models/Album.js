var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Album = new keystone.List('Album', {
	autokey: { path: 'slug', from: 'title', unique: true },
	map: { name: 'title' },
	defaultSort: '-createdAt',
});

var myStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
		path: keystone.expandPath('./public/audio'),
		publicPath: '/audio',
  },
});


Album.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft' },
	author: { type: Types.Relationship, ref: 'User' },
	createdAt: { type: Date, default: Date.now },
	publishedAt: Date,
	image: {
		type: Types.CloudinaryImage,
		publicID: 'slug',
		autoCleanup : true,
	},
	audioOneName: {
		type: Types.Text,
	},
	audioOneMp3: {
		type: Types.File,
		storage: myStorage,
	},
	audioOneOgg: {
		type: Types.File,
		storage: myStorage,
	},
	audioTwoName: {
		type: Types.Text,
	},
	audioTwoMp3: {
		type: Types.File,
		storage: myStorage,
	},
	audioTwoOgg: {
		type: Types.File,
		storage: myStorage,
	},
	content: {
		band: { type: Types.Text },
		description: { type: Types.Html, wysiwyg: true, height: 150 },
		link: { type: Types.Url },
		labelcode: { type: Types.Text },
	},
});

/**
 * Registration
 */
Album.defaultColumns = 'title, createdAt, publishedAt';
Album.register();
