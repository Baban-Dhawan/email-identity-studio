
import { useState, useEffect } from "react";
import { useSignature } from "@/context/SignatureContext";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building, 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  User, 
  Briefcase,
  Palette,
  Save,
  Trash2,
  Plus,
  Linkedin,
  Twitter,
  Instagram,
  Facebook
} from "lucide-react";
import { SignatureData } from "@/types";

const SignatureForm = () => {
  const { 
    currentSignature, 
    saveSignature, 
    createNewSignature, 
    deleteSignature 
  } = useSignature();
  
  const [formData, setFormData] = useState<SignatureData>(currentSignature);
  const [activeTab, setActiveTab] = useState("basic");

  // Update form when current signature changes
  useEffect(() => {
    setFormData(currentSignature);
  }, [currentSignature]);

  const handleChange = (field: keyof SignatureData, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSave = () => {
    saveSignature(formData);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this signature?")) {
      deleteSignature(formData.id);
    }
  };

  const templateOptions = [
    { value: "professional", label: "Professional" },
    { value: "modern", label: "Modern" },
    { value: "creative", label: "Creative" },
    { value: "minimalist", label: "Minimalist" },
    { value: "classic", label: "Classic" },
  ];

  const colorOptions = [
    { value: "#1A365D", label: "Navy Blue" },
    { value: "#0D9488", label: "Teal" },
    { value: "#14532D", label: "Forest Green" },
    { value: "#9D174D", label: "Ruby" },
    { value: "#6D28D9", label: "Purple" },
    { value: "#000000", label: "Black" },
  ];

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Customize Your Signature</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={createNewSignature} className="flex items-center">
            <Plus className="h-4 w-4 mr-1" />
            <span>New</span>
          </Button>
          <Button variant="destructive" onClick={handleDelete} className="flex items-center">
            <Trash2 className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Delete</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="style">Style & Template</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="title"
                  value={formData.title || ""}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Marketing Manager"
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="company"
                  value={formData.company || ""}
                  onChange={(e) => handleChange("company", e.target.value)}
                  placeholder="Example Inc."
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="name@example.com"
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  value={formData.phone || ""}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="(123) 456-7890"
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="website"
                  value={formData.website || ""}
                  onChange={(e) => handleChange("website", e.target.value)}
                  placeholder="example.com"
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="address"
                  value={formData.address || ""}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="123 Business St, City, ST 12345"
                  className="pl-10"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="style" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="template">Signature Template</Label>
              <Select
                value={formData.template}
                onValueChange={(value) => handleChange("template", value)}
              >
                <SelectTrigger id="template">
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  {templateOptions.map((template) => (
                    <SelectItem key={template.value} value={template.value}>
                      {template.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="color">Accent Color</Label>
              <div className="flex items-center space-x-2">
                <Palette className="h-4 w-4 text-gray-400" />
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => handleChange("color", color.value)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        formData.color === color.value 
                          ? "ring-2 ring-brand-teal ring-offset-2" 
                          : ""
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="social" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn Username</Label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="linkedin"
                  value={formData.linkedin || ""}
                  onChange={(e) => handleChange("linkedin", e.target.value)}
                  placeholder="username"
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter Username</Label>
              <div className="relative">
                <Twitter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="twitter"
                  value={formData.twitter || ""}
                  onChange={(e) => handleChange("twitter", e.target.value)}
                  placeholder="username"
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram Username</Label>
              <div className="relative">
                <Instagram className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="instagram"
                  value={formData.instagram || ""}
                  onChange={(e) => handleChange("instagram", e.target.value)}
                  placeholder="username"
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook Username</Label>
              <div className="relative">
                <Facebook className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="facebook"
                  value={formData.facebook || ""}
                  onChange={(e) => handleChange("facebook", e.target.value)}
                  placeholder="username"
                  className="pl-10"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave} className="bg-brand-teal hover:bg-brand-navy">
            <Save className="h-4 w-4 mr-2" />
            Save Signature
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignatureForm;
