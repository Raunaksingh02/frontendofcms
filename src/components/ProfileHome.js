import React, { useState } from "react";
import Dashboard from "../components/profile/Dashboard";
import Jobs from "../components/profile/Jobs";
import Internships from "../components/profile/Internships";
import Projects from "../components/profile/Projects";
import Aicommunication from "../components/profile/Aicommunication";
import Aigenerated from "../components/profile/Aigenerated";
import Resumepage from "../components/profile/Resumepage";
import Roadmap from "../components/profile/Roadmap";
import Freelancing from "../components/profile/Freelancing";
import Refer from "../components/profile/Refer";
import Aiquiz from "../components/profile/Aiquiz";
import Airesume from "../components/profile/Airesume";
import Aianswer from "./profile/Aianswer";
import Javacompiler from "../components/profile/Javacompiler"
import Cppcompiler from './profile/Cppcompiler';        
import Coursepage from "./Coursepage";
import Questionpage from "../components/profile/Questionpage";
import Compilenode from "../components/profile/Compilenode";
 // NEW
import Coursedetail from "./Coursedetail";
import Certificateupload from "../components/profile/Certificateupload";
import Assessment from "./Assessment";


const ProfileHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [activeScreen, setActiveScreen] =
    useState("dashboard");

  const [selectedCourse, setSelectedCourse] =
    useState(null);

  // NEW — tracks which DSA question is currently open in the compiler
  const [selectedQuestionId, setSelectedQuestionId] =
    useState(null);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "🏠",
    },
    {
      id: "Courses",
      label: "Courses",
      icon: "📚",
    },
    {
      id: "jobs",
      label: "Jobs",
      icon: "💼",
    },
    {
      id: "internships",
      label: "Internships",
      icon: "🚀",
    },
    {
      id: "projects",
      label: "Projects",
      icon: "📂",
    },
    {
      id: "resume",
      label: "Resume",
      icon: "📄",
    },
   {
    id: "Compilenode",
    label: "Node Compiler",
    icon: "⌨️",
   },
    {
      id: "freelancing",
      label: "Freelancing",
      icon: "💰",
    },
    {
      id: "Assessment",
      label: "Assessment",
      icon: "📝",
    },
    {
      id:'Aianswer',
      label:"Aianswer",
      icon:"📝"
    },
    {
      id: "Questionpage",
      label: "Question",
      icon: "❓",
    },
    {
      id: "certificate",
      label: "Certificates",
      icon: "🏆",
    },
    {
      id: "Roadmap",
      label: "Roadmap",
      icon: "🗺️",
    },
      {
      id: "AI Buddy",
      label: "AI Buddy",
      icon: "🤖"  ,
      },
      {
      id: "Aicommunication",
      label: "AI Communication",
      icon: "💬"  ,
      },
        {
      id: "Aiquiz",
      label: "AI Quiz",
      icon: "🧠"    ,
        },
        {
      id: "Airesume",
      label: "AI Resume",
      icon: "📄"    ,
        },
        {
      id: "Cppcompiler",
      label: "C++ Compiler",
      icon: "⌨️"      ,
        },
          {
      id: "JAVACompiler",
      label: "JAVA Compiler",
      icon: "💻"    ,
        },
    {
      id: "Refer",
      label: "Refer",
      icon: "👥",
    }

  ];

  const renderScreen = () => {
    switch (activeScreen) {
      case "dashboard":
        return <Dashboard />;

      case "jobs":
        return <Jobs />;

      case "internships":
        return <Internships />;

      case "Cppcompiler":
        return <Cppcompiler />; 

      case "projects":
        return <Projects />;  

      case "resume":
        return <Resumepage />;

      case "JAVACompiler":
        return <Javacompiler />;  

      case "freelancing":
        return <Freelancing />;

      case "Assessment":
        return <Assessment />;

      case "certificate":
        return <Certificateupload />;

      case "Roadmap":
        return <Roadmap />;

        case "AI Buddy":
        return <Aigenerated />;

      case "Aiquiz":
        return <Aiquiz />;
        case "Compilenode":
        return <Compilenode />;

        case "Aicommunication":
        return <Aicommunication />;

        case "Aianswer":
          return <Aianswer/>;
        

      
      case "Refer":
          return <Refer />;

      // FIXED — was <Questionpage/> with no props, so setSelectedQuestionId
      // was undefined inside it. Now wired the same way Courses is.
      case "Questionpage":
        return (
          <Questionpage
            setActiveScreen={setActiveScreen}
            setSelectedQuestionId={setSelectedQuestionId}
          />
        );

      // NEW — opens whichever question was picked in Questionpage
      case "Compiler":
        return (
          <Javacompiler
            questionId={selectedQuestionId}
            setActiveScreen={setActiveScreen}
          />
        );

      case "Courses":
        return (
          <Coursepage
            setActiveScreen={
              setActiveScreen
            }
            setSelectedCourse={
              setSelectedCourse
            }
          />
        );

      case "Coursedetail":
        return (
          <Coursedetail
            course={selectedCourse}
            setActiveScreen={
              setActiveScreen
            }
          />
        );

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="h-screen flex bg-slate-950 text-white overflow-hidden">
      {/* SIDEBAR */}

      <aside
        className={`${
          sidebarOpen
            ? "w-[280px]"
            : "w-[90px]"
        } h-screen bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col flex-shrink-0`}
      >
        {/* LOGO */}

        <div className="h-20 border-b border-slate-800 flex items-center justify-between px-4">
          {sidebarOpen && (
            <h1 className="font-black text-xl text-orange-500 whitespace-nowrap">
              Placement Portal
            </h1>
          )}

          <button
            onClick={() =>
              setSidebarOpen(
                !sidebarOpen
              )
            }
            className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 transition-all flex items-center justify-center"
          >
            {sidebarOpen
              ? "◀"
              : "▶"}
          </button>
        </div>

        {/* MENU */}

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {menuItems.map(
            (item) => (
              <button
                key={item.id}
                onClick={() =>
                  setActiveScreen(
                    item.id
                  )
                }
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 ${
                  activeScreen ===
                  item.id
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                    : "hover:bg-slate-800 text-slate-300"
                }`}
              >
                <span className="text-xl flex-shrink-0">
                  {item.icon}
                </span>

                {sidebarOpen && (
                  <span className="font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </button>
            )
          )}
        </div>

        {/* FOOTER */}

        <div className="p-4 border-t border-slate-800">
          {sidebarOpen && (
            <div className="bg-slate-800 rounded-2xl p-4">
  <h3 className="font-semibold text-white">
    Student Profile
  </h3>

  
  <div className="mt-4">
    <div className="flex items-center justify-between text-sm mb-2">
      <span className="text-slate-300">
        Profile Completion
      </span>

      <span className="font-semibold text-emerald-400">
        75%
      </span>
    </div>

    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
      <div
        className="h-full bg-emerald-500 rounded-full"
        style={{ width: "75%" }}
      />
    </div>
  </div>

  <button
    className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-xl transition"
  >
    Complete Profile
  </button>
</div>
          )}
        </div>
      </aside>

      {/* RIGHT CONTENT */}

      <main className="flex-1 h-screen overflow-y-auto overflow-x-hidden">
        <div className="min-h-full p-6">
          {renderScreen()}
        </div>
      </main>
    </div>
  );
};

export default ProfileHome;