import { Link } from "react-router-dom" 

const NoFriendsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <h2 className="text-2xl font-bold mb-4">You have no friends yet.</h2>
      <p className="text-lg text-muted-foreground mb-6">
        Time to find some! Head over to the home page to start connecting with other users.
      </p>
      <Link to="/" className="btn btn-primary">
        Find Friends
      </Link>
    </div>
  ) 
} 

export default NoFriendsPage 