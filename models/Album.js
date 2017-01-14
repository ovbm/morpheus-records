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
		type: Types.LocalFile,
		dest: 'public/audio',
		filename: function(item, file){
			return item.id + '.' + file.extension;
		},
	},
	audioOneOgg: {
		type: Types.LocalFile,
		dest: 'public/audio',
		filename: function(item, file){
			return item.id + '.' + file.extension;
		},
	},
	audioTwoName: {
		type: Types.Text,
	},
	audioTwoMp3: {
		type: Types.LocalFile,
		dest: 'public/audio',
		filename: function(item, file){
			return item.id + '.' + file.extension;
		},
	},
	audioTwoOgg: {
		type: Types.LocalFile,
		dest: 'public/audio',
		filename: function(item, file){
			return item.id + '.' + file.extension;
		},
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
