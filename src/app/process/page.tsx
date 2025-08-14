"use client"
import React, { useState } from "react";
import { CalendarDays, FileText, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function ProcessPage() {
  const [acceptance, setAcceptance] = useState("");
  const [membership, setMembership] = useState("");
  const [reemployment, setReemployment] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [acceptanceOptions, setAcceptanceOptions] = useState<string[]>([]);
  const [membershipOptions, setMembershipOptions] = useState<string[]>([]);
  const [reemploymentOptions, setReemploymentOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFileOptions = async () => {
    if (!startDate || !endDate) return;
    
    setLoading(true);
    try {
      // Simulate API call to fetch files based on date range
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - replace with actual API call
      const mockAcceptanceFiles = [
        `Acceptance_${startDate}_to_${endDate}_001`,
        `Acceptance_${startDate}_to_${endDate}_002`,
        `Acceptance_${startDate}_to_${endDate}_003`,
      ];
      const mockMembershipFiles = [
        `Membership_${startDate}_to_${endDate}_001`,
        `Membership_${startDate}_to_${endDate}_002`,
        `Membership_${startDate}_to_${endDate}_003`,
      ];
      const mockReemploymentFiles = [
        `Reemployment_${startDate}_to_${endDate}_001`,
        `Reemployment_${startDate}_to_${endDate}_002`,
        `Reemployment_${startDate}_to_${endDate}_003`,
      ];
      
      setAcceptanceOptions(mockAcceptanceFiles);
      setMembershipOptions(mockMembershipFiles);
      setReemploymentOptions(mockReemploymentFiles);
      
      // Reset selected values when options change
      setAcceptance("");
      setMembership("");
      setReemployment("");
    } catch (error) {
      console.error("Error fetching file options:", error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!acceptance) {
      newErrors.acceptance = "Acceptance file is required";
    }
    if (!membership) {
      newErrors.membership = "Membership file is required";
    }
    if (!reemployment) {
      newErrors.reemployment = "Reemployment history file is required";
    }
    if (!startDate) {
      newErrors.startDate = "Start date is required";
    }
    if (!endDate) {
      newErrors.endDate = "End date is required";
    }
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      newErrors.endDate = "End date must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      // Handle save logic here
      console.log("Saving process data:", {
        acceptance,
        membership,
        reemployment,
        startDate,
        endDate,
      });
      alert("Process data saved successfully!");
    }
  };

  return (
    <div className="grid gap-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-1">
        {/* Date Filter Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarDays className="w-5 h-5" />
              Date Filter
            </CardTitle>
            <CardDescription>
              Select date range to filter available files
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-sm font-medium flex items-center gap-1">
                  <span>From Date</span>
                  <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      if (errors.startDate) {
                        const newErrors = { ...errors };
                        delete newErrors.startDate;
                        setErrors(newErrors);
                      }
                    }}
                    className="pl-10"
                  />
                  <CalendarDays className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
                {errors.startDate && <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.startDate}
                </p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-sm font-medium flex items-center gap-1">
                  <span>To Date</span>
                  <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                      if (errors.endDate) {
                        const newErrors = { ...errors };
                        delete newErrors.endDate;
                        setErrors(newErrors);
                      }
                    }}
                    className="pl-10"
                  />
                  <CalendarDays className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
                {errors.endDate && <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.endDate}
                </p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* File Selection Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Process
            </CardTitle>
            <CardDescription>
              Select files to process based on your date filter
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="acceptance" className="text-sm font-medium flex items-center gap-1">
                  <span>Acceptance File</span>
                  <span className="text-destructive">*</span>
                </Label>
                <Select value={acceptance} onValueChange={(value) => {
                  setAcceptance(value);
                  if (errors.acceptance) {
                    const newErrors = { ...errors };
                    delete newErrors.acceptance;
                    setErrors(newErrors);
                  }
                }}>
                  <SelectTrigger id="acceptance" className="h-11">
                    <SelectValue placeholder="Select acceptance file" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acceptance-001">Acceptance File 001</SelectItem>
                    <SelectItem value="acceptance-002">Acceptance File 002</SelectItem>
                    <SelectItem value="acceptance-003">Acceptance File 003</SelectItem>
                  </SelectContent>
                </Select>
                {errors.acceptance && <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.acceptance}
                </p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="membership" className="text-sm font-medium flex items-center gap-1">
                  <span>Membership File</span>
                  <span className="text-destructive">*</span>
                </Label>
                <Select value={membership} onValueChange={(value) => {
                  setMembership(value);
                  if (errors.membership) {
                    const newErrors = { ...errors };
                    delete newErrors.membership;
                    setErrors(newErrors);
                  }
                }}>
                  <SelectTrigger id="membership" className="h-11">
                    <SelectValue placeholder="Select membership file" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="membership-001">Membership File 001</SelectItem>
                    <SelectItem value="membership-002">Membership File 002</SelectItem>
                    <SelectItem value="membership-003">Membership File 003</SelectItem>
                  </SelectContent>
                </Select>
                {errors.membership && <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.membership}
                </p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="reemployment" className="text-sm font-medium flex items-center gap-1">
                  <span>Reemployment History File</span>
                  <span className="text-destructive">*</span>
                </Label>
                <Select value={reemployment} onValueChange={(value) => {
                  setReemployment(value);
                  if (errors.reemployment) {
                    const newErrors = { ...errors };
                    delete newErrors.reemployment;
                    setErrors(newErrors);
                  }
                }}>
                  <SelectTrigger id="reemployment" className="h-11">
                    <SelectValue placeholder="Select reemployment history file" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reemployment-001">Reemployment History File 001</SelectItem>
                    <SelectItem value="reemployment-002">Reemployment History File 002</SelectItem>
                    <SelectItem value="reemployment-003">Reemployment History File 003</SelectItem>
                  </SelectContent>
                </Select>
                {errors.reemployment && <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.reemployment}
                </p>}
              </div>

              <div className="pt-4 border-t">
                <Button 
                  onClick={handleSave} 
                  className="w-full h-11"
                  disabled={true}
                >
                  Process Files
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
