import { Router } from "express";
import { createActivity } from "../controllers/activityController";

const router = Router();
// localhost:3000/activities/clubs/1/activities
// localhost:3000/activities/:id


//router.get('/clubs/:clubId/activities', getActivitiesByClubId);
router.post('/clubs/:clubId/activities', createActivity);

export default router;
