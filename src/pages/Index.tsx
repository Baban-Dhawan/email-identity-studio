
import { useAuth } from "@/context/AuthContext";
import AuthForm from "@/components/AuthForm";
import Dashboard from "@/components/Dashboard";
import Header from "@/components/Header";
import { SignatureProvider } from "@/context/SignatureContext";
import { Mail, Code, Copy } from "lucide-react";

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading state while we check authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-navy"></div>
      </div>
    );
  }

  // If not authenticated, show auth form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100">
        <Header />
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-start space-y-8">
              <div className="space-y-4 max-w-md">
                <h1 className="text-4xl font-bold text-brand-navy">Email Signature Studio</h1>
                <p className="text-xl text-gray-600">Create professional email signatures in minutes</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-xl">
                <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md">
                  <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-light mb-2">
                    <Mail className="h-6 w-6 text-brand-teal" />
                  </div>
                  <h3 className="font-medium">Create & Customize</h3>
                  <p className="text-sm text-gray-500">Multiple templates</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md">
                  <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-light mb-2">
                    <Code className="h-6 w-6 text-brand-teal" />
                  </div>
                  <h3 className="font-medium">Export HTML</h3>
                  <p className="text-sm text-gray-500">Ready for all clients</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md">
                  <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-light mb-2">
                    <Copy className="h-6 w-6 text-brand-teal" />
                  </div>
                  <h3 className="font-medium">One-Click Copy</h3>
                  <p className="text-sm text-gray-500">Simple to implement</p>
                </div>
              </div>
            </div>
            
            <div>
              <AuthForm />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If authenticated, show dashboard wrapped in SignatureProvider
  return (
    <SignatureProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Dashboard />
      </div>
    </SignatureProvider>
  );
};

export default Index;
