"use client"
import { MoreVertical, ChevronLast, ChevronFirst, Plus, Calendar, CheckCircle, List } from "lucide-react"
import { useState, useContext, createContext, useEffect } from "react"
import AddTaskForm from "./forms/task.form"
const SidebarContext = createContext()

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true)
  const [user, setUser] = useState(null)
  const [showAddTaskForm, setShowAddTaskForm] = useState(false) // New state for form visibility

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/user');
        if(!response.ok){
          throw new Error('Server busy')
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);
  
  return (
    <>
      <aside className="h-screen">
        <nav className="h-full flex flex-col bg-white text-black border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <h1 className={`font-bold text-3xl transition-all ${expanded ? "w-auto" : "w-0 overflow-hidden"}`}>
              MyToDo
            </h1>
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-white hover:bg-gray-100"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded, setShowAddTaskForm }}>
            <div className="flex-1 px-3">
              <SidebarItem icon={<Plus />} text="Add Task" action="addTask" />
              <SidebarItem icon={<Calendar />} text="Today Tasks" />
              <SidebarItem icon={<List />} text="Upcoming Tasks" />
              <SidebarItem icon={<CheckCircle />} text="Completed Tasks" />
              {children}
            </div>
          </SidebarContext.Provider>

          <div className="border-t flex p-3">
            {user ? (
              <div
                className={`
                  flex justify-between items-center
                  overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
              `}
              >
                <div className="leading-4">
                  <h4 className="font-semibold">{user.name}</h4>
                  <span className="text-xs text-gray-600">{user.email}</span>
                </div>
                <MoreVertical size={20} />
              </div>
            ) : (
              <div className="leading-4">
                <h4 className="font-semibold">Loading...</h4>
              </div>
            )}
          </div>
        </nav>
      </aside>
      
      {showAddTaskForm && (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <AddTaskForm onClose={() => setShowAddTaskForm(false)} />
      </div>
      )}
    </>
  )
}

export function SidebarItem({ icon, text, active, alert, action }) {
  const { expanded, setShowAddTaskForm } = useContext(SidebarContext)
  
  const handleClick = () => {
    if (action === 'addTask') {
      setShowAddTaskForm(true)
    }
    // Add other actions here if needed
  }

  return (
    <button
      onClick={handleClick}
      className={`
        relative flex items-center py-2 px-3 my-1 w-full
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        } group-hover:-translate-y-1 group-hover:text-black text-left`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </button>
  )
}