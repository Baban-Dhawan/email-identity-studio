
import { Mail } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-brand-navy text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Mail className="h-6 w-6" />
          <h1 className="text-xl font-bold">Email Identity Studio</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
