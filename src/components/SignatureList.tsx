
import { useSignature } from "@/context/SignatureContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, FileSignature } from "lucide-react";

const SignatureList = () => {
  const { signatures, currentSignature, setCurrentSignature, createNewSignature } = useSignature();

  if (!signatures.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Signatures</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <FileSignature className="h-12 w-12 text-gray-400 mb-3" />
          <p className="text-sm text-gray-500 text-center mb-4">No signatures yet</p>
          <Button onClick={createNewSignature} className="bg-brand-teal hover:bg-brand-navy">
            <Plus className="h-4 w-4 mr-2" />
            Create New
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>My Signatures</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={createNewSignature}
            className="flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            New
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-2">
            {signatures.map((signature) => (
              <Button
                key={signature.id}
                variant="ghost"
                className={`w-full justify-start h-auto p-3 ${
                  signature.id === currentSignature.id
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-muted"
                }`}
                onClick={() => setCurrentSignature(signature)}
              >
                <div className="flex flex-col items-start text-left">
                  <div className="font-medium">{signature.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {signature.title}{signature.title && signature.company ? " at " : ""}{signature.company}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SignatureList;
