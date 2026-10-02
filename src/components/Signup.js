import {
  GraduationCap,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Briefcase,
  Award,
  Users,
} from "lucide-react";

import { useState } from "react";

export default function SignupPage() {
  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  return (
  <div className="min-h-screen bg-slate-950 overflow-hidden relative">
    
    {/* BACKGROUND */}

    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/10 blur-[180px]" />

    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-500/10 blur-[180px]" />

    <div
      className="
      relative
      z-10
      max-w-[1600px]
      mx-auto
      min-h-screen
      grid
      lg:grid-cols-[58%_42%]
      "
    >
      {/* LEFT SIDE */}

      <div
        className="
        hidden
        lg:flex
        justify-center
        px-14
        xl:px-20
        "
      >
        <div className="max-w-2xl pt-24">
          {/* LOGO */}

          <div className="flex items-center gap-4 mb-8">
            <div
              className="
              w-16
              h-16
              rounded-2xl
              bg-orange-500
              flex
              items-center
              justify-center
              shadow-lg
              shadow-orange-500/30
              "
            >
              <GraduationCap
                size={30}
                className="text-white"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                SkillRise LMS
              </h2>

              <p className="text-slate-400">
                Learn • Intern • Get Hired
              </p>
            </div>
          </div>

          {/* HEADING */}

          <h1
            className="
            text-6xl
            font-bold
            text-white
            leading-[1.05]
            "
          >
            Build Skills.
            <br />

            Get Internship.
            <br />

            <span className="text-orange-500">
              Launch Career.
            </span>
          </h1>

          {/* DESCRIPTION */}

          <p
            className="
            mt-5
            text-lg
            text-slate-400
            leading-relaxed
            max-w-xl
            "
          >
            Learn from industry experts,
            complete internship programs,
            earn certificates and unlock
            placement opportunities through
            one unified career platform.
          </p>

          {/* STATS */}

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div
              className="
              bg-slate-900/70
              border
              border-slate-800
              rounded-2xl
              p-5
              "
            >
              <Users
                className="text-orange-500 mb-3"
                size={24}
              />

              <h3 className="text-3xl font-bold text-white">
                10K+
              </h3>

              <p className="text-slate-400 text-sm">
                Students
              </p>
            </div>

            <div
              className="
              bg-slate-900/70
              border
              border-slate-800
              rounded-2xl
              p-5
              "
            >
              <Briefcase
                className="text-orange-500 mb-3"
                size={24}
              />

              <h3 className="text-3xl font-bold text-white">
                500+
              </h3>

              <p className="text-slate-400 text-sm">
                Internships
              </p>
            </div>

            <div
              className="
              bg-slate-900/70
              border
              border-slate-800
              rounded-2xl
              p-5
              "
            >
              <Award
                className="text-orange-500 mb-3"
                size={24}
              />

              <h3 className="text-3xl font-bold text-white">
                250+
              </h3>

              <p className="text-slate-400 text-sm">
                Hiring Partners
              </p>
            </div>
          </div>

          {/* FEATURES */}

          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-orange-500" />

              <span className="text-slate-300">
                Industry Ready Internship Programs
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-orange-500" />

              <span className="text-slate-300">
                Placement Assistance & Career Support
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-orange-500" />

              <span className="text-slate-300">
                Certificates & Skill Assessments
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div
        className="
        flex
        items-center
        justify-center
        p-5
        lg:p-8
        "
      >
        <div className="w-full max-w-[500px]">
          {/* Signup Card Here */}
        </div>
      </div>
    </div>
  </div>

  );
}