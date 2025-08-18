"use client"
import React, { useState, useEffect } from "react";
import { CalendarDays, FileText, AlertCircle, RefreshCw } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

type File = {
  key: string;
  versionId: string;
  isLatest: boolean;
};

const DIRECTORY_PREFIXES = {
  ACCEPTANCE: 'acceptance_file',
  MEMBERSHIP: 'member_information_raw',
  REEMPLOYMENT: 'reemployment_history'
} as const;

export default function ProcessPage() {
  const [acceptance, setAcceptance] = useState("");
  const [membership, setMembership] = useState("");
  const [reemployment, setReemployment] = useState("");
  const defaultYear = String(new Date().getFullYear());
  const defaultMonth = (() => { const m = new Date().getMonth() + 1; return m < 10 ? `0${m}` : String(m); })();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [year, setYear] = useState<string>(defaultYear);
  const [month, setMonth] = useState<string>(defaultMonth);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [acceptanceOptions, setAcceptanceOptions] = useState<File[]>([]);
  const [membershipOptions, setMembershipOptions] = useState<File[]>([]);
  const [reemploymentOptions, setReemploymentOptions] = useState<File[]>([]);
  const [otherOptions, setOtherOptions] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingFiles, setFetchingFiles] = useState(false);
  const [lastFetchedAt, setLastFetchedAt] = useState<string | null>(null);

  const fetchFiles = async () => {
    setFetchingFiles(true);
    try {
      const response = await client.queries.getS3Objects() as { data: unknown };
      const files = response.data as File[];

      const acceptanceFiles = files.filter(file =>
        file.key.startsWith(DIRECTORY_PREFIXES.ACCEPTANCE)
      );
      const membershipFiles = files.filter(file =>
        file.key.startsWith(DIRECTORY_PREFIXES.MEMBERSHIP)
      );
      const reemploymentFiles = files.filter(file =>
        file.key.startsWith(DIRECTORY_PREFIXES.REEMPLOYMENT)
      );

      const otherFiles = files.filter(file =>
        !file.key.startsWith(DIRECTORY_PREFIXES.ACCEPTANCE) &&
        !file.key.startsWith(DIRECTORY_PREFIXES.MEMBERSHIP) &&
        !file.key.startsWith(DIRECTORY_PREFIXES.REEMPLOYMENT)
      );

      setAcceptanceOptions(acceptanceFiles);
      setMembershipOptions(membershipFiles);
      setReemploymentOptions(reemploymentFiles);
      setOtherOptions(otherFiles);

      setAcceptance("");
      setMembership("");
      setReemployment("");

  setLastFetchedAt(new Date().toISOString());
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setFetchingFiles(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const currentYear = new Date().getFullYear();
  const yearOptions: string[] = [];
  for (let y = currentYear; y >= 2000; y--) {
    yearOptions.push(String(y));
  }

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
    if (!year) {
      newErrors.year = "Year is required";
    } else if (isNaN(Number(year)) || Number(year) < 1900 || Number(year) > 2100) {
      newErrors.year = "Enter a valid year";
    }
    if (!month) {
      newErrors.month = "Month is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      setLoading(true);
      try {

        const selectedAcceptance = acceptanceOptions.find(file => file.key === acceptance);
        const selectedMembership = membershipOptions.find(file => file.key === membership);
        const selectedReemployment = reemploymentOptions.find(file => file.key === reemployment);

        if (!selectedAcceptance || !selectedMembership || !selectedReemployment) {
          throw new Error("Selected files not found");
        }

        const result = await client.mutations.saveForm({
          acceptanceFile: {
            key: selectedAcceptance.key,
            versionId: selectedAcceptance.versionId
          },
          membershipInformationFile: {
            key: selectedMembership.key,
            versionId: selectedMembership.versionId
          },
          reEmploymentHistory: {
            key: selectedReemployment.key,
            versionId: selectedReemployment.versionId
          },
        });

        alert("Process completed successfully!");

  setAcceptance("");
  setMembership("");
  setReemployment("");
  setStartDate("");
  setEndDate("");
  setYear(defaultYear);
  setMonth(defaultMonth);

      } catch (error) {
        alert("Error processing files. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ minHeight: '100vh' }}
    >
      <div className="grid auto-rows-min gap-4 md:grid-cols-1">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Fetch Files from S3
                </CardTitle>
              </div>
              <Button
                onClick={fetchFiles}
                disabled={fetchingFiles}
                variant="outline"
                size="sm"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${fetchingFiles ? 'animate-spin' : ''}`} />
                {fetchingFiles ? 'Loading...' : 'Refresh Files'}
              </Button>
            </div>
            {(acceptanceOptions.length > 0 || membershipOptions.length > 0 || reemploymentOptions.length > 0 || otherOptions.length > 0) && (
              <div className="mt-4 text-sm text-muted-foreground">
                Files found: {acceptanceOptions.length} acceptance, {membershipOptions.length} membership, {reemploymentOptions.length} reemployment
                {lastFetchedAt && (
                  <div className="text-xs text-muted-foreground mt-1">Last fetched: {new Date(lastFetchedAt).toLocaleString()}</div>
                )}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 mt-5 mb-3">
                <CalendarDays className="w-4 h-4" />
                <Label className="text-sm font-medium">Fetch Specific Dates</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-sm font-medium flex items-center gap-1">
                    <span>From</span>
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

                <div className="space-y-2 mb-5">
                  <Label htmlFor="endDate" className="text-sm font-medium flex items-center gap-1">
                    <span>To</span>
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
            </div>
          </CardHeader>
        </Card>

        <div className="space-y-6 p-2 mt-5">
          <div>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <CalendarDays className="w-4 h-4 text-muted-foreground" />
                <Label className="text-sm font-medium">Year & Month</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year" className="text-sm font-medium flex items-center gap-1"> 
                    <span>Year</span>
                    <span className="text-destructive">*</span>
                  </Label>
                  <Select value={year} onValueChange={(value) => {
                    setYear(value);
                    if (errors.year) {
                      const newErrors = { ...errors };
                      delete newErrors.year;
                      setErrors(newErrors);
                    }
                  }}>
                    <SelectTrigger id="year" className="h-11">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {yearOptions.map((y) => (
                        <SelectItem key={y} value={y}>{y}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.year && <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.year}
                  </p>}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="month" className="text-sm font-medium flex items-center gap-1">
                    <span>Month</span>
                    <span className="text-destructive">*</span>
                  </Label>
                  <Select value={month} onValueChange={(value) => {
                    setMonth(value);
                    if (errors.month) {
                      const newErrors = { ...errors };
                      delete newErrors.month;
                      setErrors(newErrors);
                    }
                  }}>
                    <SelectTrigger id="month" className="h-11">
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="01">January</SelectItem>
                      <SelectItem value="02">February</SelectItem>
                      <SelectItem value="03">March</SelectItem>
                      <SelectItem value="04">April</SelectItem>
                      <SelectItem value="05">May</SelectItem>
                      <SelectItem value="06">June</SelectItem>
                      <SelectItem value="07">July</SelectItem>
                      <SelectItem value="08">August</SelectItem>
                      <SelectItem value="09">September</SelectItem>
                      <SelectItem value="10">October</SelectItem>
                      <SelectItem value="11">November</SelectItem>
                      <SelectItem value="12">December</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.month && <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.month}
                  </p>}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <Label className="text-sm font-medium">File Selection</Label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="acceptance" className="text-sm font-medium flex items-center gap-1">
                  <span>Acceptance</span>
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
                    {acceptanceOptions.length > 0 ? (
                      acceptanceOptions.map((file) => (
                        <SelectItem key={`${file.key}-${file.versionId}`} value={file.key}>
                          {file.key} {file.isLatest ? "(Latest)" : ""}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="">No files available</SelectItem>
                    )}
                  </SelectContent>
                </Select>
                {errors.acceptance && <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.acceptance}
                </p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="membership" className="text-sm font-medium flex items-center gap-1">
                  <span>Membership</span>
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
                    {membershipOptions.length > 0 ? (
                      membershipOptions.map((file) => (
                        <SelectItem key={`${file.key}-${file.versionId}`} value={file.key}>
                          {file.key} {file.isLatest ? "(Latest)" : ""}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="">No files available</SelectItem>
                    )}
                  </SelectContent>
                </Select>
                {errors.membership && <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.membership}
                </p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="reemployment" className="text-sm font-medium flex items-center gap-1">
                  <span>Reemployment History</span>
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
                    {reemploymentOptions.length > 0 ? (
                      reemploymentOptions.map((file) => (
                        <SelectItem key={`${file.key}-${file.versionId}`} value={file.key}>
                          {file.key} {file.isLatest ? "(Latest)" : ""}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="">No files available</SelectItem>
                    )}
                  </SelectContent>
                </Select>
                {errors.reemployment && <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.reemployment}
                </p>}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button
              onClick={handleSave}
              className="h-11"
              disabled={loading || !acceptance || !membership || !reemployment || !year || !month}
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Processing Files...
                </>
              ) : (
                "Process"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
