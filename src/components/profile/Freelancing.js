import React, { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  IndianRupee,
  Briefcase,
  Clock,
  Building2,
  Filter,
  Star,
  Users,
  Calendar,
  CheckCircle,
  Award,
  TrendingUp,
  Shield,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Globe,
  GraduationCap,
  Laptop,
  Target,
} from "lucide-react";

const Freelancing = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [experience, setExperience] = useState("All");
  const [workMode, setWorkMode] = useState("All");
  const [selectedJob, setSelectedJob] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);

  const categories = [
    "All",
    "Web Development",
    "App Development",
    "UI/UX Design",
    "Digital Marketing",
    "Content Writing",
    "Data Entry",
    "Video Editing",
  ];

  const jobs = [
    {
      id: 1,
      title: "React Frontend Developer",
      company: "TechNova Solutions",
      category: "Web Development",
      location: "Noida",
      mode: "Remote",
      experience: "Fresher",
      budget: "₹8,000 - ₹15,000",
      duration: "2 Months",
      applicants: 52,
      rating: 4.8,
      verified: true,
      posted: "2 Days Ago",
      skills: [
        "React",
        "JavaScript",
        "Tailwind CSS",
        "API Integration",
      ],
      description:
        "Develop modern React-based web applications for startups and SMEs. Collaborate with backend developers, create reusable components, optimize application performance, and ensure responsive designs across devices.",
      responsibilities: [
        "Develop responsive user interfaces",
        "Integrate REST APIs",
        "Optimize frontend performance",
        "Fix bugs and maintain applications",
        "Collaborate with backend teams",
        "Implement reusable component architecture",
      ],
      benefits: [
        "Certificate",
        "Letter of Recommendation",
        "Flexible Working Hours",
        "Performance Bonus",
        "Internship Opportunity",
      ],
      requirements: [
        "Basic React Knowledge",
        "JavaScript Fundamentals",
        "HTML & CSS",
        "Git Basics",
      ],
      deliverables: [
        "Responsive Dashboard",
        "Admin Panel UI",
        "Authentication Flow",
        "Project Documentation",
      ],
      selectionSteps: [
        "Apply Online",
        "Resume Screening",
        "Technical Assessment",
        "HR Discussion",
        "Project Allocation",
      ],
    },
    {
      id: 2,
      title: "Social Media Marketing Executive",
      company: "GrowthWave Digital",
      category: "Digital Marketing",
      location: "Delhi",
      mode: "Hybrid",
      experience: "0-1 Year",
      budget: "₹6,000 - ₹12,000",
      duration: "3 Months",
      applicants: 74,
      rating: 4.7,
      verified: true,
      posted: "1 Day Ago",
      skills: [
        "Instagram",
        "Facebook Ads",
        "Content Strategy",
        "Canva",
      ],
      description:
        "Manage social media campaigns, create engaging content, generate leads, and increase brand awareness for multiple clients across industries.",
      responsibilities: [
        "Manage social media pages",
        "Create campaigns",
        "Generate leads",
        "Analyze engagement reports",
        "Coordinate with design team",
      ],
      benefits: [
        "Certificate",
        "Monthly Incentives",
        "Work From Home Days",
        "Recommendation Letter",
      ],
      requirements: [
        "Basic Marketing Knowledge",
        "Communication Skills",
        "Canva Experience",
      ],
      deliverables: [
        "Monthly Content Calendar",
        "Lead Generation Reports",
        "Campaign Performance Analysis",
      ],
      selectionSteps: [
        "Application Review",
        "Marketing Assignment",
        "Interview",
        "Offer Release",
      ],
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "PixelCraft Studio",
      category: "UI/UX Design",
      location: "Ghaziabad",
      mode: "Remote",
      experience: "Fresher",
      budget: "₹10,000 - ₹20,000",
      duration: "1 Month",
      applicants: 38,
      rating: 4.9,
      verified: true,
      posted: "Today",
      skills: [
        "Figma",
        "Wireframing",
        "Prototyping",
        "User Research",
      ],
      description:
        "Design high-converting user experiences and modern interfaces for websites, SaaS products, and mobile applications.",
      responsibilities: [
        "Create wireframes",
        "Build design systems",
        "User journey mapping",
        "Prototype screens",
      ],
      benefits: [
        "Portfolio Project",
        "Certificate",
        "Mentorship",
      ],
      requirements: [
        "Knowledge of Figma",
        "Creative Thinking",
        "Design Fundamentals",
      ],
      deliverables: [
        "Design System",
        "Website Prototype",
        "Mobile App Mockups",
      ],
      selectionSteps: [
        "Portfolio Review",
        "Design Challenge",
        "Interview",
      ],
    },
  ];

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchMatch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase());

      const categoryMatch =
        category === "All" || job.category === category;

      const experienceMatch =
        experience === "All" ||
        job.experience === experience;

      const workModeMatch =
        workMode === "All" ||
        job.mode === workMode;

      return (
        searchMatch &&
        categoryMatch &&
        experienceMatch &&
        workModeMatch
      );
    });
  }, [search, category, experience, workMode]);

  const toggleSaveJob = (id) => {
    if (savedJobs.includes(id)) {
      setSavedJobs(
        savedJobs.filter((item) => item !== id)
      );
    } else {
      setSavedJobs([...savedJobs, id]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-yellow-500/5 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-6 py-16 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-semibold mb-6">
                <Target size={16} />
                India's Freelancing Marketplace
              </div>

              <h1 className="text-5xl font-black leading-tight">
                Find Freelancing
                <span className="block text-orange-400">
                  Projects & Gigs
                </span>
              </h1>

              <p className="text-slate-400 text-lg mt-6 max-w-2xl">
                Discover remote projects, part-time gigs,
                internships, startup opportunities, and
                freelance contracts from companies across
                India.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                {[
                  ["500+", "Projects"],
                  ["120+", "Companies"],
                  ["50K+", "Freelancers"],
                  ["95%", "Success Rate"],
                ].map((item) => (
                  <div
                    key={item[0]}
                    className="bg-slate-900 border border-slate-800 rounded-xl p-4"
                  >
                    <h3 className="text-2xl font-bold text-orange-400">
                      {item[0]}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      {item[1]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Search className="text-orange-400" />
                <h2 className="text-xl font-bold">
                  Search Projects
                </h2>
              </div>

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search jobs, companies..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 outline-none focus:border-orange-500"
              />

              <div className="grid grid-cols-2 gap-3 mt-4">
                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  className="bg-slate-950 border border-slate-700 rounded-xl p-3"
                >
                  {categories.map((cat) => (
                    <option
                      key={cat}
                      className="text-black"
                    >
                      {cat}
                    </option>
                  ))}
                </select>

                <select
                  value={workMode}
                  onChange={(e) =>
                    setWorkMode(e.target.value)
                  }
                  className="bg-slate-950 border border-slate-700 rounded-xl p-3"
                >
                  <option>All</option>
                  <option>Remote</option>
                  <option>Hybrid</option>
                  <option>Onsite</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Jobs */}
          <div className="lg:col-span-2 space-y-5">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-orange-500/40 transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-bold">
                        {job.title}
                      </h2>

                      {job.verified && (
                        <CheckCircle
                          size={18}
                          className="text-green-400"
                        />
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 mt-3 text-slate-400 text-sm">
                      <span className="flex items-center gap-1">
                        <Building2 size={14} />
                        {job.company}
                      </span>

                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {job.location}
                      </span>

                      <span className="flex items-center gap-1">
                        <Laptop size={14} />
                        {job.mode}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      toggleSaveJob(job.id)
                    }
                  >
                    {savedJobs.includes(job.id) ? (
                      <BookmarkCheck className="text-orange-400" />
                    ) : (
                      <Bookmark />
                    )}
                  </button>
                </div>

                <p className="text-slate-400 mt-5">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-5">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-slate-800 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="grid md:grid-cols-4 gap-4 mt-6">
                  <div className="bg-slate-950 rounded-xl p-3">
                    <IndianRupee
                      size={18}
                      className="text-green-400"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Budget
                    </p>
                    <p className="font-semibold">
                      {job.budget}
                    </p>
                  </div>

                  <div className="bg-slate-950 rounded-xl p-3">
                    <Clock
                      size={18}
                      className="text-orange-400"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Duration
                    </p>
                    <p className="font-semibold">
                      {job.duration}
                    </p>
                  </div>

                  <div className="bg-slate-950 rounded-xl p-3">
                    <Users
                      size={18}
                      className="text-blue-400"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Applicants
                    </p>
                    <p className="font-semibold">
                      {job.applicants}
                    </p>
                  </div>

                  <div className="bg-slate-950 rounded-xl p-3">
                    <Star
                      size={18}
                      className="text-yellow-400"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Rating
                    </p>
                    <p className="font-semibold">
                      {job.rating}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() =>
                      setSelectedJob(job)
                    }
                    className="px-5 py-3 rounded-xl border border-slate-700 hover:border-orange-500"
                  >
                    View Details
                  </button>

                  <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold">
                    Apply Now
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <h3 className="font-bold text-lg mb-4">
                Filters
              </h3>

              <div className="space-y-4">
                <select
                  value={experience}
                  onChange={(e) =>
                    setExperience(e.target.value)
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3"
                >
                  <option>All</option>
                  <option>Fresher</option>
                  <option>0-1 Year</option>
                  <option>1-3 Years</option>
                </select>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-yellow-500 rounded-3xl p-6 text-black">
              <Award size={40} />
              <h3 className="text-xl font-bold mt-4">
                Premium Freelancers
              </h3>
              <p className="mt-2">
                Get verified projects and higher-paying
                opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-5 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex justify-between">
              <div>
                <h2 className="text-3xl font-bold">
                  {selectedJob.title}
                </h2>
                <p className="text-slate-400 mt-2">
                  {selectedJob.company}
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedJob(null)
                }
                className="text-slate-400"
              >
                ✕
              </button>
            </div>

            <div className="mt-8 space-y-8">
              <section>
                <h3 className="text-xl font-bold mb-3">
                  Project Description
                </h3>
                <p className="text-slate-300 leading-8">
                  {selectedJob.description}

                  {" "}
                  This project requires continuous
                  communication, timely delivery,
                  professional documentation, quality
                  assurance, and adherence to industry
                  standards. Freelancers will work
                  alongside experienced mentors and gain
                  practical industry exposure while
                  building real-world portfolio projects.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-3">
                  Responsibilities
                </h3>
                <ul className="space-y-2">
                  {selectedJob.responsibilities.map(
                    (item) => (
                      <li
                        key={item}
                        className="flex gap-2"
                      >
                        <CheckCircle
                          size={18}
                          className="text-green-400 mt-1"
                        />
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-3">
                  Deliverables
                </h3>
                <ul className="space-y-2">
                  {selectedJob.deliverables.map(
                    (item) => (
                      <li key={item}>
                        • {item}
                      </li>
                    )
                  )}
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-3">
                  Selection Process
                </h3>
                <div className="space-y-3">
                  {selectedJob.selectionSteps.map(
                    (step, index) => (
                      <div
                        key={step}
                        className="flex gap-4 items-center"
                      >
                        <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-black font-bold">
                          {index + 1}
                        </div>
                        <span>{step}</span>
                      </div>
                    )
                  )}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-3">
                  Benefits
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedJob.benefits.map(
                    (benefit) => (
                      <span
                        key={benefit}
                        className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400"
                      >
                        {benefit}
                      </span>
                    )
                  )}
                </div>
              </section>

              <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold text-lg">
                Apply For This Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Freelancing;