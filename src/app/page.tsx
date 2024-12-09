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
import { TipsGrid } from "@/components/dashboard/tips-grid";
import { StatsCard } from "@/components/dashboard/stats-card";


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

const workoutData = [
  { name: "Mon", workouts: 3 },
  { name: "Tue", workouts: 4 },
  { name: "Wed", workouts: 2 },
  { name: "Thu", workouts: 5 },
  { name: "Fri", workouts: 3 },
  { name: "Sat", workouts: 4 },
  { name: "Sun", workouts: 2 },
];

const dietData = [
  { name: "Protein", value: 35 },
  { name: "Carbs", value: 40 },
  { name: "Fats", value: 25 },
];

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ec4899"];
// const COLORS = ['#10B981', '#6366F1', '#F59E0B'];

export default function Home() {
  return (
    <div className="container mx-auto min-w-full p-2 lg:p-4 xl:p-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Plan Generation History */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="xl:col-span-2">
          <Card className="py-4 xl:py-6 xl:pr-6">
            <h2 className="text-md font-semibold mb-4 pl-2 lg:pl-4 xl:pl-6">Plan Generation History</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%" className="font-semibold text-sm pt-2 -ml-6 -mr-4 xl:mr-0 xl:-ml-4">
                <AreaChart data={planData} className="">
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
                    className="text-green-500 text-sm font-semibold"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} >
          <Card className="py-4 xl:py-6 xl:pr-6">
            <h2 className="text-md font-semibold mb-4 pl-2 lg:pl-4 xl:pl-6">Goal Distribution</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%" className="font-semibold text-sm pt-2 -ml-6 -mr-4 xl:mr-0 xl:-ml-4">
                <PieChart>
                  <Pie data={goalDistribution} cx="50%" cy="50%"
                    innerRadius={60} outerRadius={80}
                    fill="#8884d8" paddingAngle={5} dataKey="value" label>
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

        {/* Weekly Workout Progress */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="xl:col-span-2" >
          <Card className="py-4 xl:py-6 xl:pr-6">
            <h3 className="text-md font-semibold mb-4 pl-2 lg:pl-4 xl:pl-6">Weekly Workout Progress</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%" className="font-semibold text-sm pt-2 -ml-6 -mr-4 xl:mr-0 xl:-ml-4">
                <BarChart data={workoutData} className="text-sm font-semibold">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" className="font-semibold text-sm "/>
                  <YAxis className="font-serif bg-slate-900  text-sm" />
                  <Tooltip />
                  <Bar dataKey="workouts" fill="#10B981" className="text-green-500 text-sm font-semibold" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }} >
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Nutrition Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={dietData} cx="50%" cy="50%"
                    innerRadius={60} outerRadius={80} 
                    fill="#8884d8" paddingAngle={5} dataKey="value" label>
                    {dietData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  {/* <Tooltip content={<CustomTooltip className="bg-white text-black rounded-sm shadow-sm p-2" />} />                   */}
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="xl:col-span-2" >
          <Card className="py-4 xl:py-6 xl:pr-6">
            <h3 className="text-md font-semibold mb-4 pl-2 lg:pl-4 xl:pl-6">Active Plans</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%" className="font-semibold text-sm pt-2 -ml-6 -mr-4 xl:mr-0 xl:-ml-4">
                <AreaChart data={workoutData} className="text-sm font-semibold">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" className="font-semibold text-sm "/>
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="workouts" stroke="#10B981" fill="#10B981" className="text-green-500 text-sm font-semibold"/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }} >
          <div className="grid gap-6">
            <StatsCard />
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