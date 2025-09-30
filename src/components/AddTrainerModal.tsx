import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import {
  CalendarIcon,
  User,
  Mail,
  Phone,
  MapPin,
  Award,
  Languages,
  X,
  Plus,
  FileText,
  Eye,
  Trash2,
  Upload,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  specialization: z.string().min(1, "Please select a specialization"),
  cities: z.array(z.string()).min(1, "Please select at least one city"),
  joinDate: z.date({
    required_error: "Please select joining date",
  }),
  experience: z.string().min(1, "Experience is required"),
  // Updated certification schema to include file data
  certifications: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        file: z.any().optional(), // File object
        fileUrl: z.string().optional(), // For preview
        fileType: z.string().optional(), // 'pdf' | 'image'
      })
    )
    .min(1, "Please add at least one certification"),
  availability: z.string().min(1, "Please select availability"),
  languages: z.array(z.string()).min(1, "Please select at least one language"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface AddTrainerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock data - in real app this would come from API
const allCities = [
  "Whitefield",
  "Koramangala",
  "RajajiNagar",
  "Electronic City",
  "Lalbagh",
  "Brookefield",
  "Jayanagar",
];

const specializations = [
  { value: "Physiotherapist", label: "Physiotherapist" },
  { value: "Fitness Trainer", label: "Fitness Trainer" },
  { value: "Nutritionist", label: "Nutritionist" },
  { value: "Companion Care", label: "Companion Care" },
  { value: "Occupational Therapist", label: "Occupational Therapist" },
  { value: "Speech Therapist", label: "Speech Therapist" },
  { value: "Mental Health Counselor", label: "Mental Health Counselor" },
];

const availabilityOptions = [
  { value: "Full Time", label: "Full Time (40+ hours/week)" },
  { value: "Part Time", label: "Part Time (20-39 hours/week)" },
  { value: "Weekend Only", label: "Weekend Only" },
  { value: "Flexible", label: "Flexible Schedule" },
  { value: "On Call", label: "On-Call Basis" },
];

const languageOptions = [
  "English",
  "Hindi",
  "Bengali",
  "Tamil",
  "Telugu",
  "Marathi",
  "Gujarati",
  "Kannada",
];

export default function AddTrainerModal({
  open,
  onOpenChange,
}: AddTrainerModalProps) {
  const { toast } = useToast();
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [newCertification, setNewCertification] = useState("");

  const [selectedCertifications, setSelectedCertifications] = useState<
    Array<{
      id: string;
      name: string;
      file?: File;
      fileUrl?: string;
      fileType?: string;
    }>
  >([]);

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [newCertificationName, setNewCertificationName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cities: [],
      certifications: [],
      languages: [],
      notes: "",
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/jpg",
      ];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please select a PDF or image file (JPG, PNG)",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const addCertification = () => {
    if (newCertificationName.trim() && selectedFile) {
      const newCertification = {
        id: `cert-${Date.now()}`,
        name: newCertificationName.trim(),
        file: selectedFile,
        fileUrl: previewUrl,
        fileType: selectedFile.type.startsWith("image/") ? "image" : "pdf",
      };

      const updated = [...selectedCertifications, newCertification];
      setSelectedCertifications(updated);
      form.setValue("certifications", updated);

      // Reset form
      setNewCertificationName("");
      setSelectedFile(null);
      setPreviewUrl("");

      // Reset file input
      const fileInput = document.getElementById(
        "certification-file"
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } else {
      toast({
        title: "Missing information",
        description: "Please provide both certification name and file",
        variant: "destructive",
      });
    }
  };

  const removeCertification = (certId: string) => {
    const certToRemove = selectedCertifications.find((c) => c.id === certId);
    if (certToRemove?.fileUrl) {
      URL.revokeObjectURL(certToRemove.fileUrl);
    }

    const updated = selectedCertifications.filter((c) => c.id !== certId);
    setSelectedCertifications(updated);
    form.setValue("certifications", updated);
  };

  const viewCertification = (cert: any) => {
    if (cert.fileUrl) {
      window.open(cert.fileUrl, "_blank");
    }
  };

  const toggleCity = (city: string) => {
    const updated = selectedCities.includes(city)
      ? selectedCities.filter((c) => c !== city)
      : [...selectedCities, city];
    setSelectedCities(updated);
    form.setValue("cities", updated);
  };

  const toggleLanguage = (language: string) => {
    const updated = selectedLanguages.includes(language)
      ? selectedLanguages.filter((l) => l !== language)
      : [...selectedLanguages, language];
    setSelectedLanguages(updated);
    form.setValue("languages", updated);
  };

  const onSubmit = (data: FormData) => {
    const trainerData = {
      id: Date.now(), // In real app, this would be generated by backend
      name: data.name,
      specialization: data.specialization,
      cities: data.cities,
      status: "Active",
      clients: 0,
      rating: 0,
      sessionsThisWeek: 0,
      certifications: data.certifications,
      joinDate: format(data.joinDate, "yyyy-MM-dd"),
      experience: data.experience,
      email: data.email,
      phone: data.phone,
      availability: data.availability,
      languages: data.languages,
      notes: data.notes || "",
    };
    console.log("Trainer added:", trainerData);
    toast({
      title: "Trainer Added Successfully",
      description: `${data.name} has been added to the system.`,
    });

    selectedCertifications.forEach((cert) => {
      if (cert.fileUrl) {
        URL.revokeObjectURL(cert.fileUrl);
      }
    });

    // Reset states
    form.reset();
    setSelectedCities([]);
    setSelectedCertifications([]);
    setSelectedLanguages([]);
    setNewCertificationName("");
    setSelectedFile(null);
    setPreviewUrl("");
    onOpenChange(false);
  };

  React.useEffect(() => {
    return () => {
      // Cleanup object URLs when component unmounts
      selectedCertifications.forEach((cert) => {
        if (cert.fileUrl) {
          URL.revokeObjectURL(cert.fileUrl);
        }
      });
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Trainer</DialogTitle>
          <DialogDescription>
            Fill in the trainer details to add them to the system.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Personal Information
              </h3>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter email address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="joinDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Joining Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick joining date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date("2020-01-01")}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Professional Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="specialization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        Specialization
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select specialization" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {specializations.map((spec) => (
                            <SelectItem key={spec.value} value={spec.value}>
                              {spec.label}
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
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 8 years" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Availability</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select availability" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availabilityOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Certifications */}
              <FormField
                control={form.control}
                name="certifications"
                render={() => (
                  <FormItem>
                    <FormLabel>Certifications</FormLabel>
                    <div className="space-y-4">
                      {/* File Upload Section */}
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                        <div className="space-y-4">
                          <Input
                            placeholder="Certification name (e.g., Certified Physical Therapist)"
                            value={newCertificationName}
                            onChange={(e) =>
                              setNewCertificationName(e.target.value)
                            }
                          />

                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <label
                                htmlFor="certification-file"
                                className="cursor-pointer"
                              >
                                <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                                  <Upload className="h-4 w-4" />
                                  <span className="text-sm">
                                    {selectedFile
                                      ? selectedFile.name
                                      : "Choose file (PDF, JPG, PNG)"}
                                  </span>
                                </div>
                              </label>
                              <input
                                id="certification-file"
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={handleFileSelect}
                                className="hidden"
                              />
                            </div>

                            <Button
                              type="button"
                              onClick={addCertification}
                              disabled={
                                !newCertificationName.trim() || !selectedFile
                              }
                              size="sm"
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Add
                            </Button>
                          </div>

                          {selectedFile && (
                            <div className="text-sm text-gray-600">
                              Selected: {selectedFile.name} (
                              {(selectedFile.size / 1024).toFixed(1)} KB)
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Certification List */}
                      <div className="space-y-2">
                        {selectedCertifications.map((cert) => (
                          <div
                            key={cert.id}
                            className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                {cert.fileType === "pdf" ? (
                                  <FileText className="h-5 w-5 text-red-600" />
                                ) : (
                                  <div className="h-5 w-5 bg-blue-600 rounded flex items-center justify-center">
                                    <span className="text-xs text-white">
                                      IMG
                                    </span>
                                  </div>
                                )}
                                <div>
                                  <div className="font-medium text-sm">
                                    {cert.name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {cert.fileType === "pdf"
                                      ? "PDF Document"
                                      : "Image File"}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => viewCertification(cert)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeCertification(cert.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {selectedCertifications.length === 0 && (
                        <p className="text-sm text-gray-500 text-center py-4">
                          No certifications added yet
                        </p>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Location & Languages */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Location & Languages
              </h3>

              {/* Cities */}
              <FormField
                control={form.control}
                name="cities"
                render={() => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Service Cities
                    </FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {allCities.map((city) => (
                        <label
                          key={city}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCities.includes(city)}
                            onChange={() => toggleCity(city)}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm">{city}</span>
                        </label>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Languages */}
              <FormField
                control={form.control}
                name="languages"
                render={() => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Languages className="h-4 w-4" />
                      Languages
                    </FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {languageOptions.map((language) => (
                        <label
                          key={language}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedLanguages.includes(language)}
                            onChange={() => toggleLanguage(language)}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm">{language}</span>
                        </label>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Additional Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any additional notes, special skills, or preferences..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Add Trainer</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
