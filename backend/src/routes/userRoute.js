import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import { getMyFriends, getRecommendedUsers, sendFriendRequest, acceptFriendRequest } from "../controllers/userController.js"

const router = express.Router()

router.use(protectRoute)

router.get("/friends", getMyFriends)
router.get("/", getRecommendedUsers)

router.post("/friend-request/:id", sendFriendRequest)
router.put("/friend-request/:id/accept", acceptFriendRequest)

export default router