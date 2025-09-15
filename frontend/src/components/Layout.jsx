import { useState } from "react"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import { MenuIcon } from "lucide-react"

const SidebarToggle = ({ toggleSidebar }) => {
  return (
    <button
      onClick={toggleSidebar}
      className="btn btn-ghost btn-circle lg:hidden"
    >
      <MenuIcon className="size-5" />
    </button>
  )
}

const Layout = ({ children, showSidebar = false }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="flex min-h-screen">
      {showSidebar && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
      <div className="flex-1 flex flex-col">
        <Navbar>
          {showSidebar && <SidebarToggle toggleSidebar={toggleSidebar} />}
        </Navbar>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
export default Layout