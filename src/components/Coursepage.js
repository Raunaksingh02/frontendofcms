import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  BookOpen,
  Video,
  IndianRupee,
  ArrowRight,
  GraduationCap,
  Sparkles,
  Loader2,
  AlertTriangle,
} from "lucide-react";

const Coursepage = ({
  setActiveScreen,
  setSelectedCourse,
}) => {
  const [courses, setCourses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchCourses =
    async () => {
      try {
        setLoading(true);

        const { data } =
          await axios.get(
            "http://localhost:5001/api/course/all"
          );

        if (data.success) {
          setCourses(
            data.courses
          );
        }
      } catch (error) {
        console.log(error);

        setError(
          error.response?.data
            ?.message ||
            "Failed to fetch courses"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-orange-500 mx-auto mb-4" />

          <h2 className="text-2xl font-bold text-white">
            Loading Courses...
          </h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <AlertTriangle className="w-20 h-20 text-red-500 mx-auto mb-4" />

          <h2 className="text-2xl font-bold text-red-400">
            {error}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white">
      {/* HERO */}

      <div className="mb-12">
        <div className="flex flex-col lg:flex-row lg:items-center gap-5">
          <div className="w-20 h-20 rounded-3xl bg-orange-500/20 border border-orange-500/20 flex items-center justify-center">
            <GraduationCap className="w-10 h-10 text-orange-400" />
          </div>

          <div>
            <h1 className="text-4xl lg:text-5xl font-black">
              Explore Courses
            </h1>

            <p className="text-slate-400 mt-2">
              Learn industry-ready
              skills with premium
              professional courses.
            </p>
          </div>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-400">
                  Total Courses
                </p>

                <h2 className="text-4xl font-black mt-2">
                  {
                    courses.length
                  }
                </h2>
              </div>

              <BookOpen className="w-12 h-12 text-orange-400" />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-400">
                  Total Videos
                </p>

                <h2 className="text-4xl font-black mt-2">
                  {courses.reduce(
                    (
                      total,
                      course
                    ) =>
                      total +
                      (
                        course
                          .videos
                          ?.length ||
                        0
                      ),
                    0
                  )}
                </h2>
              </div>

              <Video className="w-12 h-12 text-orange-400" />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-400">
                  Learning Platform
                </p>

                <h2 className="text-3xl font-black mt-2">
                  PAP
                </h2>
              </div>

              <Sparkles className="w-12 h-12 text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* COURSES */}

      {courses.length === 0 ? (
        <div className="text-center py-20">
          <BookOpen className="w-20 h-20 text-slate-700 mx-auto mb-5" />

          <h2 className="text-3xl font-bold">
            No Courses Found
          </h2>

          <p className="text-slate-400 mt-3">
            Upload your first
            course to start your
            LMS.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {courses.map(
            (course) => (
              <div
                key={
                  course._id
                }
                className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-orange-500/40 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    src={
                      course
                        .poster
                        ?.url ||
                      "https://via.placeholder.com/400x250"
                    }
                    alt={
                      course.title
                    }
                    className="w-full h-60 object-cover"
                  />

                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-500 px-4 py-2 rounded-full text-sm font-semibold">
                      {
                        course.category
                      }
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Video className="w-5 h-5 text-orange-400" />

                      <span>
                        {
                          course
                            .videos
                            ?.length
                        }{" "}
                        Lectures
                      </span>
                    </div>

                    
                  </div>

                  <h2 className="text-2xl font-bold mb-3 line-clamp-2">
                    {
                      course.title
                    }
                  </h2>

                  <p className="text-slate-400 line-clamp-3 mb-6">
                    {
                      course.description
                    }
                  </p>

                  <button
                    onClick={() => {
                      setSelectedCourse(
                        course
                      );

                      setActiveScreen(
                        "Coursedetail"
                      );
                    }}
                    className="w-full bg-orange-500 hover:bg-orange-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all"
                  >
                    View Course

                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Coursepage;