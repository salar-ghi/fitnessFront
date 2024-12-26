"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface BodyFatModelProps {
  gender: "male" | "female";
  bodyFat: number;
}

export function BodyFatModel({ gender, bodyFat }: BodyFatModelProps) {
  // Map body fat % to image index (1-6)
  const getImageIndex = () => {
    if (bodyFat <= 10) return 1;
    if (bodyFat <= 15) return 2;
    if (bodyFat <= 20) return 3;
    if (bodyFat <= 25) return 4;
    if (bodyFat <= 30) return 5;
    return 6;
  };

  const imageIndex = getImageIndex();
  const imageUrl = `https://images.unsplash.com/photo-${gender === "male" ? "1571019613454" : "1609899537878"}-${imageIndex}?w=400&h=600&fit=crop`;

  return (
    <motion.div
      className="relative w-64 h-96 mx-auto"
      animate={{ rotateY: 360 }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{ perspective: 1000 }}
    >
      <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
        <Image
          src={imageUrl}
          alt={`${gender} body fat ${bodyFat}%`}
          fill
          className="object-cover"
          priority
        />
      </div>
    </motion.div>
  );
}