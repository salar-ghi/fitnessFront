"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadialBarChart,
  RadialBar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Dumbbell, Apple, Trophy, Target, Flame, Heart } from "lucide-react";

const fitnessProgress = [
  { name: "Strength", value: 85 },
  { name: "Endurance", value: 70 },
  { name: "Flexibility", value: 60 },
  { name: "Balance", value: 75 },
  { name: "Speed", value: 65 },
];

const calorieData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  calories: Math.floor(Math.sin(i / 3) * 300 + 500),
  target: 400,
}));

const weeklyActivity = [
  { day: "Mon", workout: 75, nutrition: 85 },
  { day: "Tue", workout: 90, nutrition: 80 },
  { day: "Wed", workout: 65, nutrition: 90 },
  { day: "Thu", workout: 85, nutrition: 75 },
  { day: "Fri", workout: 70, nutrition: 85 },
  { day: "Sat", workout: 95, nutrition: 70 },
  { day: "Sun", workout: 60, nutrition: 95 },
];

const tips = [
  {
    title: "Stay Consistent",
    description: "Build habits that last by maintaining a regular schedule.",
    icon: Trophy,
    color: "from-green-400 to-emerald-600",
  },
  {
    title: "Track Progress",
    description: "Monitor your journey and celebrate small victories.",
    icon: Target,
    color: "from-blue-400 to-indigo-600",
  },
  {
    title: "Balanced Diet",
    description: "Fuel your body with the right nutrients for optimal performance.",
    icon: Apple,
    color: "from-purple-400 to-pink-600",
  },
  {
    title: "Heart Health",
    description: "Keep your cardiovascular system strong with regular exercise.",
    icon: Heart,
    color: "from-red-400 to-rose-600",
  },
];

export default function Home() {
  return (
    <div className="space-y-8 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-green-800 dark:text-green-100">
              Daily Energy Expenditure
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={calorieData}>
                  <defs>
                    <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="calories"
                    stroke="#22c55e"
                    fillOpacity={1}
                    fill="url(#colorCalories)"
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#3b82f6"
                    strokeDasharray="5 5"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-100">
              Fitness Balance
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={fitnessProgress}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Progress"
                    dataKey="value"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-3"
        >
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-purple-800 dark:text-purple-100">
              Weekly Performance
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyActivity}>
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="workout"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={{ fill: "#22c55e" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="nutrition"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, index) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
            >
              <div className={`bg-gradient-to-br ${tip.color} rounded-2xl p-6 shadow-lg h-full`}>
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 bg-white/20 rounded-full">
                    <tip.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{tip.title}</h3>
                  <p className="text-white/90">{tip.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}