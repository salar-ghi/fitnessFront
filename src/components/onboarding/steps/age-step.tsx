"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useUserStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";

const generateYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear - 100; year <= currentYear; year++) {
    years.push(year);
  }
  return years.reverse();
};

const generateMonths = () => {
  return Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2000, i, 1);
    return format(date, "MMMM");
  });
};

const generateDays = (year: number, month: number) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};

export function AgeStep() {
  const { dateOfBirth, setDateOfBirth, nextStep, previousStep } = useUserStore();
  
  const now = new Date();
  const defaultDate = {
    year: now.getFullYear() - 25,
    month: now.getMonth(),
    day: now.getDate(),
  };

  const [selectedDate, setSelectedDate] = useState(() => {
    if (dateOfBirth instanceof Date) {
      return {
        year: dateOfBirth.getFullYear(),
        month: dateOfBirth.getMonth(),
        day: dateOfBirth.getDate(),
      };
    }
    return defaultDate;
  });

  const years = generateYears();
  const months = generateMonths();
  const days = generateDays(selectedDate.year, selectedDate.month);

  const handleDateChange = (
    type: "year" | "month" | "day",
    value: number | string
  ) => {
    const newDate = { ...selectedDate };
    if (type === "year") newDate.year = value as number;
    if (type === "month")
      newDate.month = months.indexOf(value as string);
    if (type === "day") newDate.day = value as number;
    
    setSelectedDate(newDate);
    const date = new Date(newDate.year, newDate.month, newDate.day);
    setDateOfBirth(date);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-green-800 dark:text-green-100">
        When were you born?
      </h2>

      <Card className="p-4 max-w-sm mx-auto">
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-2">
            <Label className="text-xs font-medium">Year</Label>
            <div className="relative">
              <ScrollArea className="h-[180px] rounded-md border bg-white dark:bg-gray-950 overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white dark:from-gray-950 to-transparent pointer-events-none z-10" />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white dark:from-gray-950 to-transparent pointer-events-none z-10" />
                <div className="py-20">
                  {years.map((year) => (
                    <div
                      key={year}
                      className={`px-3 py-2 cursor-pointer text-sm transition-colors ${
                        selectedDate.year === year
                          ? "bg-green-500 text-white"
                          : "hover:bg-green-100 dark:hover:bg-green-900"
                      }`}
                      onClick={() => handleDateChange("year", year)}
                    >
                      {year}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium">Month</Label>
            <div className="relative">
              <ScrollArea className="h-[180px] rounded-md border bg-white dark:bg-gray-950 overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white dark:from-gray-950 to-transparent pointer-events-none z-10" />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white dark:from-gray-950 to-transparent pointer-events-none z-10" />
                <div className="py-20">
                  {months.map((month) => (
                    <div
                      key={month}
                      className={`px-3 py-2 cursor-pointer text-sm transition-colors ${
                        months[selectedDate.month] === month
                          ? "bg-green-500 text-white"
                          : "hover:bg-green-100 dark:hover:bg-green-900"
                      }`}
                      onClick={() => handleDateChange("month", month)}
                    >
                      {month}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium">Day</Label>
            <div className="relative">
              <ScrollArea className="h-[180px] rounded-md border bg-white dark:bg-gray-950 overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white dark:from-gray-950 to-transparent pointer-events-none z-10" />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white dark:from-gray-950 to-transparent pointer-events-none z-10" />
                <div className="py-20">
                  {days.map((day) => (
                    <div
                      key={day}
                      className={`px-3 py-2 cursor-pointer text-sm transition-colors ${
                        selectedDate.day === day
                          ? "bg-green-500 text-white"
                          : "hover:bg-green-100 dark:hover:bg-green-900"
                      }`}
                      onClick={() => handleDateChange("day", day)}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-between">
        <Button
          onClick={previousStep}
          variant="outline"
          className="border-green-600 text-green-600"
        >
          Previous
        </Button>
        <Button
          onClick={nextStep}
          disabled={!dateOfBirth}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
}