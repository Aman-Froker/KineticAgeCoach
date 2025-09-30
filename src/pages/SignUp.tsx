import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Phone,
  User,
  MapPin,
  Calendar,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SignUpData {
  email: string;
  password: string;
  phone: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: string;
  city: string;
  country: string;
}

export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SignUpData>({
    email: "",
    password: "",
    phone: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    address: "",
    city: "",
    country: "",
  });
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNext = () => {
    if (currentStep === 1) {
      // Validate step 1
      if (!formData.email || !formData.password || !formData.phone) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Validate step 2 and send OTP
      if (!formData.firstName || !formData.lastName || !formData.dateOfBirth) {
        toast({
          title: "Missing Information",
          description: "Please complete your personal details.",
          variant: "destructive",
        });
        return;
      }
      // Simulate sending OTP
      toast({
        title: "OTP Sent",
        description: `Verification code sent to ${formData.phone}`,
      });
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account Created!",
        description: "Welcome! Your account has been created successfully.",
      });
      navigate("/signin");
    }, 1000);
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="pl-9"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={handleChange}
            className="pl-9"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            value={formData.password}
            onChange={handleChange}
            className="pl-9 pr-9"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>

      <Button type="button" onClick={handleNext} className="w-full">
        Next <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="firstName"
              name="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange}
              className="pl-9"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Date of Birth</Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="pl-9"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="address"
            name="address"
            placeholder="123 Main St"
            value={formData.address}
            onChange={handleChange}
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            placeholder="New York"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            name="country"
            placeholder="United States"
            value={formData.country}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          onClick={handleBack}
          variant="outline"
          className="flex-1"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button type="button" onClick={handleNext} className="flex-1">
          Send OTP <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Verify Your Phone</h3>
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit code sent to {formData.phone}
        </p>
      </div>

      <div className="flex justify-center">
        <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <div className="text-center">
        <Button variant="ghost" size="sm">
          Resend code in 30s
        </Button>
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          onClick={handleBack}
          variant="outline"
          className="flex-1"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={isLoading || otp.length !== 6}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>
            Step {currentStep} of 3:{" "}
            {currentStep === 1
              ? "Account Details"
              : currentStep === 2
              ? "Personal Information"
              : "Phone Verification"}
          </CardDescription>
          <div className="flex space-x-2 mt-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`h-2 flex-1 rounded ${
                  step <= currentStep ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </form>

          <div className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?{" "}
            <Link to="/signin" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
