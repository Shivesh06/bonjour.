import express from "express"
import { protectRoute } from "../middleware/authMiddleware.js"
import { getMyFriends, getRecommendedUsers, sendFriendRequest, acceptFriendRequest, getFriendRequests, getOutgoingFriendReqs, dismissNotification } from "../controllers/userController.js"

const router = express.Router()

router.use(protectRoute)

router.get("/friends", getMyFriends)
router.get("/", getRecommendedUsers)

router.post("/friend-request/:id", sendFriendRequest)
router.put("/friend-request/:id/accept", acceptFriendRequest)

router.get("/friend-requests", getFriendRequests )
router.get("/outgoing-friend-requests", getOutgoingFriendReqs)

router.delete("/notification/:notificationId", dismissNotification)

export default router