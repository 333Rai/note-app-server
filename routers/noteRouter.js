const Router = require('express')
const controller = require('../controllers/noteController')

const router = new Router()

router.post('/notes', controller.addNote)
router.get('/notes', controller.fetchAllNotes)
router.get('/notes/:id', controller.fetchOneNote)
router.delete('/notes/:id', controller.removeOneNote)
router.delete('/notes', controller.removeAllNotes)
router.put('/notes/:id', controller.updateNoteThroughPutReq)
router.patch('/notes/:id', controller.updateNoteThroughPtchReq)

module.exports = router
