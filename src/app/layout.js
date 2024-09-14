import { Toaster } from "sonner";
import "./globals.css";

export const metadata = {
  title: "MyToDo",
  description: "Manage Your app in one app!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        
      >
        {children}
      </body>
      <Toaster richColors/>
    </html>
  );
}
