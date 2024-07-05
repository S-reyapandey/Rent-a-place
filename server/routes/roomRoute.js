import {Router} from 'express'

import { createRoom } from '../controller/room.js'
import auth from '../middleware/auth.js';

const roomRouter = Router();
roomRouter.post('/', auth, createRoom);
export default roomRouter;