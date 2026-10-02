import React, { useState } from "react";
import {
  CheckCircle2,
  Circle,
  Trophy,
  Rocket,
  GraduationCap,
  Briefcase,
  Target,
  Award,
} from "lucide-react";

const Roadmap = () => {
  const roadmapData = [
    {
      id: 1,
      title: "Course Enrollment",
      description:
        "Start your learning journey by enrolling in the selected career track.",
      icon: GraduationCap,
    },
    {
      id: 2,
      title: "Learning Modules",
      description:
        "Complete video lectures, notes, quizzes and assignments.",
      icon: Rocket,
    },
    {
      id: 3,
      title: "Assessment Exam",
      description:
        "Pass technical and aptitude assessments to unlock projects.",
      icon: Target,
    },
    {
      id: 4,
      title: "Industry Project",
      description:
        "Build real-world projects to strengthen your portfolio.",
      icon: Award,
    },
    {
      id: 5,
      title: "Hackathon Challenge",
      description:
        "Participate in coding and innovation challenges.",
      icon: Trophy,
    },
    {
      id: 6,
      title: "Internship Selection",
      description:
        "Become eligible for internship opportunities.",
      icon: Briefcase,
    },
    {
      id: 7,
      title: "Internship Completion",
      description:
        "Complete your internship successfully.",
      icon: Briefcase,
    },
    {
      id: 8,
      title: "Placement Assistance",
      description:
        "Access placement drives and hiring opportunities.",
      icon: CheckCircle2,
    },
  ];

  const [currentStep, setCurrentStep] = useState(1);

  const progress =
    ((currentStep - 1) /
      (roadmapData.length - 1)) *
    100;

  const completeStep = () => {
    if (
      currentStep <
      roadmapData.length
    ) {
      setCurrentStep(
        currentStep + 1
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white">
            Career Roadmap
          </h1>

          <p className="text-slate-400 mt-2">
            Track your journey from
            learning to placement.
          </p>
        </div>

        {/* Progress Card */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-12">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white font-semibold">
              Overall Progress
            </h2>

            <span className="text-orange-400 font-bold">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-700"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* Roadmap */}

        <div className="relative">

          {/* Vertical Line */}

          <div className="absolute left-8 top-0 bottom-0 w-1 bg-slate-800" />

          <div className="space-y-8">

            {roadmapData.map(
              (step, index) => {
                const Icon =
                  step.icon;

                const completed =
                  step.id <
                  currentStep;

                const active =
                  step.id ===
                  currentStep;

                return (
                  <div
                    key={step.id}
                    className="relative flex gap-6"
                  >
                    {/* Circle */}

                    <div
                      className={`z-10 h-16 w-16 rounded-full flex items-center justify-center border-4 ${
                        completed
                          ? "bg-green-500 border-green-500"
                          : active
                          ? "bg-orange-500 border-orange-500 animate-pulse"
                          : "bg-slate-900 border-slate-700"
                      }`}
                    >
                      <Icon
                        size={28}
                        className="text-white"
                      />
                    </div>

                    {/* Card */}

                    <div
                      className={`flex-1 rounded-3xl p-6 border transition-all ${
                        active
                          ? "bg-orange-500/10 border-orange-500"
                          : completed
                          ? "bg-green-500/10 border-green-500"
                          : "bg-slate-900 border-slate-800"
                      }`}
                    >
                      <div className="flex justify-between items-center">

                        <div>
                          <h3 className="text-xl font-semibold text-white">
                            {step.title}
                          </h3>

                          <p className="text-slate-400 mt-2">
                            {
                              step.description
                            }
                          </p>
                        </div>

                        <div>
                          {completed ? (
                            <CheckCircle2
                              className="text-green-400"
                              size={30}
                            />
                          ) : (
                            <Circle
                              className="text-slate-600"
                              size={30}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* Action Section */}

        <div className="mt-12 flex flex-col md:flex-row gap-4">

          <button
            onClick={
              completeStep
            }
            disabled={
              currentStep ===
              roadmapData.length
            }
            className="px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all disabled:opacity-50"
          >
            Complete Current Step
          </button>

          <div className="bg-slate-900 border border-slate-800 rounded-xl px-6 py-4 flex items-center">
            <span className="text-slate-400">
              Current Stage:
            </span>

            <span className="ml-2 text-orange-400 font-semibold">
              {
                roadmapData[
                  currentStep -
                    1
                ]?.title
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;