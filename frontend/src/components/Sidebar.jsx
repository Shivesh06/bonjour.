import { Link, useLocation } from "react-router" 
import useAuthUser from "../hooks/useAuthUser" 
import { BellIcon, HomeIcon, GlobeIcon, UsersIcon } from "lucide-react" 
import { useQuery } from "@tanstack/react-query" 
import { getUserFriends } from "../lib/api" 

const Sidebar = () => {
  const { authUser } = useAuthUser() 
  const location = useLocation() 
  const currentPath = location.pathname 

  const { data: friends = [] } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
    enabled: !!authUser,
  }) 

  const firstFriendId = friends.length > 0 ? friends[0]._id : null 
  const friendsChatLink = firstFriendId ? `/chat/${firstFriendId}` : "/chat/no-friends" 

  const isChatPage = currentPath.startsWith("/chat/") 

  return (
    <aside
      className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0"
    >
      <div className="p-5 border-b border-base-300">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 mb-3">
          <GlobeIcon className="h-8 w-8 sm:h-9 sm:w-9 text-primary" />
          <div>
            <span className="text-2xl sm:text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Bonjour
            </span>
            <p className="text-xs sm:text-sm text-muted-foreground -mt-1 font-semibold">
              Learn. Teach. Connect.
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/" ? "btn-active" : ""
          }`}
        >
          <HomeIcon className="size-5 text-base-content opacity-70" />
          <span>Home</span>
        </Link>
        <Link
          to={friendsChatLink}
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            isChatPage ? "btn-active" : ""
          }`}
        >
          <UsersIcon className="size-5 text-base-content opacity-70" />
          <span>Friends</span>
        </Link>
        <Link
          to="/notifications"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/notifications" ? "btn-active" : ""
          }`}
        >
          <BellIcon className="size-5 text-base-content opacity-70" />
          <span>Notifications</span>
        </Link>
      </nav>

      <div className="p-4 border-t border-base-300 mt-auto">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">{authUser?.fullName}</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block" />
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  ) 
} 

export default Sidebar 
