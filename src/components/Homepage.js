import React, {
  useState,
  useEffect,
} from "react";
import Faqsection from "./Faqsection.js";
import HiringPartners from "./Hiringpartner.js";
import { useNavigate } from "react-router-dom";
import logo1 from "../heroimage.png";
import CountUp from "react-countup";

import {
  Menu,
  X,
  GraduationCap,
  Briefcase,
  BookOpen,
  Users,
  Building2,
  ArrowRight,
  Sparkles,
   BadgeCheck,
} from "lucide-react";


const Counter = ({
  end,
  suffix = "+",
  duration = 3500,
}) => {
  const [count, setCount] =
    useState(0);

  useEffect(() => {
    let startTime;

    const animate = (
      currentTime
    ) => {
      if (!startTime)
        startTime = currentTime;

      const progress = Math.min(
        (currentTime - startTime) /
          duration,
        1
      );

      const value = Math.floor(
        progress * end
      );

      setCount(value);

      if (progress < 1) {
        requestAnimationFrame(
          animate
        );
      }
    };

    requestAnimationFrame(
      animate
    );
  }, [end, duration]);

  return (
    <>
      {count.toLocaleString()}
      {suffix}
    </>
  );
};

const partnerCompanies = [
  {
    name: "TCS",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/512px-Tata_Consultancy_Services_Logo.svg.png",
  },
  {
    name: "Infosys",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
  },
  {
    name: "Wipro",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg",
  },
  {
    name: "HCL",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/HCL_Technologies_logo.svg",
  },
  {
    name: "Accenture",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg",
  },
  {
    name: "Capgemini",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/9/9d/Capgemini_201x_logo.svg",
  },
  {
    name: "Tech Mahindra",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/4/42/Tech_Mahindra_New_Logo.svg",
  },
  {
    name: "Deloitte",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg",
  },
];

const Homepage = ({
  setActiveScreen,
}) => {
  const [mobileMenu, setMobileMenu] =
    useState(false);

  const navLinks = [
    "Home",
    "Courses",
    "Internships",
    "Jobs",
    "Companies",
    "Placements",
  ];


  const navigate = useNavigate();

  return (
    <div className="bg-slate-950 text-white min-h-screen">

      {/* HEADER */}

      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="h-20 flex items-center justify-between">

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>

              <div>
                <h1 className="font-black text-xl">
                  Campus2career
                </h1>

                <p className="text-xs text-slate-400">
                  Placement Assistance Platform
                </p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((item) => (
                <button
                  key={item}
                  className="text-slate-300 hover:text-orange-400 transition"
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <button
               onClick={() => navigate("/login")}
              className="px-5 py-3 rounded-xl border border-slate-700 hover:border-orange-500 transition">
                Login
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 font-semibold"
              >
                Register
              </button>
            </div>

            <button
              className="lg:hidden"
              onClick={() =>
                setMobileMenu(!mobileMenu)
              }
            >
              {mobileMenu ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="lg:hidden border-t border-slate-800 bg-slate-900">
            <div className="flex flex-col p-5 gap-4">
              {navLinks.map((item) => (
                <button
                  key={item}
                  className="text-left text-slate-300"
                >
                  {item}
                </button>
              ))}

              <button className="bg-orange-500 py-3 rounded-xl font-semibold">
                Register
              </button>
            </div>
          </div>
        )}
      </header>

  
  <section className="relative pt-6 pb-16 overflow-hidden">

  {/* Background Glow */}

  <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/10 blur-[150px]" />

  <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-500/10 blur-[150px]" />

  <div
    className="
    relative
    max-w-7xl
    mx-auto
    px-6
    lg:px-8
    "
  >
    <div
      className="
      grid
      lg:grid-cols-2
      gap-6
      lg:gap-8
      items-center
      "
    >
      {/* LEFT */}

      <div
        className="
        max-w-xl
        justify-self-center
        "
      >
        <div
          className="
          inline-flex
          items-center
          gap-2
          bg-orange-500/10
          border
          border-orange-500/20
          px-5
          py-2
          rounded-full
          text-orange-400
          mb-6
          "
        >
          <Sparkles className="w-4 h-4" />

          <span>
            India's Career Launch Platform
          </span>
        </div>

        <h1
          className="
          text-5xl
          md:text-6xl
          lg:text-7xl
          font-black
          leading-[1.05]
          text-white
          "
        >
          Learn.
          <br />
          Build Skills.
          <br />
          Get Hired.
        </h1>

        <p
          className="
          mt-6
          text-slate-400
          text-lg
          leading-relaxed
          "
        >
          Industry-ready courses, internships,
          hackathons, assessments and placement
          assistance designed for students and
          early professionals.
        </p>

        <div className="flex gap-8 mt-8 flex-wrap">
          <div>
            <h3 className="text-3xl font-black text-white">
              50K+
            </h3>
            <p className="text-slate-400 text-sm">
              Learners
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-black text-white">
              1000+
            </h3>
            <p className="text-slate-400 text-sm">
              Companies
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-black text-white">
              92%
            </h3>
            <p className="text-slate-400 text-sm">
              Success Rate
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-8">
          <button
            onClick={() => setActiveScreen("Courses")}
            className="
            bg-orange-500
            hover:bg-orange-600
            px-8
            py-4
            rounded-2xl
            font-bold
            flex
            items-center
            gap-2
            transition-all
            "
          >
            Explore Courses
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveScreen("Jobs")}
            className="
            border
            border-slate-700
            hover:border-orange-500
            px-8
            py-4
            rounded-2xl
            font-bold
            "
          >
            Find Jobs
          </button>
        </div>
      </div>

      {/* RIGHT */}

      <div className="justify-self-center">
        <div className="relative w-full max-w-[500px]">

          <div
            className="
            absolute
            inset-0
            bg-orange-500/20
            blur-[120px]
            rounded-full
            scale-110
            "
          />

          <div
            className="
            relative
            overflow-hidden
            rounded-[32px]
            border
            border-orange-500/20
            bg-slate-900
            shadow-2xl
            shadow-orange-500/20
            "
          >
            <img
              src={logo1}
              alt="Career Platform"
              className="
              w-full
              h-[550px]
              object-cover
              "
            />

            <div
              className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/50
              via-transparent
              to-transparent
              "
            />
          </div>

          {/* Counter 1 */}

          <div
            className="
            absolute
            top-4
            left-4
            bg-slate-900/80
            backdrop-blur-xl
            border
            border-white/10
            rounded-2xl
            px-4
            py-3
            "
          >
           <h3 className="text-2xl font-black text-white">
  <CountUp
    start={0}
    end={50}
    duration={3}
    enableScrollSpy
    scrollSpyOnce
  />
  K+
</h3>

            <p className="text-xs text-slate-300">
              Students
            </p>
          </div>

          {/* Counter 2 */}

         <div
  className="
  absolute
  top-1/2
  -right-5
  -translate-y-1/2
  bg-slate-950/90
  backdrop-blur-2xl
  border
  border-orange-500/20
  rounded-3xl
  px-5
  py-4
  shadow-xl
  shadow-orange-500/10
  min-w-[190px]
  "
>
  <div className="flex  items-center gap-2 mb-2">
    <Building2 className="w-5 h-5 text-orange-400" />

    <span className="text-xs font-semibold tracking-wider uppercase text-orange-400">
      Trusted Network
    </span>
  </div>

  <h3 className=" text-2xl font-black text-white leading-none">
    <CountUp
      start={0}
      end={1000}
      duration={3}
      enableScrollSpy
      scrollSpyOnce
    />
    +
  </h3>

  <p className="text-sm font-medium text-slate-400 mt-2">
    Hiring Partners
  </p>
</div>

          {/* Counter 3 */}

          <div
  className="
  absolute
  bottom-5
  left-5
  bg-slate-950/90
  backdrop-blur-2xl
  border
  border-orange-500/20
  rounded-3xl
  px-5
  py-4
  shadow-xl
  shadow-orange-500/10
  min-w-[190px]
  "
>
  <div className="flex items-center gap-2 mb-2">
    <GraduationCap className="w-5 h-5 text-orange-400" />

    <span className="text-xs font-semibold tracking-wider uppercase text-orange-400">
      Career Assistance
    </span>
  </div>

  <h3 className="text-3xl font-black text-white leading-none">
    <CountUp
      start={0}
      end={95}
      duration={3}
      enableScrollSpy
      scrollSpyOnce
    />
    %
  </h3>

  <p className="text-sm font-medium text-slate-400 mt-2">
    Placement Support
  </p>
</div>
        </div>
      </div>
    </div>
  </div>
</section>
      {/* STATS */}

      <HiringPartners />

        <Faqsection/>


      {/* CTA */}

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-[40px] p-10 lg:p-16">

            <div className="max-w-3xl">

              <h2 className="text-4xl lg:text-6xl font-black">
                Ready To Start Your
                Career Journey?
              </h2>

              <p className="mt-6 text-orange-100 text-lg">
                Join thousands of
                students learning,
                building projects and
                getting hired through
                PAP.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">

                <button className="bg-white text-black px-8 py-4 rounded-2xl font-bold">
                  Enroll Now
                </button>

                <button className="border border-white/40 px-8 py-4 rounded-2xl font-bold">
                  Explore Jobs
                </button>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}

<footer className="border-t border-slate-800 bg-slate-950">
  <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

      {/* BRAND */}

      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>

          <div>
            <h2 className="text-xl font-black">
              Campus2career
            </h2>

            <p className="text-xs text-slate-400">
              Placement Assistance Platform
            </p>
          </div>
        </div>

        <p className="text-slate-400 leading-relaxed">
          Empowering students with
          industry-ready skills,
          internships, job opportunities,
          and placement assistance to
          build successful careers.
        </p>

        <div className="flex gap-3 mt-6">

          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-orange-500 cursor-pointer transition">
            F
          </div>

          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-orange-500 cursor-pointer transition">
            I
          </div>

          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-orange-500 cursor-pointer transition">
            L
          </div>

          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-orange-500 cursor-pointer transition">
            Y
          </div>

        </div>
      </div>

      {/* COURSES */}

      <div>
        <h3 className="text-lg font-bold mb-6">
          Learning
        </h3>

        <div className="space-y-4 text-slate-400">
          <p className="hover:text-orange-400 cursor-pointer transition">
            Digital Marketing
          </p>

          <p className="hover:text-orange-400 cursor-pointer transition">
            Full Stack Development
          </p>

          <p className="hover:text-orange-400 cursor-pointer transition">
            Data Analytics
          </p>

          <p className="hover:text-orange-400 cursor-pointer transition">
            Sales Training
          </p>

          <p className="hover:text-orange-400 cursor-pointer transition">
            Career Programs
          </p>
        </div>
      </div>

      {/* COMPANY */}

      <div>
        <h3 className="text-lg font-bold mb-6">
          Company
        </h3>

        <div className="space-y-4 text-slate-400">
          <p className="hover:text-orange-400 cursor-pointer transition">
            About Us
          </p>

          <p className="hover:text-orange-400 cursor-pointer transition">
            Internships
          </p>

          <p className="hover:text-orange-400 cursor-pointer transition">
            Jobs
          </p>

          <p className="hover:text-orange-400 cursor-pointer transition">
            Hiring Partners
          </p>

          <p className="hover:text-orange-400 cursor-pointer transition">
            Success Stories
          </p>
        </div>
      </div>

      {/* CONTACT */}

      <div>
        <h3 className="text-lg font-bold mb-6">
          Contact
        </h3>

        <div className="space-y-4 text-slate-400">

          <p>
            📍 Noida, Greater Noida,
            Ghaziabad, Meerut
          </p>

          <p>
            📧 support@campus2career.in
          </p>

          <p>
            📞 +91 XXXXX XXXXX
          </p>

          <p>
            Mon - Sat : 9 AM - 7 PM
          </p>

        </div>

        <button className="mt-6 bg-orange-500 hover:bg-orange-600 px-5 py-3 rounded-xl font-semibold transition">
          Contact Team
        </button>
      </div>

    </div>

    {/* STATS */}

   

    

    {/* BOTTOM */}

    <div className="border-t border-slate-800 mt-14 pt-8 flex flex-col lg:flex-row justify-between items-center gap-4">

      <p className="text-slate-500 text-sm">
        © 2026 Campus2career. All Rights
        Reserved.
      </p>

      <div className="flex flex-wrap gap-6 text-sm text-slate-400">
        <button className="hover:text-orange-400">
          Privacy Policy
        </button>

        <button className="hover:text-orange-400">
          Terms &
          Conditions
        </button>

        <button className="hover:text-orange-400">
          Refund Policy
        </button>

        <button className="hover:text-orange-400">
          Support
        </button>
      </div>

    </div>

  </div>
</footer>

    </div>
  );
};

export default Homepage;