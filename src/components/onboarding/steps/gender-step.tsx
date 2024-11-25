"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useUserStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function GenderStep() {
  const { gender, setGender, nextStep } = useUserStore();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center text-green-800 dark:text-green-100">
        Select Your Gender
      </h2>
      <div className="grid grid-cols-2 gap-3 max-w-s mx-auto">
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Card
            className={`p-3 cursor-pointer ${
              gender === "male"
                ? "border-green-500 bg-green-50 dark:bg-green-900"
                : ""
            }`}
            onClick={() => setGender("male")}
          >
            <div className="aspect-square relative mb-4">
              <Image
                src="/images/man.jpg"
                alt="Male"
                //width={350}
                //height={500}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h3 className="text-center text-sm font-medium">Male</h3>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Card
            className={`p-3 cursor-pointer ${
              gender === "female"
                ? "border-green-500 bg-green-50 dark:bg-green-900"
                : ""
            }`}
            onClick={() => setGender("female")}
          >
            <div className="aspect-square relative mb-4">
              <Image
                src="/images/woman 1.jpg"
                alt="Female"
                //width={350}
                //height={500}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h3 className="text-center text-sm font-medium">Female</h3>
          </Card>
        </motion.div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={nextStep}
          disabled={!gender}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Next
        </Button>
      </div>
    </div>
  );
}