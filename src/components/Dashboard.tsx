
import SignatureForm from "@/components/SignatureForm";
import SignatureList from "@/components/SignatureList";
import SignatureDisplay from "@/components/SignatureDisplay";

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3">
          <SignatureList />
        </div>
        <div className="lg:col-span-5">
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
