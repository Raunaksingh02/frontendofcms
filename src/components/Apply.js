import React, {
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";

import axios from "axios";

const Apply = () => {
  /*
  ==================================================
  STATES
  ==================================================
  */

  const [searchParams] = useSearchParams();
  
const referralCode = searchParams.get("ref");

  console.log(referralCode);

  const [loading, setLoading] =
    useState(false);

  const [currentStep, setCurrentStep] =
    useState(1);

  const [profileImage, setProfileImage] =
    useState(null);

  const [resumePdf, setResumePdf] =
    useState(null);

  /*
  ==================================================
  FORM DATA
  ==================================================
  */

  const [formData, setFormData] =
    useState({
      /*
      ==========================================
      BASIC
      ==========================================
      */

      fullName: "",
      referby: referralCode || "",
      email: "",
      phone: "",
      gender: "",
      dateOfBirth: "",

      /*
      ==========================================
      ADDRESS
      ==========================================
      */

      city: "",
      state: "",
      country: "",
      pincode: "",

      /*
      ==========================================
      EDUCATION
      ==========================================
      */

      ugInstitute: "",
      ugDegree: "",
      ugSpecialization: "",
      ugPassingYear: "",
      ugCgpa: "",

      /*
      ==========================================
      SKILLS
      ==========================================
      */

      skills: "",

      /*
      ==========================================
      EXPERIENCE
      ==========================================
      */

      companyName: "",
      role: "",
      duration: "",
      experienceDescription:
        "",

      /*
      ==========================================
      PROJECT
      ==========================================
      */

      projectTitle: "",
      projectDescription:
        "",
      technologiesUsed: "",
      githubLink: "",
      liveLink: "",

      /*
      ==========================================
      SOCIAL
      ==========================================
      */

      linkedin: "",
      github: "",
      portfolio: "",
    });

  /*
  ==================================================
  HANDLE CHANGE
  ==================================================
  */

  const handleChange = (
    e
  ) => {
    const { name, value } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /*
  ==================================================
  NEXT STEP
  ==================================================
  */

  const handleNext = () => {
    /*
    ==========================================
    STEP 1 VALIDATION
    ==========================================
    */

    if (currentStep === 1) {
      if (
        !formData.fullName ||
        !formData.email ||
        !formData.phone ||
        !formData.gender
      ) {
        alert(
          "Please fill all required fields"
        );

        return;
      }
    }

    /*
    ==========================================
    STEP 2 VALIDATION
    ==========================================
    */

    if (currentStep === 2) {
      if (
        !formData.ugInstitute ||
        !formData.ugDegree
      ) {
        alert(
          "Please complete education details"
        );

        return;
      }
    }

    /*
    ==========================================
    STEP 3 VALIDATION
    ==========================================
    */

    if (currentStep === 3) {
      if (!formData.skills) {
        alert(
          "Please enter your skills"
        );

        return;
      }
    }

    /*
    ==========================================
    STEP 4 VALIDATION
    ==========================================
    */

    if (currentStep === 4) {
      if (
        !formData.projectTitle
      ) {
        alert(
          "Please enter project title"
        );

        return;
      }
    }

    setCurrentStep(
      (prev) => prev + 1
    );
  };

  /*
  ==================================================
  PREVIOUS STEP
  ==================================================
  */

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(
        (prev) => prev - 1
      );
    }
  };

  /*
  ==================================================
  SUBMIT
  ==================================================
  */

  

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      if (!profileImage) {
        alert(
          "Please upload profile image"
        );
        return;
      }
      if (!resumePdf) {
        alert(
          "Please upload resume PDF"
        );
        return;
      }

      if (
        !profileImage.type.startsWith(
          "image/"
        )
      ) {
        alert(
          "Only image files allowed"
        );

        return;
      }

      /*
      ==========================================
      PDF VALIDATION
      ==========================================
      */

      if (
        resumePdf.type !==
        "application/pdf"
      ) {
        alert(
          "Only PDF resume allowed"
        );

        return;
      }

      try {
        setLoading(true);

        const data =
          new FormData();

        /*
        ==========================================
        APPEND FORM DATA
        ==========================================
        */

        Object.keys(
          formData
        ).forEach((key) => {
          data.append(
            key,
            formData[key]
          );
        });

        /*
        ==========================================
        FILES
        ==========================================
        */

        data.append(
          "profileImage",
          profileImage
        );

        data.append(
          "resumePdf",
          resumePdf
        );

        /*
        ==========================================
        API
        ==========================================
        */

        const response =
          await axios.post(
            "http://localhost:5001/api/applicant/create",
            data,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        alert(
          response.data.message
        );

        /*
        ==========================================
        RESET
        ==========================================
        */

        setFormData({
          fullName: "",
          email: "",
          phone: "",
          gender: "",
          dateOfBirth: "",
          city: "",
          state: "",
          country: "",
          pincode: "",
          ugInstitute: "",
          ugDegree: "",
          ugSpecialization:
            "",
          ugPassingYear: "",
          ugCgpa: "",
          skills: "",
          companyName: "",
          role: "",
          duration: "",
          experienceDescription:
            "",
          projectTitle: "",
          projectDescription:
            "",
          technologiesUsed: "",
          githubLink: "",
          liveLink: "",
          linkedin: "",
          github: "",
          portfolio: "",
        });

        setProfileImage(null);

        setResumePdf(null);

        setCurrentStep(1);
      } catch (error) {
        console.log(error);

        alert(
          error?.response?.data
            ?.message ||
            "Application Failed"
        );
      } finally {
        setLoading(false);
      }
    };

  /*
  ==================================================
  PROGRESS
  ==================================================
  */

  const progress =
    (currentStep / 5) * 100;

 return (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-10 px-4">
    <div className="max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="text-center">
        <div className="inline-flex items-center px-6 py-3 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-semibold">
          PAP Internship Portal
        </div>

        <h1 className="mt-6 text-4xl md:text-6xl font-black text-white leading-tight">
          Internship & Placement Application
        </h1>

        <p className="mt-5 text-slate-400 text-lg max-w-2xl mx-auto">
          Apply for internships, placements and industry training opportunities.
        </p>
      </div>

      {/* PROGRESS */}
      <div className="mt-10 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-[32px] p-6">
        <div className="flex justify-between">
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300
                  ${currentStep >= step
                    ? "bg-gradient-to-br from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20"
                    : "bg-slate-800 text-slate-500 border border-slate-700"
                  }
                `}
              >
                {currentStep > step ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : step}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-orange-400 transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-3 flex justify-between text-xs font-semibold">
          <span className="text-slate-500">Step {currentStep} of 5</span>
          <span className="text-amber-500">{progress}% complete</span>
        </div>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 bg-slate-900 border border-slate-800 rounded-[40px] p-6 md:p-10"
      >

        {/* STEP 1 */}
        {currentStep === 1 && (
          <div>
            <h1 className="text-4xl font-bold text-white"  >Personal Information</h1>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">

              <Input
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
              <Input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="h-14 bg-white border border-slate-700 text-black rounded-2xl px-4 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all appearance-none cursor-pointer"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <Input
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {currentStep === 2 && (
          <div>
            <Title title="Education" subtitle="Enter your academic details" />
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input name="ugInstitute"      placeholder="UG Institute"     value={formData.ugInstitute}      onChange={handleChange} />
              <Input name="ugDegree"         placeholder="UG Degree"        value={formData.ugDegree}         onChange={handleChange} />
              <Input name="ugSpecialization" placeholder="Specialization"   value={formData.ugSpecialization} onChange={handleChange} />
              <Input name="ugPassingYear"    placeholder="Passing Year"     value={formData.ugPassingYear}    onChange={handleChange} />
              <Input name="ugCgpa"           placeholder="CGPA"             value={formData.ugCgpa}           onChange={handleChange} />
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {currentStep === 3 && (
          <div>
            <Title title="Skills & Experience" subtitle="Add your technical skills" />
            <div className="mt-10">
              <textarea
                name="skills"
                placeholder="Skills separated by commas"
                value={formData.skills}
                onChange={handleChange}
                className="w-full h-40 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-3xl p-5 outline-none resize-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
              />

              {formData.skills && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {formData.skills.split(",").filter(s => s.trim()).map((s, i) => (
                    <span key={i} className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-400">
                      {s.trim()}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} />
                <Input name="role"        placeholder="Role"         value={formData.role}        onChange={handleChange} />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {currentStep === 4 && (
          <div>
            <Title title="Projects & Links" subtitle="Add project and social profiles" />
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input name="projectTitle" placeholder="Project Title" value={formData.projectTitle} onChange={handleChange} />
              <Input name="githubLink"   placeholder="Github Link"   value={formData.githubLink}   onChange={handleChange} />
              <Input name="linkedin"     placeholder="LinkedIn"      value={formData.linkedin}     onChange={handleChange} />
              <Input name="portfolio"    placeholder="Portfolio"     value={formData.portfolio}    onChange={handleChange} />
            </div>
          </div>
        )}

        {/* STEP 5 */}
        {currentStep === 5 && (
          <div>
            <Title title="Upload Documents" subtitle="Upload required documents" />
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* PROFILE */}
              <div className="border-2 border-dashed border-amber-500/30 hover:border-amber-500/60 bg-amber-500/5 rounded-[32px] p-8 text-center transition-all duration-300">
                <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-3xl">
                  📷
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">Upload Profile Image</h3>
                <p className="mt-1 text-slate-500 text-sm">JPG, PNG · Max 5MB</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                  className="mt-6 block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-amber-500/10 file:text-amber-400 hover:file:bg-amber-500/20 cursor-pointer"
                />
                {profileImage && (
                  <p className="mt-4 text-amber-400 font-semibold break-all text-sm">
                    ✓ {profileImage.name}
                  </p>
                )}
              </div>

              {/* RESUME */}
              <div className="border-2 border-dashed border-orange-500/30 hover:border-orange-500/60 bg-orange-500/5 rounded-[32px] p-8 text-center transition-all duration-300">
                <div className="w-20 h-20 mx-auto rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-3xl">
                  📄
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">Upload Resume PDF</h3>
                <p className="mt-1 text-slate-500 text-sm">PDF only · Max 10MB</p>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setResumePdf(e.target.files[0])}
                  className="mt-6 block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-orange-500/10 file:text-orange-400 hover:file:bg-orange-500/20 cursor-pointer"
                />
                {resumePdf && (
                  <p className="mt-4 text-amber-400 font-semibold break-all text-sm">
                    ✓ {resumePdf.name}
                  </p>
                )}
              </div>

            </div>
          </div>
        )}

        {/* BUTTONS */}
        <div className="mt-14 flex justify-between items-center">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="h-14 px-8 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-amber-500/40 text-slate-300 font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="h-14 px-8 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-0.5"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="h-14 px-10 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          )}
        </div>

      </form>
    </div>
  </div>
);

};

/*
==================================================
TITLE COMPONENT
==================================================
*/

const Title = ({
  title,
  subtitle,
}) => {
  return (
    <div>
      <h2
        className="
        text-3xl
        md:text-4xl
        font-black
        text-slate-800
        "
      >
        {title}
      </h2>

      <p
        className="
        mt-3
        text-slate-500
        text-lg
        "
      >
        {subtitle}
      </p>
    </div>
  );
};

/*
==================================================
INPUT COMPONENT
==================================================
*/

const Input = ({
  ...props
}) => {
  return (
    <input
      {...props}
      className="
      h-14
      w-full
      border
      border-slate-200
      rounded-2xl
      px-5
      outline-none
      focus:border-blue-500
      transition-all
      "
    />
  );
};

export default Apply;