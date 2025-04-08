
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
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
  Facebook,
  AlertCircle
} from "lucide-react";
import { SignatureData, emailRegex, phoneRegex, websiteRegex, usernameRegex } from "@/types";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define the validation schema with zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(100),
  email: z.string().email({ message: "Please enter a valid email address." }),
  title: z.string().optional(),
  company: z.string().optional(),
  phone: z.string().optional()
    .refine(val => !val || phoneRegex.test(val), { 
      message: "Please enter a valid phone number." 
    }),
  website: z.string().optional()
    .refine(val => !val || websiteRegex.test(val), { 
      message: "Please enter a valid website (e.g., example.com or www.example.com)."
    }),
  address: z.string().optional(),
  linkedin: z.string().optional()
    .refine(val => !val || usernameRegex.test(val), { 
      message: "Please enter a valid LinkedIn username without special characters."
    }),
  twitter: z.string().optional()
    .refine(val => !val || usernameRegex.test(val), { 
      message: "Please enter a valid Twitter username without special characters."
    }),
  instagram: z.string().optional()
    .refine(val => !val || usernameRegex.test(val), { 
      message: "Please enter a valid Instagram username without special characters."
    }),
  facebook: z.string().optional()
    .refine(val => !val || usernameRegex.test(val), { 
      message: "Please enter a valid Facebook username without special characters."
    }),
  template: z.enum(["professional", "modern", "creative", "minimalist", "classic"]),
  color: z.string()
});

const SignatureForm = () => {
  const { 
    currentSignature, 
    saveSignature, 
    createNewSignature, 
    deleteSignature 
  } = useSignature();
  
  const [activeTab, setActiveTab] = useState("basic");
  const { toast } = useToast();

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentSignature.name,
      email: currentSignature.email,
      title: currentSignature.title || "",
      company: currentSignature.company || "",
      phone: currentSignature.phone || "",
      website: currentSignature.website || "",
      address: currentSignature.address || "",
      linkedin: currentSignature.linkedin || "",
      twitter: currentSignature.twitter || "",
      instagram: currentSignature.instagram || "",
      facebook: currentSignature.facebook || "",
      template: currentSignature.template,
      color: currentSignature.color
    }
  });

  // Update form when current signature changes
  useEffect(() => {
    form.reset({
      name: currentSignature.name,
      email: currentSignature.email,
      title: currentSignature.title || "",
      company: currentSignature.company || "",
      phone: currentSignature.phone || "",
      website: currentSignature.website || "",
      address: currentSignature.address || "",
      linkedin: currentSignature.linkedin || "",
      twitter: currentSignature.twitter || "",
      instagram: currentSignature.instagram || "",
      facebook: currentSignature.facebook || "",
      template: currentSignature.template,
      color: currentSignature.color
    });
  }, [currentSignature, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const updatedSignature: SignatureData = {
      ...currentSignature,
      ...values
    };
    
    saveSignature(updatedSignature);
    
    toast({
      title: "Success",
      description: "Signature has been saved successfully",
    });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this signature?")) {
      deleteSignature(currentSignature.id);
      toast({
        title: "Deleted",
        description: "Signature has been deleted",
      });
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="style">Style & Template</TabsTrigger>
                <TabsTrigger value="social">Social Media</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor="name">Full Name</FormLabel>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <FormControl>
                          <Input
                            id="name"
                            {...field}
                            className="pl-10"
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor="title">Job Title</FormLabel>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <FormControl>
                          <Input
                            id="title"
                            placeholder="Marketing Manager"
                            {...field}
                            className="pl-10"
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor="company">Company</FormLabel>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <FormControl>
                          <Input
                            id="company"
                            placeholder="Example Inc."
                            {...field}
                            className="pl-10"
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <FormControl>
                          <Input
                            id="email"
                            placeholder="name@example.com"
                            {...field}
                            className="pl-10"
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor="phone">Phone Number</FormLabel>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <FormControl>
                          <Input
                            id="phone"
                            placeholder="(123) 456-7890"
                            {...field}
                            className="pl-10"
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor="website">Website</FormLabel>
                      <div className="relative">
                        <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <FormControl>
                          <Input
                            id="website"
                            placeholder="example.com"
                            {...field}
                            className="pl-10"
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor="address">Address</FormLabel>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <FormControl>
                          <Input
                            id="address"
                            placeholder="123 Business St, City, ST 12345"
                            {...field}
                            className="pl-10"
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="style" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="template"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor="template">Signature Template</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger id="template">
                            <SelectValue placeholder="Select a template" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {templateOptions.map((template) => (
                            <SelectItem key={template.value} value={template.value}>
                              {template.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor="color">Accent Color</FormLabel>
                      <div className="flex items-center space-x-2">
                        <Palette className="h-4 w-4 text-gray-400" />
                        <div className="flex flex-wrap gap-2">
                          {colorOptions.map((color) => (
                            <button
                              key={color.value}
                              type="button"
                              onClick={() => field.onChange(color.value)}
                              className={`w-8 h-8 rounded-full border-2 ${
                                field.value === color.value 
                                ? "ring-2 ring-brand-teal ring-offset-2" 
                                : ""
                              }`}
                              style={{ backgroundColor: color.value }}
                              title={color.label}
                            />
                          ))}
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="social" className="space-y-4 pt-4">
                <Alert className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Enter only usernames without @ or full URLs
                  </AlertDescription>
                </Alert>
                
                <FormField
                  control={form.control}
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor="linkedin">LinkedIn Username</FormLabel>
                      <div className="relative">
                        <Linkedin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <FormControl>
                          <Input
                            id="linkedin"
                            placeholder="username"
                            {...field}
                            className="pl-10"
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="twitter"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor="twitter">Twitter Username</FormLabel>
                      <div className="relative">
                        <Twitter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <FormControl>
                          <Input
                            id="twitter"
                            placeholder="username"
                            {...field}
                            className="pl-10"
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="instagram"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor="instagram">Instagram Username</FormLabel>
                      <div className="relative">
                        <Instagram className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <FormControl>
                          <Input
                            id="instagram"
                            placeholder="username"
                            {...field}
                            className="pl-10"
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="facebook"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor="facebook">Facebook Username</FormLabel>
                      <div className="relative">
                        <Facebook className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <FormControl>
                          <Input
                            id="facebook"
                            placeholder="username"
                            {...field}
                            className="pl-10"
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 flex justify-end">
              <Button type="submit" className="bg-brand-teal hover:bg-brand-navy">
                <Save className="h-4 w-4 mr-2" />
                Save Signature
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignatureForm;
