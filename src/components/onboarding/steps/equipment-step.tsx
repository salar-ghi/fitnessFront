"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useUserStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

const equipmentList = [
  {
    id: "dumbbell",
    label: "Dumbbells",
    description: "Free weights for strength training",
    image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=300&h=300&fit=crop",
  },
  {
    id: "barbell",
    label: "Barbell",
    description: "For compound exercises",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=300&h=300&fit=crop",
  },
  {
    id: "smith-machine",
    label: "Smith Machine",
    description: "Guided barbell exercises",
    image: "https://images.unsplash.com/photo-1632167764165-74a3d686e9f8?w=300&h=300&fit=crop",
  },
  {
    id: "cable-machine",
    label: "Cable Machine",
    description: "For resistance training",
    image: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=300&h=300&fit=crop",
  },
  {
    id: "bodyweight",
    label: "Bodyweight",
    description: "No equipment needed",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
  },
  {
    id: "resistance-bands",
    label: "Resistance Bands",
    description: "Portable resistance training",
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=300&h=300&fit=crop",
  },
] as const;

export function EquipmentStep() {
  const { location, equipment, toggleEquipment, nextStep, previousStep } =
    useUserStore();

  const isGym = location === "gym";

  const filteredEquipment = isGym
    ? equipmentList
    : equipmentList.filter((eq) =>
        ["bodyweight", "resistance-bands", "dumbbell"].includes(eq.id)
      );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold text-center text-green-800 dark:text-green-100">
        What equipment do you have?
      </h2>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="grid grid-cols-2 gap-2 px-2 py-2 max-w-xs mx-auto">
          {filteredEquipment.map((eq) => (
            <motion.div
              key={eq.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`aspect-square overflow-hidden cursor-pointer transition-all ${
                  equipment.includes(eq.id)
                    ? "ring-2 ring-green-500"
                    : "hover:shadow-lg"
                }`}
                onClick={() => toggleEquipment(eq.id)}
              >
                <div className="relative h-2/3">
                  <Image
                    src={eq.image}
                    alt={eq.label}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-2 h-1/3">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id={eq.id}
                      checked={equipment.includes(eq.id)}
                      className="mt-1 border-green-500 data-[state=checked]:bg-green-500"
                    />
                    <div>
                      <label htmlFor={eq.id} className="text-xs font-medium">
                        {eq.label}
                      </label>
                      <p className="text-[10px] text-gray-600 dark:text-gray-300 line-clamp-2">
                        {eq.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      <div className="flex justify-between mt-4 px-2">
        <Button
          onClick={previousStep}
          variant="outline"
          className="border-green-600 text-green-600"
        >
          Back
        </Button>
        <Button
          onClick={nextStep}
          disabled={equipment.length === 0}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
}