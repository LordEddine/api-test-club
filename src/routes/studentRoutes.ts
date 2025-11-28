import { Router } from "express";
import { createStudent, getAllStudents, modifierStudent} from '../controllers/studentController'

const router = Router();

router.get('/', getAllStudents);
router.post('/',createStudent);
router.patch('/:id',modifierStudent)

export default router;