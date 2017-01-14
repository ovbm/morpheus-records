var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Band = new keystone.List('Band', {
	autokey: { path: 'slug', from: 'title', unique: true },
	map: { name: 'title' },
	defaultSort: '-title',
});

Band.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft' },
	author: { type: Types.Relationship, ref: 'User' },
	createdAt: { type: Date, default: Date.now },
	publishedAt: Date,
	image: {
		type: Types.LocalFile,
		dest: 'public/images',
		filename: function (item, file) { return item.id + '.' + file.extension; },
	},
	content: {
		description: { type: Types.Html, wysiwyg: true, height: 150 },
		lineup: { type: Types.Text },
		linktext: { type: Types.Text },
		link: { type: Types.Url },
		facebooklink: { type: Types.Url },
	},
});

/**
 * Registration
 */
Band.defaultColumns = 'title, createdAt, publishedAt';
Band.register();
