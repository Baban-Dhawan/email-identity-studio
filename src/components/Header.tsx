
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Mail } from "lucide-react";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-brand-navy text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Mail className="h-6 w-6" />
          <h1 className="text-xl font-bold">Email Identity Studio</h1>
        </div>
        
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <span className="hidden md:inline-block">Welcome, {user?.name}!</span>
            <Button variant="outline" onClick={logout} className="text-white border-white hover:bg-white hover:text-brand-navy">
              Sign Out
            </Button>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
