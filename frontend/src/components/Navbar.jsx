import { Link, useLocation } from "react-router" 
import useAuthUser from "../hooks/useAuthUser" 
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react" 
import ThemeSelector from "./ThemeSelector" 
import useLogout from "../hooks/useLogout" 
import { getFriendRequests } from "../lib/api" 
import { useQuery, useQueryClient } from "@tanstack/react-query" 

const Navbar = () => {
  const { authUser } = useAuthUser() 
  const location = useLocation() 
  const isChatPage = location.pathname?.startsWith("/chat") 
  const queryClient = useQueryClient() 

  const { logoutMutation } = useLogout() 

  const { data } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
    refetchInterval: 5000,
  }) 

  const { incomingReqs = [], acceptedReqs = [] } = data || {} 
  const unreadCount = incomingReqs.length + acceptedReqs.length 

  const handleBellClick = () => {
    queryClient.setQueryData(["friendRequests"], (oldData) => {
      if (!oldData) return oldData 
      return {
        ...oldData,
        incomingReqs: [],
        acceptedReqs: [],
      } 
    }) 
  } 

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                <ShipWheelIcon className="size-9 text-primary" />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                  Bonjour
                </span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to={"/notifications"}>
              <button
                className="btn btn-ghost btn-circle relative"
                onClick={handleBellClick}
              >
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            </Link>
          </div>

          <ThemeSelector />

          <Link to={`/`}>
            <div className="avatar">
              <div className="w-9 rounded-full ">
                <img src={authUser?.profilePic} alt="User Avatar" rel="noreferrer"
                />
              </div>
            </div>
          </Link>

          <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  ) 
} 

export default Navbar 
