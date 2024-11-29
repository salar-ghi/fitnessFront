"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface DietPlan {
  id: string;
  createdAt: string;
  duration: string;
  status: "active" | "completed" | "abandoned";
  goal: string;
  calories: number;
  restrictions: string[];
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
  },
  {
    id: "2",
    createdAt: "2024-02-15",
    duration: "Weekly",
    status: "completed",
    goal: "Muscle Gain",
    calories: 2800,
    restrictions: ["High-protein"],
  },
];

export default function DietPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Diet Plans</h1>
        <Link href="/diet/new">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            New Diet Plan
          </Button>
        </Link>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="grid gap-4">
          {mockDietPlans.map((plan) => (
            <Card key={plan.id} className="p-4">
              <div className="flex items-start justify-between">
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
                  <div className="flex flex-wrap gap-1 mt-2">
                    {plan.restrictions.map((restriction) => (
                      <Badge key={restriction} variant="outline">
                        {restriction}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button variant="ghost" className="text-green-600">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}