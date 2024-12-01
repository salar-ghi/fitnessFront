"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { 
  AreaChart, 
  Area, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Dumbbell, Apple, Trophy, Lightbulb, Target, Heart } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { TipsGrid } from "@/components/dashboard/tips-grid";

const planData = [
  { name: "Jan", workouts: 4, diets: 2 },
  { name: "Feb", workouts: 3, diets: 1 },
  { name: "Mar", workouts: 5, diets: 3 },
  { name: "Apr", workouts: 6, diets: 4 },
];

const progressData = [
  { name: "Week 1", progress: 85 },
  { name: "Week 2", progress: 92 },
  { name: "Week 3", progress: 78 },
  { name: "Week 4", progress: 95 },
];

const goalDistribution = [
  { name: "Weight Loss", value: 35 },
  { name: "Muscle Gain", value: 25 },
  { name: "Endurance", value: 20 },
  { name: "Flexibility", value: 20 },
];

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ec4899"];

export default function Home() {
  return (
    <div className="container mx-auto w-full p-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="xl:col-span-2"
        >
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Plan Generation History</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={planData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="workouts"
                    stackId="1"
                    stroke="#22c55e"
                    fill="#22c55e"
                    fillOpacity={0.3}
                    name="Workout Plans"
                  />
                  <Area
                    type="monotone"
                    dataKey="diets"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.3}
                    name="Diet Plans"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Goal Distribution</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={goalDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {goalDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="xl:col-span-2"
        >
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Weekly Progress</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="progress" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="grid gap-6">
            <StatsCard
              title="Active Plans"
              stats={[
                { label: "Workout Plans", value: "2", icon: Dumbbell, color: "green" },
                { label: "Diet Plans", value: "1", icon: Apple, color: "blue" }
              ]}
            />
            <StatsCard
              title="Goals Achieved"
              stats={[
                { label: "This Month", value: "85%", icon: Target, color: "purple" },
                { label: "Overall", value: "92%", icon: Trophy, color: "amber" }
              ]}
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6"
      >
        <TipsGrid />
      </motion.div>
    </div>
  );
}