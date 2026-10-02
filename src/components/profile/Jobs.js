import React, { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  Building2,
  IndianRupee,
  Clock3,
  Users,
  GraduationCap,
  Filter,
  TrendingUp,
  Star,
  Award,
  ChevronDown,
} from "lucide-react";

import jobsData from "./Jobsdata";

const Jobs = () => {
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("All");
  const [mode, setMode] = useState("All");

  const filteredJobs = useMemo(() => {
    return jobsData.filter((job) => {
      const searchMatch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase());

      const typeMatch =
        jobType === "All" ? true : job.type === jobType;

      const modeMatch =
        mode === "All" ? true : job.mode === mode;

      return searchMatch && typeMatch && modeMatch;
    });
  }, [search, jobType, mode]);

  const stats = [
    {
      title: "Active Jobs",
      value: "5,000+",
      icon: Briefcase,
    },
    {
      title: "Hiring Companies",
      value: "750+",
      icon: Building2,
    },
    {
      title: "Students Placed",
      value: "12,500+",
      icon: GraduationCap,
    },
    {
      title: "Average Package",
      value: "₹6.5 LPA",
      icon: TrendingUp,
    },
  ];

  const categories = [
    "Software",
    "Marketing",
    "HR",
    "Finance",
    "Sales",
    "Data Science",
    "UI/UX",
    "Cyber Security",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* HERO */}

      <div className="relative overflow-hidden border-b border-slate-800">

        


        

      </div>

      {/* STATS */}

      {/* SEARCH SECTION */}

      <div className="max-w-7xl mx-auto px-4">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5">

          <div className="grid lg:grid-cols-4 gap-4">

            <div className="lg:col-span-2 relative">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search jobs, companies..."
                className="
                w-full
                bg-slate-950
                border
                border-slate-700
                rounded-xl
                h-12
                pl-11
                px-4
                outline-none
                focus:border-orange-500
                "
              />
            </div>

            <select
              value={jobType}
              onChange={(e) =>
                setJobType(e.target.value)
              }
              className="
              h-12
              rounded-xl
              bg-slate-950
              border
              border-slate-700
              px-4
              "
            >
              <option>All</option>
              <option>Full Time</option>
              <option>Internship</option>
              <option>Part Time</option>
            </select>

            <select
              value={mode}
              onChange={(e) =>
                setMode(e.target.value)
              }
              className="
              h-12
              rounded-xl
              bg-slate-950
              border
              border-slate-700
              px-4
              "
            >
              <option>All</option>
              <option>Remote</option>
              <option>Hybrid</option>
              <option>Onsite</option>
            </select>

          </div>

          {/* CATEGORY CHIPS */}

          <div className="flex flex-wrap gap-3 mt-6">

            {categories.map((item) => (
              <button
                key={item}
                className="
                px-4
                py-2
                rounded-full
                bg-slate-800
                hover:bg-orange-500
                transition-all
                text-sm
                "
              >
                {item}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* RESULTS HEADER */}

      <div className="max-w-7xl mx-auto px-4 mt-8">

        <div className="flex justify-between items-center">

          <div>

            <h2 className="text-2xl font-bold">
              Available Opportunities
            </h2>

            <p className="text-slate-400 mt-1">
              {filteredJobs.length} jobs found
            </p>

          </div>

          <button
            className="
            flex
            items-center
            gap-2
            px-4
            py-2
            rounded-xl
            bg-slate-900
            border
            border-slate-800
            "
          >
            Sort By
            <ChevronDown size={16} />
          </button>

        </div>
      </div>

      {/* JOB GRID */}

      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* YOUR EXISTING JOB CARD CODE HERE */}

         
{filteredJobs.map((job) => (
  <div
    key={job.id}
    className="
      group
      h-full
      flex
      flex-col
      bg-gradient-to-br
      from-slate-900
      via-slate-900
      to-slate-950
      border
      border-slate-800
      hover:border-orange-500/40
      rounded-3xl
      overflow-hidden
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      hover:shadow-orange-500/10
    "
  >
    <div className="h-1.5 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400" />

    <div className="p-5 flex flex-col h-full">

      <div className="flex justify-between gap-4">

        <div className="flex gap-4">

          <div className="h-16 w-16 rounded-2xl bg-white flex items-center justify-center overflow-hidden shadow-lg">

            <img
              src={
                job.logo ||
                "https://logo.clearbit.com/google.com"
              }
              alt={job.company}
              className="h-full w-full object-contain p-2"
            />

          </div>

          <div>

            <div className="flex flex-wrap items-center gap-2">

              <h2 className="text-lg font-bold text-white">
                {job.title}
              </h2>

              <span className="px-2 py-1 rounded-full text-[10px] bg-green-500/10 border border-green-500/20 text-green-400">
                Actively Hiring
              </span>

            </div>

            <p className="text-gray-300 mt-1">
              {job.company}
            </p>

            <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-400">

              <span className="flex items-center gap-1">
                <MapPin size={13} />
                {job.location}
              </span>

              <span className="flex items-center gap-1">
                <Briefcase size={13} />
                {job.type}
              </span>

              <span className="flex items-center gap-1">
                <Clock3 size={13} />
                {job.experience}
              </span>

            </div>

          </div>

        </div>

        <button
          className="
            h-fit
            bg-orange-500
            hover:bg-orange-600
            px-4
            py-2
            rounded-xl
            text-sm
            font-semibold
            transition-all
          "
        >
          Apply
        </button>

      </div>

      <div className="grid grid-cols-2 gap-3 mt-5">

        <div className="bg-slate-800/40 rounded-xl p-3">
          <p className="text-[11px] text-gray-400">
            Salary
          </p>

          <p className="font-bold text-orange-400">
            {job.salary}
          </p>
        </div>

        <div className="bg-slate-800/40 rounded-xl p-3">
          <p className="text-[11px] text-gray-400">
            Openings
          </p>

          <p className="font-bold">
            {job.openings}
          </p>
        </div>

        <div className="bg-slate-800/40 rounded-xl p-3">
          <p className="text-[11px] text-gray-400">
            Mode
          </p>

          <p className="font-bold">
            {job.mode}
          </p>
        </div>

        <div className="bg-slate-800/40 rounded-xl p-3">
          <p className="text-[11px] text-gray-400">
            Posted
          </p>

          <p className="font-bold">
            {job.posted}
          </p>
        </div>

      </div>

      <div className="mt-5">

        <p className="text-gray-400 text-sm line-clamp-3">
          {job.description}
        </p>

      </div>

      <div className="mt-5">

        <div className="flex flex-wrap gap-2">

          {job.skills?.slice(0, 6).map((skill) => (
            <span
              key={skill}
              className="
                px-2.5
                py-1
                rounded-full
                bg-orange-500/10
                border
                border-orange-500/20
                text-orange-400
                text-xs
              "
            >
              {skill}
            </span>
          ))}

        </div>

      </div>

      <div className="mt-5">

        <h4 className="font-semibold text-sm mb-2">
          Key Requirements
        </h4>

        <ul className="space-y-1 text-sm text-gray-400">

          {job.eligibility?.slice(0, 3).map((item, index) => (
            <li key={index}>
              • {item}
            </li>
          ))}

        </ul>

      </div>

      <div className="mt-auto pt-5 border-t border-slate-800 flex justify-between items-center">

        <div className="flex gap-2 flex-wrap">

          <span className="px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 text-xs">
            Verified
          </span>

          <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs">
            Fast Hiring
          </span>

        </div>

        <p className="text-xs text-gray-500">
          {job.applicants || "1,248"} Applicants
        </p>

      </div>

    </div>
  </div>
))}

        </div>

      </div>

    </div>
  );
};

export default Jobs;