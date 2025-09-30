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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  // Basic Info
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "Please select a city"),
  dateOfBirth: z.date({
    required_error: "Please select date of birth",
  }),
  emergencyContactName: z.string().min(1, "Emergency contact name is required"),
  emergencyContactPhone: z
    .string()
    .min(10, "Please enter a valid emergency contact phone"),
  subscriptionPlan: z.string().min(1, "Please select a subscription plan"),
  assignedTrainer: z.string().min(1, "Please assign a trainer"),

  // Physio Section
  // Personal Details
  gender: z.string().min(1, "Please select gender"),
  age: z.string().min(1, "Age is required"),
  contactNumber: z.string().min(10, "Contact number is required"),
  placeOfStay: z.string().min(1, "Place of stay is required"),
  occupation: z.string().min(1, "Occupation is required"),
  workNature: z.string().optional(),
  maritalStatus: z.string().min(1, "Please select marital status"),
  expectedOutcome: z.string().min(1, "Expected outcome is required"),

  // Anthropometric Data
  height: z.string().min(1, "Height is required"),
  weight: z.string().min(1, "Weight is required"),
  bodyFatPercentage: z.string().optional(),
  waistToHipRatio: z.string().optional(),

  // Lifestyle
  stressLevel: z.string().min(1, "Please select stress level"),
  activityLevel: z.string().min(1, "Please select activity level"),
  bedtime: z.string().optional(),
  wakeupTime: z.string().optional(),
  lastMenstrualCycle: z.string().optional(),
  menstrualCycleNatural: z.string().optional(),
  menstrualCycleLength: z.string().optional(),
  drinking: z.string().optional(),
  drinkingFrequency: z.string().optional(),
  smoking: z.string().optional(),
  smokingFrequency: z.string().optional(),

  // Health Condition
  healthIssue: z.string().optional(),
  abnormalSymptoms: z.string().optional(),
  chronicIllness: z.string().optional(),
  currentMedications: z.string().optional(),
  familyHistory: z.string().optional(),
  pastSurgeries: z.string().optional(),
  gutIssues: z.string().optional(),

  // Physical Activity
  exerciseType: z.string().optional(),
  exerciseFrequency: z.string().optional(),
  activityDuration: z.string().optional(),

  // Dietary Habits
  foodAllergies: z.string().optional(),
  favoriteDishes: z.string().optional(),
  dislikedFoods: z.string().optional(),
  dietType: z.string().optional(),
  skipMeals: z.string().optional(),
  lateNightEating: z.string().optional(),
  waterIntake: z.string().optional(),
  beverages: z.string().optional(),
  outsideFood: z.string().optional(),
  breakfastTime: z.string().optional(),
  breakfastOptions: z.string().optional(),
  lunchTime: z.string().optional(),
  lunchOptions: z.string().optional(),
  dinnerTime: z.string().optional(),
  dinnerOptions: z.string().optional(),
  snacks: z.string().optional(),
  stressEating: z.string().optional(),
  sweetTooth: z.string().optional(),
  previousDiet: z.string().optional(),
  foodPreparation: z.string().optional(),

  // Nutritionist Section
  wholeGrains: z.string().optional(),
  fruits: z.string().optional(),
  vegetables: z.string().optional(),
  dairy: z.string().optional(),
  meatSeafood: z.string().optional(),
  pulsesLegumes: z.string().optional(),
  nutsSeeds: z.string().optional(),
  deepFriedFoods: z.string().optional(),

  // Payment Details
  totalAmount: z.string().min(1, "Total amount is required"),
  paidAmount: z.string().min(1, "Paid amount is required"),
  paymentType: z.string().min(1, "Please select payment type"),
  paymentMode: z.string().min(1, "Please select payment mode"),
  duration: z.string().min(1, "Please select duration"),
  totalInstallments: z.string().optional(),
  proofDocument: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface AddClientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock data - in real app this would come from API
const cities = ["Whitefield", "Koramangala", "RajajiNagar", "Electronic City"];
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
const frequencyOptions = ["Daily", "Weekly", "Rarely", "Never"];

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

export default function AddClientModal({
  open,
  onOpenChange,
}: AddClientModalProps) {
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Set default values for optional fields
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Client added:", data);
    toast({
      title: "Client Added Successfully",
      description: `${data.firstName} ${data.lastName} has been added to the system.`,
    });
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1000px] max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>
            Fill in the comprehensive client details across all sections.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="physio" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
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

              {/* PHYSIO SECTION */}
              <TabsContent value="physio" className="space-y-6">
                {/* Personal Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Personal Details
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
                      name="contactNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter contact number"
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
                    name="placeOfStay"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Place of Stay</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter place of stay" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                    <FormField
                      control={form.control}
                      name="workNature"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Work Nature</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Describe work nature"
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
                                <SelectValue placeholder="Select marital status" />
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

                    <FormField
                      control={form.control}
                      name="expectedOutcome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expected Outcome</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Expected outcome of program"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Anthropometric Data */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Anthropometric Data
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <FormField
                      control={form.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height (cm)</FormLabel>
                          <FormControl>
                            <Input placeholder="Height in cm" {...field} />
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
                            <Input placeholder="Weight in kg" {...field} />
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
                          <FormLabel>Body Fat % (BCA)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Body fat percentage"
                              {...field}
                            />
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
                          <FormLabel>Waist to Hip Ratio</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Waist to hip ratio"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Lifestyle */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Lifestyle
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="stressLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stress Level</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select stress level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {stressLevelOptions.map((level) => (
                                <SelectItem
                                  key={level}
                                  value={level.toLowerCase()}
                                >
                                  {level}
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
                      name="activityLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Activity Level</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select activity level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {activityLevelOptions.map((level) => (
                                <SelectItem
                                  key={level}
                                  value={level.toLowerCase().replace(" ", "_")}
                                >
                                  {level}
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
                      name="bedtime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>General Bedtime</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="wakeupTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Wake-up Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="lastMenstrualCycle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Last Menstrual Cycle (if applicable)
                          </FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="menstrualCycleNatural"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Menstrual Cycle Natural/Medication
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="natural">Natural</SelectItem>
                              <SelectItem value="medication">
                                With Medications
                              </SelectItem>
                              <SelectItem value="na">Not Applicable</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="menstrualCycleLength"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cycle Length (days)</FormLabel>
                          <FormControl>
                            <Input placeholder="Cycle length" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="drinking"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Do you drink?</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="drinkingFrequency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Drinking Frequency</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="How often do you drink?"
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
                      name="smoking"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Do you smoke?</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="smokingFrequency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Smoking Frequency</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="How often do you smoke?"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Health Condition & Family History */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Health Condition & Family History
                  </h3>

                  <FormField
                    control={form.control}
                    name="healthIssue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Specific Health Issue to be Addressed
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe specific health issues..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="abnormalSymptoms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Any Abnormal Symptoms Noticed</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="E.g. mood swings, pigmentation, bloating, disturbed sleep, acne, facial hair, palpitations, skin tags, etc."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="chronicIllness"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Any Chronic Illness</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="E.g. Diabetes, Obesity, Thyroid"
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
                        <FormLabel>
                          Currently on Medications/Supplements
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List current medications and supplements"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="familyHistory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Family History of Non-communicable Diseases
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Family history of diseases"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pastSurgeries"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>History of Past Surgeries</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List any past surgeries"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gutIssues"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Any Gut Issues/Digestive Health Issues
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="E.g. Bloating, acidity, constipation"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Physical Activity Levels */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Physical Activity Levels
                  </h3>

                  <FormField
                    control={form.control}
                    name="exerciseType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What Type of Exercise Do You Do?</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="E.g. Yoga, Running, Strength training"
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
                      name="exerciseFrequency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>How Often Do You Exercise?</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Exercise frequency"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="activityDuration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Daily Physical Activity Duration
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Duration per day" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Dietary Habits */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Dietary Habits
                  </h3>

                  <FormField
                    control={form.control}
                    name="foodAllergies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Allergic to Specific Foods?</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List food allergies"
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
                      name="favoriteDishes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>List Your Favorite Dishes</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Favorite dishes"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dislikedFoods"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>List Foods You Dislike</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Disliked foods" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="dietType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Diet Type</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="E.g. Veg/Non-veg/Vegan/Gluten-free"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="skipMeals"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Do You Skip Meals?</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lateNightEating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Do You Eat Late at Night?</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="waterIntake"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Daily Water Intake (approx)</FormLabel>
                          <FormControl>
                            <Input placeholder="Liters per day" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Continue with more dietary fields... */}
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
                    Basic Payment Details
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
                                <SelectValue placeholder="Select plan" />
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
                  </div>

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
              <Button type="submit">Add Client</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
