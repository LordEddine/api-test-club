import { Router } from "express";
import { createStudent,deleteStudent, getAllStudents, modifierStudent,getStudentById} from '../controllers/studentController'
import { validateId } from "../middleware/handleError";

const router = Router();

router.get('/', getAllStudents);
router.post('/',createStudent);
router.patch('/:id',validateId('id'),modifierStudent);
router.get('/:id', validateId('id'),getStudentById)
router.delete('/:id',validateId('id'),deleteStudent);

export default router;