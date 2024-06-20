const express = require('express');
const PostApi = require('../api/post');

const router = express.Router();

router.post('/', PostApi.createPost)
router.put('/:id', PostApi.updatePost)
router.get('/', PostApi.findPosts)
router.delete('/:id', PostApi.deletePost)

module.exports = router;