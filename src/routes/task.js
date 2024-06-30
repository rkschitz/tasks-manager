const express = require('express')

const TaskApi = require('../api/task')
const router = express.Router()

router.put('/:id', TaskApi.updateTask)
router.get('/', TaskApi.listTasks)
router.delete('/:id', TaskApi.deleteTask)
router.post('/', TaskApi.createTask)

module.exports = router