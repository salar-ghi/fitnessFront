"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useUserStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const bodyTypes = [
  {
    type: "athletic",
    title: "Athletic",
    description: "Lean and muscular",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&h=300&fit=crop",
  },
  {
    type: "lean",
    title: "Lean",
    description: "Slim and toned",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=300&h=300&fit=crop",
  },
  {
    type: "muscular",
    title: "Muscular",
    description: "Strong and built",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&h=300&fit=crop",
  },
  {
    type: "balanced",
    title: "Balanced",
    description: "Proportionate and fit",
    image: "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=300&h=300&fit=crop",
  },
] as const;

export function DesiredPhysiqueStep() {
  const { desiredPhysique, setDesiredPhysique, nextStep, previousStep } = useUserStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold text-center text-green-800 dark:text-green-100">
        What's Your Goal Physique?
      </h2>
      <p className="text-sm text-center text-muted-foreground">
        Choose the body type you'd like to achieve
      </p>

      <div className="grid grid-cols-2 gap-4">
        {bodyTypes.map((type) => (
          <motion.div
            key={type.type}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`overflow-hidden cursor-pointer ${
                desiredPhysique === type.type
                  ? "ring-2 ring-green-500"
                  : "hover:shadow-md"
              }`}
              onClick={() => setDesiredPhysique(type.type)}
            >
              <div className="relative h-40">
                <Image
                  src={type.image}
                  alt={type.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium">{type.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {type.description}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <Button
          onClick={previousStep}
          variant="outline"
          className="border-green-600 text-green-600"
        >
          Previous
        </Button>
        <Button
          onClick={nextStep}
          disabled={!desiredPhysique}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
}