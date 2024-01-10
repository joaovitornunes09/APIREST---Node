import { Router } from 'express';
import alunoController from '../controllers/AlunoController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', alunoController.index);

router.get('/:id', alunoController.show);

router.post('/create', loginRequired, alunoController.store);
router.put('/update/:id', loginRequired, alunoController.update);
router.delete('/delete/:id', loginRequired, alunoController.delete);

export default router;
