import React from "react";

const partnerCompanies = [
  
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
    name: "IBM",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  },
  {
    name: "Microsoft",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    name: "Amazon",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    name: "Google",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
];

const Hiringpartner = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-slate-950">
      <style>
        {`
          @keyframes logoSlider {
            0% {
              transform: translateX(0);
            }

            100% {
              transform: translateX(-50%);
            }
          }

          .logo-track {
            width: max-content;
            animation: logoSlider 35s linear infinite;
            will-change: transform;
          }

          .logo-track:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">

        <div className="text-center mb-14">
          <span className="inline-flex items-center px-5 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 font-semibold">
            300+ Hiring Partners
          </span>

          <h2 className="mt-6 text-4xl lg:text-5xl font-black text-white">
            Trusted By Leading Companies
          </h2>

          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Our students secure internships and placements
            with startups, SMEs, and enterprise organizations
            across India.
          </p>
        </div>

        <div className="relative overflow-hidden">

          <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-slate-950 to-transparent z-20" />

          <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-slate-950 to-transparent z-20" />

          <div className="logo-track flex items-center gap-8">

            {[...partnerCompanies, ...partnerCompanies].map(
              (company, index) => (
                <div
                  key={index}
                  className="
                    min-w-[240px]
                    h-28
                    bg-white
                    rounded-3xl
                    flex
                    items-center
                    justify-center
                    p-6
                    shadow-xl
                    hover:scale-105
                    transition-all
                    duration-300
                  "
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="max-h-12 w-auto object-contain"
                  />
                </div>
              )
            )}

          </div>
        </div>

       
      </div>
    </section>
  );
};

export default Hiringpartner;