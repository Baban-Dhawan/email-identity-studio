
import { useState } from "react";
import { useSignature } from "@/context/SignatureContext";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { renderSignatureHtml, copyToClipboard } from "@/utils/signatureUtils";

const SignatureDisplay = () => {
  const { currentSignature } = useSignature();
  const { toast } = useToast();
  const [copying, setCopying] = useState<string | null>(null);

  const signatureHtml = renderSignatureHtml(currentSignature);

  const handleCopySignature = async (type: 'visual' | 'html') => {
    try {
      setCopying(type);
      
      // Always copy the rendered HTML signature for both options
      // This ensures users can paste directly into Gmail signature editor
      await copyToClipboard(signatureHtml);
      
      toast({
        title: "Copied to clipboard",
        description: type === 'html' 
          ? "HTML code copied! You can now paste it in your email client's signature settings"
          : "Signature copied! You can now paste it directly in Gmail signature settings"
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard. Please try again.",
        variant: "destructive",
      });
      console.error("Copy error:", error);
    } finally {
      // Reset the copying state after a delay
      setTimeout(() => setCopying(null), 1000);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-brand-navy">Preview</h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleCopySignature('visual')}
            disabled={!!copying}
            className="flex items-center gap-1"
          >
            {copying === 'visual' ? (
              <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 mr-1" />
            )}
            {copying === 'visual' ? 'Copied!' : 'Copy Signature'}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleCopySignature('html')}
            disabled={!!copying}
            className="flex items-center gap-1"
          >
            {copying === 'html' ? (
              <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 mr-1" />
            )}
            {copying === 'html' ? 'Copied!' : 'Copy HTML'}
          </Button>
        </div>
      </div>
      
      <div className="border rounded-md p-4 mb-4 bg-gray-50">
        <div 
          className={`signature-container signature-${currentSignature.template}`}
          dangerouslySetInnerHTML={{ __html: signatureHtml }}
        />
      </div>

      <div className="mt-4 pt-4 border-t">
        <h3 className="text-sm font-medium mb-2">HTML Code</h3>
        <div className="bg-gray-100 p-3 rounded-md max-h-40 overflow-y-auto">
          <code className="text-xs whitespace-pre-wrap break-all">
            {signatureHtml}
          </code>
        </div>
      </div>
    </div>
  );
};

export default SignatureDisplay;
