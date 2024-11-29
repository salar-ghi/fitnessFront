import { Onboarding } from "@/components/onboarding/onboarding";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-green-800 dark:text-green-100 mb-8">
          Fitness Workout Generator
        </h1>
        <Onboarding />
      </div>
    </main>
  );
}
