import express from 'express';
import { getUserDetails, updateUserDetails } from '../controllers/user.controllers';
import { authenticate } from '../middleware/authenticate';
const router = express.Router();

router.get('/', authenticate, getUserDetails);
router.post('/update', authenticate, updateUserDetails);

export default router;