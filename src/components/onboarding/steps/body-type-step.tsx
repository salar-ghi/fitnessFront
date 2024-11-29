"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useUserStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const bodyTypes = [
  {
    type: "ectomorph",
    title: "Ectomorph",
    description: "Lean and long",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=300&h=300&fit=crop",
  },
  {
    type: "mesomorph",
    title: "Mesomorph",
    description: "Athletic build",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&h=300&fit=crop",
  },
  {
    type: "endomorph",
    title: "Endomorph",
    description: "Broader frame",
    image: "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=300&h=300&fit=crop",
  },
] as const;

export function BodyTypeStep() {
  const { bodyType, setBodyType, nextStep, previousStep } = useUserStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-green-800 dark:text-green-100">
        Select Your Body Type
      </h2>

      <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
        {bodyTypes.map((type) => (
          <motion.div
            key={type.type}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`aspect-square cursor-pointer overflow-hidden ${
                bodyType === type.type
                  ? "ring-2 ring-green-500"
                  : "hover:shadow-md"
              }`}
              onClick={() => setBodyType(type.type)}
            >
              <div className="relative h-2/3">
                <Image
                  src={type.image}
                  alt={type.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 h-1/3 flex flex-col items-center justify-center text-center">
                <h3 className="text-sm font-medium mb-1">{type.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {type.description}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

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
          disabled={!bodyType}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
}