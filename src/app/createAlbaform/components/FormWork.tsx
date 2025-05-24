'use client';

import React, { useEffect, useState } from 'react';

export interface WorkFormValues {
  location: string;
  workStartDate: string;
  workEndDate: string;
  workStartTime: string; // "09:00" 또는 "string" 형태로 시간 포맷 필요
  workEndTime: string; // "09:00" 또는 "string" 형태로 시간 포맷 필요
  workDays: string[];
  isNegotiableWorkDays: boolean;
  hourlyWage: number;
  isPublic: boolean;
}

interface FormWorkProps {
  onDataChange: (data: WorkFormValues) => void;
  initialValue: WorkFormValues;
}

export default function FormWork({
  onDataChange,
  initialValue,
}: FormWorkProps) {}
