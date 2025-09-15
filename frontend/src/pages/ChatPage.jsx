import { useEffect, useState } from "react" 
import { useParams, Link } from "react-router" 
import useAuthUser from "../hooks/useAuthUser" 
import { useQuery } from "@tanstack/react-query" 
import { getStreamToken, getUserFriends } from "../lib/api" 
import { Channel, ChannelHeader, Chat, MessageInput, MessageList, Thread, Window } from "stream-chat-react" 
import { StreamChat } from "stream-chat" 
import toast from "react-hot-toast" 
import ChatLoader from "../components/ChatLoader" 
import CallButton from "../components/CallButton" 
import { useThemeStore } from "../store/useThemeStore" 
import { capitalize } from "../lib/utils" 

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY 

const NoFriendsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4 bg-base-100">
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

const ChatPage = () => {
  const { id: targetUserId } = useParams() 
  const [chatClient, setChatClient] = useState(null) 
  const [channel, setChannel] = useState(null) 
  const [loading, setLoading] = useState(true) 
  const { authUser } = useAuthUser() 
  const { theme } = useThemeStore() 

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  }) 

  const { data: friends = [], isLoading: friendsLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
    enabled: !!authUser,
  }) 

  useEffect(() => {
    let client 
    if (authUser && tokenData?.token) {
      const initClient = async () => {
        try {
          client = new StreamChat(STREAM_API_KEY) 
          await client.connectUser(
            {
              id: authUser._id,
              name: authUser.fullName,
              image: authUser.profilePic,
            },
            tokenData.token
          ) 
          setChatClient(client) 
        } catch (error) {
          console.error("Error connecting user:", error) 
          toast.error("Could not connect to chat. Please try again.") 
        }
      } 
      initClient() 
    }
    return () => {
      if (client) {
        client.disconnectUser() 
      }
    } 
  }, [authUser, tokenData]) 

  useEffect(() => {
    if (chatClient && targetUserId) {
      setLoading(true) 
      const setupChannel = async () => {
        try {
          const channelId = [authUser._id, targetUserId].sort().join("-") 
          const currChannel = chatClient.channel("messaging", channelId, {
            members: [authUser._id, targetUserId],
          }) 
          await currChannel.watch() 
          setChannel(currChannel) 
        } catch (error) {
          console.error("Error setting up channel:", error) 
          toast.error("Could not set up channel. Please try again.") 
          setChannel(null) 
        } finally {
          setLoading(false) 
        }
      } 
      setupChannel() 
    }
    return () => {
      if (channel) {
        channel.stopWatching() 
      }
    } 
  }, [chatClient, targetUserId, authUser, channel]) 

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}` 
      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      }) 
      toast.success("Video call link sent successfully!") 
    }
  } 

  if (friendsLoading) return <ChatLoader /> 

  if (friends.length === 0) {
    return <NoFriendsPage /> 
  }

  if (loading || !chatClient || !channel) return <ChatLoader /> 

  return (
    <div className="flex w-full h-screen overflow-hidden" data-theme={theme}>
      <Chat client={chatClient} theme={theme}>
        <div className="flex w-full h-full">
          <div className="w-64 border-r border-base-300 flex flex-col p-4 bg-base-200">
            <h2 className="text-xl font-bold mb-4">Friends</h2>
            <div className="flex flex-col space-y-2 overflow-y-auto">
              {friends.map((friend) => (
                <Link key={friend._id} to={`/chat/${friend._id}`}>
                  <div
                    className={`p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                      targetUserId === friend._id
                        ? "bg-base-300"
                        : "hover:bg-base-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-10 rounded-full">
                          <img src={friend.profilePic} alt={friend.fullName} />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <p className="font-semibold">{friend.fullName}</p>
                        <p className="text-xs opacity-70">
                          {capitalize(friend.nativeLanguage)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <Channel channel={channel}>
              <div className="relative w-full h-full bg-base-100">
                <CallButton handleVideoCall={handleVideoCall} />
                <Window>
                  <ChannelHeader />
                  <MessageList />
                  <MessageInput focus />
                </Window>
              </div>
              <Thread />
            </Channel>
          </div>
        </div>
      </Chat>
    </div>
  ) 
} 
export default ChatPage 