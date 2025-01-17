"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BodyPartCardProps {
  id: string;
  label: string;
  description: string;
  subParts: string[];
  isSelected: boolean;
  onToggle: (id: string) => void;
  condition: string;
  subPart: string;
  onConditionChange: (id: string, condition: string) => void;
  onSubPartChange: (id: string, subPart: string) => void;
}

export function BodyPartCard({
  id,
  label,
  description,
  subParts,
  isSelected,
  onToggle,
  condition,
  subPart,
  onConditionChange,
  onSubPartChange,
}: BodyPartCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="p-4 space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            id={id}
            checked={isSelected}
            onCheckedChange={() => onToggle(id)}
            className="mt-1 border-green-500 data-[state=checked]:bg-green-500"
          />
          <div className="space-y-1 flex-1">
            <Label htmlFor={id} className="font-medium">
              {label}
            </Label>
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          </div>
        </div>

        {isSelected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 pl-7"
          >
            <Select
              value={subPart}
              onValueChange={(value) => onSubPartChange(id, value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select specific area" />
              </SelectTrigger>
              <SelectContent>
                {subParts.map((part) => (
                  <SelectItem key={part} value={part}>
                    {part}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Textarea
              placeholder="Describe your condition or injury..."
              value={condition}
              onChange={(e) => onConditionChange(id, e.target.value)}
              className="h-20 resize-none"
            />
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}