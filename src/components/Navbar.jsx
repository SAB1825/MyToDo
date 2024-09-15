import { getUser } from "@/app/dashboard/actions"
import LogOutButton from "./LogOutButton";

const Navbar = async () => {
    const user = await getUser();
    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-white">
            
            <h1 className="text-lg font-semibold">
                Welcome, <span className="text-blue-600">{user.name}</span>
            </h1>
            <LogOutButton>Log Out</LogOutButton>
        </nav>
    )
}

export default Navbar