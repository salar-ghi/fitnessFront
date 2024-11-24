"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useUserStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const [selectedDate, setSelectedDate] = useState<{
    year: number;
    month: number;
    day: number;
  }>(() => {
    if (dateOfBirth && dateOfBirth instanceof Date) {
      return {
        year: dateOfBirth.getFullYear(),
        month: dateOfBirth.getMonth(),
        day: dateOfBirth.getDate(),
      };
    }
    const now = new Date();
    return {
      year: now.getFullYear(),
      month: now.getMonth(),
      day: now.getDate(),
    };
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
    setDateOfBirth(new Date(newDate.year, newDate.month, newDate.day));
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

      <Card className="p-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Year</label>
            <ScrollArea className="h-[200px] rounded-md border">
              <div className="p-2">
                {years.map((year) => (
                  <div
                    key={year}
                    className={`p-2 cursor-pointer rounded-lg transition-colors ${
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

          <div className="space-y-2">
            <label className="text-sm font-medium">Month</label>
            <ScrollArea className="h-[200px] rounded-md border">
              <div className="p-2">
                {months.map((month) => (
                  <div
                    key={month}
                    className={`p-2 cursor-pointer rounded-lg transition-colors ${
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

          <div className="space-y-2">
            <label className="text-sm font-medium">Day</label>
            <ScrollArea className="h-[200px] rounded-md border">
              <div className="p-2">
                {days.map((day) => (
                  <div
                    key={day}
                    className={`p-2 cursor-pointer rounded-lg transition-colors ${
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