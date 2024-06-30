const express = require('express')

const ProjectApi = require('../api/project')
const router = express.Router()

router.post('/', ProjectApi.createProject)
router.put('/:id', ProjectApi.updateProject)
router.delete('/:id', ProjectApi.deleteProject)
router.get('/', ProjectApi.listProjects)
router.get('/:id', ProjectApi.searchById)
router.get('/:id/tasks', ProjectApi.listTasks)

module.exports = router