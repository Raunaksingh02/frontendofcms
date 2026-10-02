import React, {
  useState,
} from "react";

import {
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";

const Faqsection = () => {
  const [openFaq, setOpenFaq] =
    useState(0);

  const faqs = [
    {
      question:
        "How does Pay After Placement (PAP) work?",
      answer:
        "Students can enroll in eligible programs with minimal upfront commitment. Program fees are paid according to the Pay After Placement model and applicable terms once placement or internship milestones are achieved.",
    },

    {
      question:
        "Do you provide internships?",
      answer:
        "Yes. We offer internship opportunities across Digital Marketing, Sales, HR, Customer Support, Business Development, Data Analytics, and Technology domains to help students gain real industry experience.",
    },

    {
      question:
        "Will I get placement assistance?",
      answer:
        "Yes. Every student receives career support including resume building, LinkedIn optimization, aptitude preparation, mock interviews, career mentoring, and placement referrals.",
    },

    {
      question:
        "Who can enroll in the programs?",
      answer:
        "Our programs are suitable for BCA, MCA, BBA, MBA, B.Tech, M.Tech, Diploma students, graduates, and working professionals looking to upskill and accelerate their careers.",
    },

    {
      question:
        "Are the courses online or offline?",
      answer:
        "Most programs are online and accessible from anywhere. Selected programs may include live mentorship sessions, workshops, assignments, and project-based learning.",
    },

    {
      question:
        "Which companies hire students from your platform?",
      answer:
        "Students are hired by startups, SMEs, digital agencies, IT services companies, SaaS businesses, and enterprise organizations across India.",
    },

    {
      question:
        "Do I receive a certificate after course completion?",
      answer:
        "Yes. Students receive industry-recognized certificates after successfully completing the course requirements, projects, and assessments.",
    },

    {
      question:
        "What kind of support will I receive during the course?",
      answer:
        "Students receive mentor guidance, doubt-solving assistance, project reviews, interview preparation support, and access to placement resources.",
    },
  ];

  return (
    <section className="relative py-24 bg-slate-950 overflow-hidden">

      {/* Background Glow */}

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full" />

      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full" />

      <div className="max-w-5xl mx-auto px-4 lg:px-8 relative z-10">

        {/* Header */}

        <div className="text-center mb-16">

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-400 font-medium">

            <Sparkles className="w-4 h-4" />

            Frequently Asked Questions

          </div>

          <h2 className="mt-6 text-4xl lg:text-6xl font-black text-white">
            Got Questions?
          </h2>

          <p className="mt-5 text-slate-400 text-lg max-w-2xl mx-auto">
            Find answers about courses,
            internships, placements,
            certifications, and career
            opportunities.
          </p>

        </div>

        {/* FAQ List */}

        <div className="space-y-5">

          {faqs.map(
            (faq, index) => (
              <div
                key={index}
                className="
                  bg-slate-900/70
                  backdrop-blur-xl
                  border
                  border-slate-800
                  rounded-3xl
                  overflow-hidden
                  hover:border-orange-500/40
                  transition-all
                  duration-300
                "
              >

                <button
                  onClick={() =>
                    setOpenFaq(
                      openFaq ===
                        index
                        ? null
                        : index
                    )
                  }
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    gap-4
                    p-7
                    text-left
                  "
                >

                  <h3 className="text-lg lg:text-xl font-bold text-white">
                    {faq.question}
                  </h3>

                  {openFaq ===
                  index ? (
                    <ChevronUp className="w-6 h-6 text-orange-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-slate-400 flex-shrink-0" />
                  )}

                </button>

                <div
                  className={`
                    transition-all
                    duration-500
                    overflow-hidden
                    ${
                      openFaq ===
                      index
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }
                  `}
                >

                  <div className="px-7 pb-7">

                    <div className="h-px bg-slate-800 mb-6" />

                    <p className="text-slate-400 leading-relaxed">
                      {faq.answer}
                    </p>

                  </div>

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </section>
  );
};

export default Faqsection;