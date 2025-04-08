
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  // Always show the dashboard, no authentication check needed
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Dashboard />
    </div>
  );
};

export default Index;
