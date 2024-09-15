import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar className="fixed top-0 left-0 h-full" />
        <main className="flex-1 p-8 bg-gray-100 rounded-[50px]  w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;