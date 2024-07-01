const express = require('express')

const TaskApi = require('../api/task')
const router = express.Router()

router.post('/', TaskApi.createTask)
router.put('/:id', TaskApi.updateTask)
router.delete('/:id', TaskApi.deleteTask)
router.get('/', TaskApi.listTasks)
router.get('/:id', TaskApi.searchByStatus)
router.get('/project/:idProject', TaskApi.searchByProject)

module.exports = router