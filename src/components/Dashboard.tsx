
import SignatureForm from "@/components/SignatureForm";
import SignatureList from "@/components/SignatureList";

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SignatureList />
        </div>
        <div className="lg:col-span-8">
          <SignatureForm />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
