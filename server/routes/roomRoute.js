import {Router} from 'express'

import { createRoom } from '../controller/room.js'

const roomRouter = Router();
roomRouter.post('/', createRoom);
export default roomRouter;