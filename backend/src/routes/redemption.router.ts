import { Router } from 'express';
import { getStaffTeamById, getRedemptionAvailability, createRedemption } from '../controllers/redemption.controller';

const redemptionRouter = Router();

redemptionRouter.get('/staff/:id', getStaffTeamById);
redemptionRouter.get('/check/:team_name', getRedemptionAvailability);
redemptionRouter.post('/create/:team_name', createRedemption);

export default redemptionRouter;
