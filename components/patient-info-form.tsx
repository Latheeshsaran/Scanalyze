"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PatientInfo {
  patientId: string
  patientName: string
  patientAge: string
  patientGender: string
  scanDate: string
  clinicalHistory: string
}

interface PatientInfoFormProps {
  patientInfo: PatientInfo
  onChange: (info: Partial<PatientInfo>) => void
  scanType: string
}

export function PatientInfoForm({ patientInfo, onChange, scanType }: PatientInfoFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    onChange({ [name]: value })
  }

  const handleGenderChange = (value: string) => {
    onChange({ patientGender: value })
  }

  const getScanTypeTitle = () => {
    switch (scanType) {
      case "mri":
        return "MRI"
      case "ct":
        return "CT Scan"
      case "xray":
        return "X-Ray"
      default:
        return "Medical Scan"
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Patient Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="patientId">Patient ID *</Label>
          <Input
            id="patientId"
            name="patientId"
            value={patientInfo.patientId}
            onChange={handleChange}
            placeholder="e.g., P12345"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="patientName">Patient Name</Label>
          <Input
            id="patientName"
            name="patientName"
            value={patientInfo.patientName}
            onChange={handleChange}
            placeholder="e.g., John Doe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="patientAge">Age</Label>
          <Input
            id="patientAge"
            name="patientAge"
            type="number"
            value={patientInfo.patientAge}
            onChange={handleChange}
            placeholder="e.g., 45"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="patientGender">Gender</Label>
          <Select value={patientInfo.patientGender} onValueChange={handleGenderChange}>
            <SelectTrigger id="patientGender">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="scanDate">Scan Date</Label>
          <Input id="scanDate" name="scanDate" type="date" value={patientInfo.scanDate} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="scanType">Scan Type</Label>
          <Input id="scanType" value={getScanTypeTitle()} readOnly disabled />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="clinicalHistory">Clinical History</Label>
        <Textarea
          id="clinicalHistory"
          name="clinicalHistory"
          value={patientInfo.clinicalHistory}
          onChange={handleChange}
          placeholder="Enter relevant clinical history or symptoms..."
          rows={3}
        />
      </div>
    </div>
  )
}

