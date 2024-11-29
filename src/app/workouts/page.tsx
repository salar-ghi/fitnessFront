"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface WorkoutPlan {
  id: string;
  createdAt: string;
  duration: string;
  status: "active" | "completed" | "abandoned";
  targetMuscles: string[];
  schedule: string[];
}

const mockWorkoutPlans: WorkoutPlan[] = [
  {
    id: "1",
    createdAt: "2024-03-10",
    duration: "Weekly",
    status: "active",
    targetMuscles: ["chest", "back", "legs"],
    schedule: ["Monday", "Wednesday", "Friday"],
  },
  {
    id: "2",
    createdAt: "2024-02-15",
    duration: "Monthly",
    status: "completed",
    targetMuscles: ["shoulders", "arms", "core"],
    schedule: ["Tuesday", "Thursday", "Saturday"],
  },
];

export default function WorkoutsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Workout Plans</h1>
        <Link href="/onboarding">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            New Plan
          </Button>
        </Link>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="grid gap-4">
          {mockWorkoutPlans.map((plan) => (
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
                  <div className="flex flex-wrap gap-1 mt-2">
                    {plan.targetMuscles.map((muscle) => (
                      <Badge key={muscle} variant="outline">
                        {muscle}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {plan.schedule.map((day) => (
                      <Badge key={day} variant="outline" className="bg-green-50">
                        {day}
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