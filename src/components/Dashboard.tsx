
import SignatureForm from "@/components/SignatureForm";
import SignatureDisplay from "@/components/SignatureDisplay";

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 lg:col-start-3">
          <SignatureForm />
        </div>
        <div className="lg:col-span-4">
          <SignatureDisplay />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
