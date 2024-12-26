"use client";

import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface BodyPartSliderProps {
  id: string;
  label: string;
  image: string;
  value: number;
  onChange: (value: number) => void;
}

export function BodyPartSlider({ id, label, image, value, onChange }: BodyPartSliderProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={label}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1">
        <Label className="text-sm font-medium">{label}</Label>
        <div className="flex items-center gap-4 mt-2">
          <Slider
            value={[value || 0]}
            onValueChange={(values) => onChange(values[0])}
            max={100}
            step={5}
            className="flex-1"
          />
          <span className="text-sm font-medium w-12">
            {value || 0}%
          </span>
        </div>
      </div>
    </div>
  );
}