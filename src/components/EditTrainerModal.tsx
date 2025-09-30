import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Award,
  Clock,
  FileText,
  Eye,
  Trash2,
  Upload,
  Plus,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  specialty: z.string().min(1, "Please select a specialty"),
  location: z.string().min(1, "Please select a location"),
  status: z.string().min(1, "Please select a status"),
  experience: z.string().optional(),
  // Updated certification schema
  certifications: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        file: z.any().optional(),
        fileUrl: z.string().optional(),
        fileType: z.string().optional(),
      })
    )
    .min(1, "Please add at least one certification"),
  availability: z.string().min(1, "Please select availability"),
  languages: z.string().optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface Trainer {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  location: string;
  status: string;
  rating: number;
  joinDate: string;
  experience?: string;
  certifications?: Array<{
    id: string;
    name: string;
    file?: File;
    fileUrl?: string;
    fileType?: string;
  }>;
  availability?: string;
  languages?: string[];
}

interface EditTrainerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trainer: Trainer | null;
}

// Mock data - in real app this would come from API
const specialties = [
  "Physiotherapy",
  "Fitness Training",
  "Nutrition",
  "Companion Care",
];

const locations = ["Mumbai", "Delhi", "Bangalore", "Chennai"];

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "on-leave", label: "On Leave" },
  { value: "inactive", label: "Inactive" },
];

const availabilityOptions = [
  { value: "full-time", label: "Full Time" },
  { value: "part-time", label: "Part Time" },
  { value: "weekends", label: "Weekends Only" },
  { value: "flexible", label: "Flexible" },
];

export default function EditTrainerModal({
  open,
  onOpenChange,
  trainer,
}: EditTrainerModalProps) {
  const { toast } = useToast();

  const [selectedCertifications, setSelectedCertifications] = useState<
    Array<{
      id: string;
      name: string;
      file?: File;
      fileUrl?: string;
      fileType?: string;
    }>
  >([]);
  const [newCertificationName, setNewCertificationName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: trainer?.name.split(" ")[0] || "",
      lastName: trainer?.name.split(" ").slice(1).join(" ") || "",
      email: trainer?.email || "",
      phone: trainer?.phone || "",
      specialty: trainer?.specialty || "",
      location: trainer?.location || "",
      status: trainer?.status.toLowerCase().replace(" ", "-") || "active",
      experience: trainer?.experience || "",
      certifications: [], // Initialize as empty array
      availability:
        trainer?.availability?.toLowerCase().replace(" ", "-") || "",
      languages: trainer?.languages?.join(", ") || "",
      notes: "",
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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

      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
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

      setNewCertificationName("");
      setSelectedFile(null);
      setPreviewUrl("");

      const fileInput = document.getElementById(
        "edit-certification-file"
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

  // Update form when trainer changes
  React.useEffect(() => {
    if (trainer) {
      // Handle existing certifications
      const existingCertifications = trainer.certifications || [];
      setSelectedCertifications(existingCertifications);

      form.reset({
        firstName: trainer.name.split(" ")[0] || "",
        lastName: trainer.name.split(" ").slice(1).join(" ") || "",
        email: trainer.email || "",
        phone: trainer.phone || "",
        specialty: trainer.specialty || "",
        location: trainer.location || "",
        status: trainer.status.toLowerCase().replace(" ", "-") || "active",
        experience: trainer.experience || "",
        certifications: existingCertifications,
        availability:
          trainer.availability?.toLowerCase().replace(" ", "-") || "",
        languages: trainer.languages?.join(", ") || "",
        notes: "",
      });
    }
  }, [trainer, form]);

  React.useEffect(() => {
    return () => {
      selectedCertifications.forEach((cert) => {
        if (cert.fileUrl) {
          URL.revokeObjectURL(cert.fileUrl);
        }
      });
    };
  }, []);

  const onSubmit = (data: FormData) => {
    console.log("Trainer updated:", data);

    selectedCertifications.forEach((cert) => {
      if (cert.fileUrl && cert.fileUrl.startsWith("blob:")) {
        URL.revokeObjectURL(cert.fileUrl);
      }
    });

    toast({
      title: "Trainer Updated",
      description: `${data.firstName} ${data.lastName}'s information has been updated successfully.`,
    });
    onOpenChange(false);
  };

  if (!trainer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Trainer Information</DialogTitle>
          <DialogDescription>
            Update the trainer's information below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Professional Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="specialty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specialty</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select specialty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {specialties.map((specialty) => (
                            <SelectItem key={specialty} value={specialty}>
                              {specialty}
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
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Location
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {statusOptions.map((option) => (
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

                <FormField
                  control={form.control}
                  name="availability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Availability
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
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
              </div>

              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 5 years in physiotherapy"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="certifications"
                render={() => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Certifications
                    </FormLabel>
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
                                htmlFor="edit-certification-file"
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
                                id="edit-certification-file"
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

              <FormField
                control={form.control}
                name="languages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Languages</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., English, Hindi, Bengali"
                        {...field}
                      />
                    </FormControl>
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
                      placeholder="Add any additional notes..."
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
              <Button type="submit">Update Trainer</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
