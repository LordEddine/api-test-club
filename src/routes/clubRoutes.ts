import { Router } from "express";
import { createClub, getAllclubs, joinClub, leaveClub } from "../controllers/clubController.js";

const router = Router();

router.post('/', createClub);
router.get('/', getAllclubs);
router.post('/:clubId/join/:etudiantId',joinClub); //localhost:3000/clubs/1/join/4
router.post('/:clubId/leave/:etudiantId',leaveClub); //localhost:3000/clubs/1/leave/4
/* 
- TODO :
router.patch('/:id', updateClub);
router.delete('/:id', deleteClub);
router.get('/:id', getClubById);
*/

export default router;