"use client";

import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";

interface FatPercentageSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function FatPercentageSlider({ value, onChange }: FatPercentageSliderProps) {
  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <span className="text-sm font-medium">Body Fat Percentage</span>
        <span className="text-2xl font-bold text-green-600">{value}%</span>
      </motion.div>
      
      <Slider
        value={[value]}
        onValueChange={([newValue]) => onChange(newValue)}
        min={5}
        max={40}
        step={1}
        className="py-4"
      />
      
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>5%</span>
        <span>40%</span>
      </div>
    </div>
  );
}