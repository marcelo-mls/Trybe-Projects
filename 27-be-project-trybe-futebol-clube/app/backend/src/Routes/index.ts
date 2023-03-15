import { Router } from 'express';
import UserController from '../controllers/UserControllers';
import TeamController from '../controllers/TeamControllers';
import MatchController from '../controllers/MatchControllers';
import LeaderBoardController from '../controllers/LeaderBoardControllers';
import TokenJWT from '../Utils/JWT';

const router = Router();

const userController = new UserController();
const teamController = new TeamController();
const matchController = new MatchController();
const leaderBoardController = new LeaderBoardController();
const JWT = new TokenJWT();

router.get('/login/validate', userController.getRole);
router.post('/login', userController.postLogin);

router.get('/teams', teamController.getTeams);
router.get('/teams/:id', teamController.getTeamById);

router.get('/matches', matchController.getMatches);
router.post('/matches', JWT.authenticationMiddleware, matchController.postMatch);
router.patch('/matches/:id', matchController.patchMatchWithBody);
router.patch('/matches/:id/finish', matchController.patchMatch);

router.get('/leaderboard/home', leaderBoardController.getHome);

export default router;
