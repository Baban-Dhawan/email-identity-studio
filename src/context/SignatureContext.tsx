
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { SignatureData, defaultSignatureData } from '@/types';
import { useAuth } from './AuthContext';

type SignatureContextType = {
  signatures: SignatureData[];
  currentSignature: SignatureData;
  setCurrentSignature: (signature: SignatureData) => void;
  saveSignature: (signature: SignatureData) => void;
  deleteSignature: (id: string) => void;
  createNewSignature: () => void;
  isLoading: boolean;
};

const SignatureContext = createContext<SignatureContextType | undefined>(undefined);

export const SignatureProvider = ({ children }: { children: ReactNode }) => {
  const [signatures, setSignatures] = useState<SignatureData[]>([]);
  const [currentSignature, setCurrentSignature] = useState<SignatureData>({...defaultSignatureData});
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load signatures from localStorage when user changes
  useEffect(() => {
    if (user) {
      const storedSignatures = localStorage.getItem(`signatures_${user.id}`);
      if (storedSignatures) {
        const parsedSignatures = JSON.parse(storedSignatures) as SignatureData[];
        setSignatures(parsedSignatures);
        
        // Set the first signature as current if available
        if (parsedSignatures.length > 0) {
          setCurrentSignature(parsedSignatures[0]);
        } else {
          // Create a default signature with user data
          const newSignature = {
            ...defaultSignatureData,
            id: Math.random().toString(36).substring(2, 9),
            name: user.name,
            email: user.email
          };
          setCurrentSignature(newSignature);
          setSignatures([newSignature]);
          localStorage.setItem(`signatures_${user.id}`, JSON.stringify([newSignature]));
        }
      } else {
        // Create a default signature with user data
        const newSignature = {
          ...defaultSignatureData,
          id: Math.random().toString(36).substring(2, 9),
          name: user.name,
          email: user.email
        };
        setCurrentSignature(newSignature);
        setSignatures([newSignature]);
        localStorage.setItem(`signatures_${user.id}`, JSON.stringify([newSignature]));
      }
    } else {
      // Reset when user logs out
      setSignatures([]);
      setCurrentSignature({...defaultSignatureData});
    }
    setIsLoading(false);
  }, [user]);

  const saveSignature = (signature: SignatureData) => {
    if (!user) return;

    try {
      setIsLoading(true);
      let updatedSignatures: SignatureData[];
      
      // Check if signature already exists
      const existingIndex = signatures.findIndex(s => s.id === signature.id);
      
      if (existingIndex >= 0) {
        // Update existing signature
        updatedSignatures = [...signatures];
        updatedSignatures[existingIndex] = signature;
      } else {
        // Add new signature
        updatedSignatures = [...signatures, signature];
      }
      
      setSignatures(updatedSignatures);
      setCurrentSignature(signature);
      localStorage.setItem(`signatures_${user.id}`, JSON.stringify(updatedSignatures));
      
      toast({
        title: "Signature saved",
        description: "Your signature has been saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error saving signature",
        description: "An error occurred while saving your signature",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSignature = (id: string) => {
    if (!user) return;

    try {
      setIsLoading(true);
      const updatedSignatures = signatures.filter(s => s.id !== id);
      setSignatures(updatedSignatures);
      
      // If we deleted the current signature, set a new one as active
      if (currentSignature.id === id) {
        if (updatedSignatures.length > 0) {
          setCurrentSignature(updatedSignatures[0]);
        } else {
          createNewSignature();
        }
      }
      
      localStorage.setItem(`signatures_${user.id}`, JSON.stringify(updatedSignatures));
      
      toast({
        title: "Signature deleted",
        description: "Your signature has been deleted",
      });
    } catch (error) {
      toast({
        title: "Error deleting signature",
        description: "An error occurred while deleting your signature",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createNewSignature = () => {
    if (!user) return;

    const newSignature = {
      ...defaultSignatureData,
      id: Math.random().toString(36).substring(2, 9),
      name: user.name,
      email: user.email
    };
    
    setCurrentSignature(newSignature);
    
    toast({
      title: "New signature created",
      description: "Start customizing your new email signature",
    });
  };

  const value: SignatureContextType = {
    signatures,
    currentSignature,
    setCurrentSignature,
    saveSignature,
    deleteSignature,
    createNewSignature,
    isLoading,
  };

  return <SignatureContext.Provider value={value}>{children}</SignatureContext.Provider>;
};

export const useSignature = () => {
  const context = useContext(SignatureContext);
  if (context === undefined) {
    throw new Error('useSignature must be used within a SignatureProvider');
  }
  return context;
};
