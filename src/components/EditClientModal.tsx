import React from "react";
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
  Heart,
  Activity,
  Utensils,
  CreditCard,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  // Basic Info
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "Please select a city"),
  emergencyContactName: z.string().min(1, "Emergency contact name is required"),
  emergencyContactPhone: z
    .string()
    .min(10, "Please enter a valid emergency contact phone"),
  subscriptionPlan: z.string().min(1, "Please select a subscription plan"),
  assignedTrainer: z.string().min(1, "Please assign a trainer"),
  status: z.string().min(1, "Please select a status"),

  // All the same physio, nutritionist, and payment fields from AddClientModal
  gender: z.string().optional(),
  age: z.string().optional(),
  contactNumber: z.string().optional(),
  placeOfStay: z.string().optional(),
  occupation: z.string().optional(),
  workNature: z.string().optional(),
  maritalStatus: z.string().optional(),
  expectedOutcome: z.string().optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  bodyFatPercentage: z.string().optional(),
  waistToHipRatio: z.string().optional(),
  stressLevel: z.string().optional(),
  activityLevel: z.string().optional(),
  bedtime: z.string().optional(),
  wakeupTime: z.string().optional(),
  healthIssue: z.string().optional(),
  abnormalSymptoms: z.string().optional(),
  chronicIllness: z.string().optional(),
  currentMedications: z.string().optional(),
  exerciseType: z.string().optional(),
  exerciseFrequency: z.string().optional(),
  foodAllergies: z.string().optional(),
  dietType: z.string().optional(),
  wholeGrains: z.string().optional(),
  fruits: z.string().optional(),
  vegetables: z.string().optional(),
  dairy: z.string().optional(),
  meatSeafood: z.string().optional(),
  pulsesLegumes: z.string().optional(),
  nutsSeeds: z.string().optional(),
  deepFriedFoods: z.string().optional(),
  totalAmount: z.string().optional(),
  paidAmount: z.string().optional(),
  paymentType: z.string().optional(),
  paymentMode: z.string().optional(),
  duration: z.string().optional(),
  totalInstallments: z.string().optional(),
  proofDocument: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  location: string;
  trainer: string;
  subscription: string;
  status: string;
  joinDate: string;
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  medicalConditions?: string;
}

interface EditClientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client | null;
}

// Mock data - in real app this would come from API
const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai"];
const genderOptions = ["Male", "Female", "Other"];
const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];
const stressLevelOptions = ["Mild", "Moderate", "Severe"];
const activityLevelOptions = [
  "Sedentary",
  "Moderately Active",
  "Highly Active",
];
const paymentTypeOptions = [
  "Booking",
  "First Installment",
  "Second Installment",
  "Third Installment",
  "Full Amount",
];
const paymentModeOptions = ["Cash", "UPI", "Bank Transfer", "Cheque"];
const durationOptions = ["1", "2", "3", "4", "5", "6"];

const subscriptionPlans = [
  { value: "trial", label: "Trial Plan (7 days)" },
  { value: "basic", label: "Basic Plan (1 month)" },
  { value: "standard", label: "Standard Plan (3 months)" },
  { value: "premium", label: "Premium Plan (6 months)" },
];

const trainers = [
  { id: "1", name: "Dr. Priya Sharma", specialty: "Physiotherapy" },
  { id: "2", name: "John Smith", specialty: "Fitness Training" },
  { id: "3", name: "Dr. Rajesh Kumar", specialty: "Nutrition Consultation" },
  { id: "4", name: "Sarah Wilson", specialty: "Companion Care" },
];

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
];

export default function EditClientModal({
  open,
  onOpenChange,
  client,
}: EditClientModalProps) {
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: client?.name.split(" ")[0] || "",
      lastName: client?.name.split(" ").slice(1).join(" ") || "",
      email: client?.email || "",
      phone: client?.phone || "",
      address: client?.address || "",
      city: client?.location || "",
      emergencyContactName: client?.emergencyContact || "",
      emergencyContactPhone: client?.emergencyPhone || "",
      subscriptionPlan: client?.subscription.toLowerCase() || "",
      assignedTrainer: "1",
      status: client?.status.toLowerCase() || "active",
    },
  });

  // Update form when client changes
  React.useEffect(() => {
    if (client) {
      form.reset({
        firstName: client.name.split(" ")[0] || "",
        lastName: client.name.split(" ").slice(1).join(" ") || "",
        email: client.email || "",
        phone: client.phone || "",
        address: client.address || "",
        city: client.location || "",
        emergencyContactName: client.emergencyContact || "",
        emergencyContactPhone: client.emergencyPhone || "",
        subscriptionPlan: client.subscription.toLowerCase() || "",
        assignedTrainer: "1",
        status: client.status.toLowerCase() || "active",
      });
    }
  }, [client, form]);

  const onSubmit = (data: FormData) => {
    console.log("Client updated:", data);
    toast({
      title: "Client Updated",
      description: `${data.firstName} ${data.lastName}'s information has been updated successfully.`,
    });
    onOpenChange(false);
  };

  if (!client) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1000px] max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Client Information</DialogTitle>
          <DialogDescription>
            Update the comprehensive client details across all sections.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Basic Info
                </TabsTrigger>
                <TabsTrigger value="physio" className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Physio Details
                </TabsTrigger>
                <TabsTrigger
                  value="nutritionist"
                  className="flex items-center gap-2"
                >
                  <Utensils className="h-4 w-4" />
                  Nutritionist
                </TabsTrigger>
                <TabsTrigger
                  value="payment"
                  className="flex items-center gap-2"
                >
                  <CreditCard className="h-4 w-4" />
                  Payment Details
                </TabsTrigger>
              </TabsList>

              {/* BASIC INFO SECTION */}
              <TabsContent value="basic" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Basic Information
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
                            <Input
                              placeholder="Enter phone number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter complete address"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            City
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select city" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {cities.map((city) => (
                                <SelectItem key={city} value={city}>
                                  {city}
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
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="emergencyContactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Emergency Contact Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter emergency contact name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="emergencyContactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Emergency Contact Phone</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter emergency contact phone"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="subscriptionPlan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subscription Plan</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select subscription plan" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {subscriptionPlans.map((plan) => (
                                <SelectItem key={plan.value} value={plan.value}>
                                  {plan.label}
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
                      name="assignedTrainer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Assign Trainer
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select trainer" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {trainers.map((trainer) => (
                                <SelectItem key={trainer.id} value={trainer.id}>
                                  {trainer.name} - {trainer.specialty}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* PHYSIO SECTION */}
              <TabsContent value="physio" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Extended Personal Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {genderOptions.map((gender) => (
                                <SelectItem
                                  key={gender}
                                  value={gender.toLowerCase()}
                                >
                                  {gender}
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
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter age" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="maritalStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Marital Status</FormLabel>
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
                              {maritalStatusOptions.map((status) => (
                                <SelectItem
                                  key={status}
                                  value={status.toLowerCase()}
                                >
                                  {status}
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
                    name="occupation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Occupation</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter occupation" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <FormField
                      control={form.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height (cm)</FormLabel>
                          <FormControl>
                            <Input placeholder="Height" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight (kg)</FormLabel>
                          <FormControl>
                            <Input placeholder="Weight" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bodyFatPercentage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Body Fat %</FormLabel>
                          <FormControl>
                            <Input placeholder="Body fat %" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="waistToHipRatio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Waist:Hip Ratio</FormLabel>
                          <FormControl>
                            <Input placeholder="Ratio" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="healthIssue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Health Issues</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe health issues..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="currentMedications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Medications</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List current medications..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="exerciseType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exercise Type</FormLabel>
                        <FormControl>
                          <Input placeholder="Type of exercises" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="foodAllergies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Food Allergies</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List food allergies..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dietType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Diet Type</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="E.g. Veg/Non-veg/Vegan"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              {/* NUTRITIONIST SECTION */}
              <TabsContent value="nutritionist" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Dietary Habits Frequency
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    How often do you consume the following? Mark YES in
                    whichever column is applicable.
                  </p>

                  <div className="grid gap-4">
                    {[
                      { key: "wholeGrains", label: "Whole grains" },
                      { key: "fruits", label: "Fruits" },
                      { key: "vegetables", label: "Vegetables" },
                      { key: "dairy", label: "Dairy" },
                      { key: "meatSeafood", label: "Meat/Seafood" },
                      { key: "pulsesLegumes", label: "Pulses/Legumes" },
                      { key: "nutsSeeds", label: "Nuts, Seeds" },
                      { key: "deepFriedFoods", label: "Deep fried foods" },
                    ].map((item) => (
                      <FormField
                        key={item.key}
                        control={form.control}
                        name={item.key as keyof FormData}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">
                              {item.label}
                            </FormLabel>
                            <div className="grid grid-cols-4 gap-4 mt-2">
                              <div className="text-center">
                                <div className="text-sm font-medium mb-2">
                                  Daily
                                </div>
                                <Checkbox
                                  checked={field.value === "daily"}
                                  onCheckedChange={(checked) => {
                                    if (checked) field.onChange("daily");
                                  }}
                                />
                              </div>
                              <div className="text-center">
                                <div className="text-sm font-medium mb-2">
                                  Weekly
                                </div>
                                <Checkbox
                                  checked={field.value === "weekly"}
                                  onCheckedChange={(checked) => {
                                    if (checked) field.onChange("weekly");
                                  }}
                                />
                              </div>
                              <div className="text-center">
                                <div className="text-sm font-medium mb-2">
                                  Rarely
                                </div>
                                <Checkbox
                                  checked={field.value === "rarely"}
                                  onCheckedChange={(checked) => {
                                    if (checked) field.onChange("rarely");
                                  }}
                                />
                              </div>
                              <div className="text-center">
                                <div className="text-sm font-medium mb-2">
                                  Never
                                </div>
                                <Checkbox
                                  checked={field.value === "never"}
                                  onCheckedChange={(checked) => {
                                    if (checked) field.onChange("never");
                                  }}
                                />
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* PAYMENT SECTION */}
              <TabsContent value="payment" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Payment Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="totalAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Amount</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter total amount"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="paidAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Paid Amount</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter paid amount" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="paymentType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select payment type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {paymentTypeOptions.map((type) => (
                                <SelectItem
                                  key={type}
                                  value={type.toLowerCase().replace(" ", "_")}
                                >
                                  {type}
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
                      name="paymentMode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Mode</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select payment mode" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {paymentModeOptions.map((mode) => (
                                <SelectItem
                                  key={mode}
                                  value={mode.toLowerCase().replace(" ", "_")}
                                >
                                  {mode}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration (months)</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {durationOptions.map((duration) => (
                                <SelectItem key={duration} value={duration}>
                                  {duration}{" "}
                                  {duration === "1" ? "month" : "months"}
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
                      name="totalInstallments"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Installments</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Number of installments"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="proofDocument"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Upload className="h-4 w-4" />
                            Proof Document
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  field.onChange(file.name);
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Update Client</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
