const Note = require('../models/noteModel')

class NoteController {
	async fetchAllNotes(req, res) {
		try {
			const notes = await Note.find()
			return res.json(notes)
		} catch (error) {
			res.status(500).json({ message: 'Ошибка при получении заметок' })
		}
	}
	async fetchOneNote(req, res) {
		try {
			const { id } = req.params
			if (!id) {
				res.status(400).json({
					message: `Заметка с такой ${id} не найдено`,
				})
			}
			const oneNote = await Note.findById(id)
			return res.json(oneNote)
		} catch (error) {
			res.status(500).json(error.message)
		}
	}
	async addNote(req, res) {
		try {
			const { title } = req.body
			const newNote = await Note.create({ title })
			res.json(newNote)
		} catch (error) {
			res.status(500).json({ message: 'Ошибка при добавлении заметки' })
		}
	}
	async removeOneNote(req, res) {
		try {
			const { id } = req.params
			if (!id) {
				res.status(400).json({ message: 'ID не указан' })
			}
			const removedNote = await Note.findByIdAndDelete(id)
			return res.json(removedNote)
		} catch (error) {
			res.status(500).json(error.message)
		}
	}
	async removeAllNotes(req, res) {
		try {
			await Note.deleteMany({})
			res.status(200).json({ message: 'Заметки успешно удалены' })
		} catch (error) {
			res.status(500).json({ error: 'Внутренняя ошибка сервера' })
		}
	}
	async updateNoteThroughPutReq(req, res) {
		try {
			const note = req.body
			if (!note._id) {
				res.status(400).json({ message: 'Заметка не найдена!' })
			}
			const updatedNote = await Note.findByIdAndUpdate(note._id, note, {
				new: true,
			})
			return res.json(updatedNote)
		} catch (error) {
			res.status(500).json({ message: 'Ошибка при обновлении заметки' })
		}
	}
	async updateNoteThroughPtchReq(req, res) {
		try {
			const { id } = req.params
			const updatedNoteData = req.body
			const updatedNote = await Note.findByIdAndUpdate(
				id,
				updatedNoteData,
				{ new: true }
			)
			res.json(updatedNote)
		} catch (error) {
			res.status(500).json({ message: 'Ошибка при обновлении заметки' })
		}
	}
}

module.exports = new NoteController()
