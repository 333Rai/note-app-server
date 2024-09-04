const { Schema, model } = require('mongoose')

const Note = new Schema(
	{
		title: {
			type: String,
			unigue: true,
			required: true,
		},
		completed: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
)

module.exports = model('Note', Note, 'notes')
