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
    description: "Lean and long, difficulty gaining weight",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=500&h=500&fit=crop",
  },
  {
    type: "mesomorph",
    title: "Mesomorph",
    description: "Athletic and muscular, gains muscle easily",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&h=500&fit=crop",
  },
  {
    type: "endomorph",
    title: "Endomorph",
    description: "Bigger bone structure, higher body fat",
    image: "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=500&h=500&fit=crop",
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bodyTypes.map((type) => (
          <motion.div
            key={type.type}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card
              className={`p-4 cursor-pointer ${
                bodyType === type.type
                  ? "border-green-500 bg-green-50 dark:bg-green-900"
                  : ""
              }`}
              onClick={() => setBodyType(type.type)}
            >
              <div className="aspect-square relative mb-4">
                <Image
                  src={type.image}
                  alt={type.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="font-medium text-center mb-2">{type.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                {type.description}
              </p>
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