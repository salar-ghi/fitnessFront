"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DietOnboarding } from "@/components/diet/diet-onboarding";

interface DietPlan {
  id: string;
  createdAt: string;
  duration: string;
  status: "active" | "completed" | "abandoned";
  goal: string;
  calories: number;
  restrictions: string[];
  meals: {
    type: string;
    foods: string[];
    calories: number;
  }[];
}

const mockDietPlans: DietPlan[] = [
  {
    id: "1",
    createdAt: "2024-03-10",
    duration: "Monthly",
    status: "active",
    goal: "Weight Loss",
    calories: 2000,
    restrictions: ["Gluten-free", "Low-carb"],
    meals: [
      {
        type: "Breakfast",
        foods: ["Oatmeal", "Banana", "Almonds"],
        calories: 450,
      },
      {
        type: "Lunch",
        foods: ["Grilled Chicken", "Quinoa", "Vegetables"],
        calories: 650,
      },
      {
        type: "Dinner",
        foods: ["Salmon", "Brown Rice", "Broccoli"],
        calories: 600,
      },
      {
        type: "Snacks",
        foods: ["Greek Yogurt", "Berries"],
        calories: 300,
      },
    ],
  },
  {
    id: "2",
    createdAt: "2024-02-15",
    duration: "Weekly",
    status: "completed",
    goal: "Muscle Gain",
    calories: 2800,
    restrictions: ["High-protein"],
    meals: [
      {
        type: "Breakfast",
        foods: ["Eggs", "Whole Grain Toast", "Avocado"],
        calories: 600,
      },
      {
        type: "Lunch",
        foods: ["Turkey Sandwich", "Sweet Potato", "Protein Shake"],
        calories: 800,
      },
      {
        type: "Dinner",
        foods: ["Steak", "Pasta", "Mixed Vegetables"],
        calories: 900,
      },
      {
        type: "Snacks",
        foods: ["Protein Bar", "Nuts"],
        calories: 500,
      },
    ],
  },
];

export default function DietPage() {
  const [isNewPlanOpen, setIsNewPlanOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<DietPlan | null>(null);

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-green-800 dark:text-green-100">
            My Diet Plans
          </h1>
          <Button 
            className="bg-green-600 hover:bg-green-700"
            onClick={() => setIsNewPlanOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Diet Plan
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="grid gap-4">
            {mockDietPlans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedPlan(plan)}
              >
                <Card className="p-6 cursor-pointer bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">
                            {new Date(plan.createdAt).toLocaleDateString()}
                          </h3>
                          <Badge
                            variant={
                              plan.status === "active"
                                ? "default"
                                : plan.status === "completed"
                                ? "secondary"
                                : "destructive"
                            }
                            className="capitalize"
                          >
                            {plan.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Duration: {plan.duration}
                        </p>
                        <p className="text-sm">
                          Goal: {plan.goal} • {plan.calories} calories/day
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {plan.meals.map((meal) => (
                        <Card key={meal.type} className="p-3 bg-white/50 dark:bg-gray-800/50">
                          <h4 className="font-medium text-sm mb-2">{meal.type}</h4>
                          <p className="text-xs text-muted-foreground mb-1">
                            {meal.calories} calories
                          </p>
                          <div className="text-xs text-muted-foreground">
                            {meal.foods.join(", ")}
                          </div>
                        </Card>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {plan.restrictions.map((restriction) => (
                        <Badge key={restriction} variant="outline" className="capitalize">
                          {restriction}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <Dialog open={isNewPlanOpen} onOpenChange={setIsNewPlanOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
          <DialogHeader className="p-4 pb-2">
            <DialogTitle>Create New Diet Plan</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[90vh]">
            <div className="p-6">
              <DietOnboarding onComplete={() => setIsNewPlanOpen(false)} />
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}