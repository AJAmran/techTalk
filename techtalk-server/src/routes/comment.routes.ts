// src/routes/commentRoutes.ts
import { Router } from 'express';
import { approvedComment, createComment, getCommentsByPostId } from '../controller/comment.controller';


const router = Router();

router.post('/', createComment);
router.get('/:postId', getCommentsByPostId);
router.put('/:id/approve', approvedComment);

export default router;
