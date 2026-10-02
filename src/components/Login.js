import {
  GraduationCap,
  Briefcase,
  Award,
  Eye,
  EyeOff,
  Mail,
  Lock,
} from "lucide-react";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await axios.post(
          "http://localhost:5001/api/applicant/login",
          {
            email,
            password,
          }
        );

      if (response.data.success) {
        const expiryDate =
          new Date();

        expiryDate.setDate(
          expiryDate.getDate() + 7
        );

        localStorage.setItem(
          "applicantAuth",
          JSON.stringify({
            applicantId:
              response.data
                .applicantId,

            expiresAt:
              expiryDate.getTime(),
          })
        );

        navigate(
          `/profile`
        );
      }
    } catch (error) {
      alert(
        error?.response?.data
          ?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* LEFT SECTION */}

        <div className="hidden lg:flex relative items-center justify-center p-12">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/20 blur-[150px]" />

          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/20 blur-[150px]" />

          <div className="max-w-xl relative z-10">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="h-14 w-14 rounded-2xl bg-orange-500 flex items-center justify-center">
                <GraduationCap className="text-white" />
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

            <h1 className="text-5xl font-bold text-white leading-tight">
              Turn Skills Into
              <span className="text-orange-500 block">
                Career Success
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-400 leading-relaxed">
              Access industry-ready
              courses, internships,
              hackathons,
              certifications and
              placement opportunities
              from one platform.
            </p>

            <div className="grid grid-cols-3 gap-4 mt-10">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <h3 className="text-3xl font-bold text-orange-500">
                  10K+
                </h3>

                <p className="text-slate-400 text-sm">
                  Students
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <h3 className="text-3xl font-bold text-orange-500">
                  500+
                </h3>

                <p className="text-slate-400 text-sm">
                  Internships
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <h3 className="text-3xl font-bold text-orange-500">
                  250+
                </h3>

                <p className="text-slate-400 text-sm">
                  Hiring Partners
                </p>
              </div>
            </div>

            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-4">
                <Briefcase className="text-orange-500" />

                <span className="text-slate-300">
                  Guaranteed Internship
                  Tracks
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Award className="text-orange-500" />

                <span className="text-slate-300">
                  Industry Certificates
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}

        <div className="flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white">
                  Welcome Back
                </h2>

                <p className="text-slate-400 mt-2">
                  Sign in to continue
                  learning
                </p>
              </div>

              <form
                onSubmit={
                  handleLogin
                }
                className="space-y-5"
              >
                <div>
                  <label className="text-slate-300 text-sm">
                    Email
                  </label>

                  <div className="relative mt-2">
                    <Mail
                      size={18}
                      className="absolute left-4 top-4 text-slate-500"
                    />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(
                          e.target
                            .value
                        )
                      }
                      placeholder="Enter email"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 text-sm">
                    Password
                  </label>

                  <div className="relative mt-2">
                    <Lock
                      size={18}
                      className="absolute left-4 top-4 text-slate-500"
                    />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={
                        password
                      }
                      onChange={(e) =>
                        setPassword(
                          e.target
                            .value
                        )
                      }
                      placeholder="Enter password"
                      required
                      className="w-full pl-12 pr-12 py-4 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-orange-500"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="absolute right-4 top-4 text-slate-400"
                    >
                      {showPassword ? (
                        <EyeOff
                          size={18}
                        />
                      ) : (
                        <Eye
                          size={18}
                        />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <label className="flex items-center gap-2 text-slate-400">
                    <input type="checkbox" />
                    Remember me
                  </label>

                  <button
                    type="button"
                    className="text-orange-500"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={
                    loading
                  }
                  className="
                  w-full
                  py-4
                  rounded-xl
                  bg-orange-500
                  hover:bg-orange-600
                  text-white
                  font-semibold
                  transition
                  disabled:opacity-50
                  "
                >
                  {loading
                    ? "Signing In..."
                    : "Login"}
                </button>

                <div className="text-center">
                  <span className="text-slate-400">
                    Don't have an
                    account?
                  </span>

                  <button
                    type="button"
                    className="ml-2 text-orange-500"
                    onClick={() =>
                      navigate(
                        "/register"
                      )
                    }
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}