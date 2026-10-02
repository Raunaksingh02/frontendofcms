import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

const Dashboard = () => {
  const [loading, setLoading] =
    useState(true);

  const [applicant, setApplicant] =
    useState(null);

  const [error, setError] =
    useState("");

  const fetchApplicant =
    async () => {
      try {
        setLoading(true);

        /*
        ==========================================
        GET LOGIN DATA
        ==========================================
        */

        const authData =
          JSON.parse(
            localStorage.getItem(
              "applicantAuth"
            )
          );

        if (!authData) {
          setError(
            "Please login first"
          );

          return;
        }

        /*
        ==========================================
        CHECK EXPIRY
        ==========================================
        */

        if (
          Date.now() >
          authData.expiresAt
        ) {
          localStorage.removeItem(
            "applicantAuth"
          );

          setError(
            "Session expired. Please login again."
          );

          return;
        }

        /*
        ==========================================
        FETCH APPLICANT
        ==========================================
        */

        const applicantId =
          authData.applicantId;

        const response =
          await axios.get(
            `http://localhost:5001/api/applicant/${applicantId}`
          );

        setApplicant(
          response?.data
            ?.applicant
        );
      } catch (err) {
        console.log(err);

        setError(
          "Unable to fetch applicant profile"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchApplicant();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div className="bg-[#111827] border border-white/10 rounded-3xl p-8">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div>
            <h1 className="text-4xl font-black text-white">
              {
                applicant?.fullName
              }
            </h1>

            <p className="text-orange-400 text-lg mt-2 capitalize">
              {
                applicant?.role
              }
            </p>

            <div className="flex flex-wrap gap-3 mt-5">
              <div className="px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400">
                {applicant?.isVerified
                  ? "Verified"
                  : "Not Verified"}
              </div>

              <div className="px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                {applicant?.internshipStatus ||
                  "Pending"}
              </div>

              <div className="px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
                {applicant?.placementStatus ||
                  "Pending"}
              </div>
            </div>
          </div>

          <div className="w-32 h-32 rounded-3xl overflow-hidden border border-white/10">
            <img
              src={
                applicant
                  ?.profileImage
                  ?.url ||
                "https://via.placeholder.com/200"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#111827] rounded-3xl p-6 border border-white/10">
          <p className="text-gray-400">
            Skills
          </p>

          <h2 className="text-4xl font-black text-orange-400 mt-3">
            {applicant?.skills
              ?.length || 0}
          </h2>
        </div>

        <div className="bg-[#111827] rounded-3xl p-6 border border-white/10">
          <p className="text-gray-400">
            Projects
          </p>

          <h2 className="text-4xl font-black text-orange-400 mt-3">
            {applicant?.projects
              ?.length || 0}
          </h2>
        </div>

        <div className="bg-[#111827] rounded-3xl p-6 border border-white/10">
          <p className="text-gray-400">
            Experience
          </p>

          <h2 className="text-4xl font-black text-orange-400 mt-3">
            {applicant
              ?.experiences
              ?.length || 0}
          </h2>
        </div>

        <div className="bg-[#111827] rounded-3xl p-6 border border-white/10">
          <p className="text-gray-400">
            Joined
          </p>

          <h2 className="text-lg font-semibold mt-3 text-white">
            {applicant?.createdAt
              ? new Date(
                  applicant.createdAt
                ).toLocaleDateString()
              : "-"}
          </h2>
        </div>
      </div>

      {/* CONTACT */}

      <div className="bg-[#111827] border border-white/10 rounded-3xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-white">
          Contact Information
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-[#0b1120] rounded-2xl p-5">
            <p className="text-gray-400 text-sm">
              Email
            </p>

            <h3 className="mt-3 font-semibold text-white">
              {applicant?.email}
            </h3>
          </div>

          <div className="bg-[#0b1120] rounded-2xl p-5">
            <p className="text-gray-400 text-sm">
              Phone
            </p>

            <h3 className="mt-3 font-semibold text-white">
              {applicant?.phone}
            </h3>
          </div>

          <div className="bg-[#0b1120] rounded-2xl p-5">
            <p className="text-gray-400 text-sm">
              Applicant ID
            </p>

            <h3 className="mt-3 font-semibold text-white break-all">
              {applicant?._id}
            </h3>
          </div>

          <div className="bg-[#0b1120] rounded-2xl p-5">
            <p className="text-gray-400 text-sm">
              Status
            </p>

            <h3 className="mt-3 font-semibold text-green-400">
              {applicant?.isBlocked
                ? "Blocked"
                : "Active"}
            </h3>
          </div>
        </div>
      </div>

      {/* SKILLS */}

      <div className="bg-[#111827] border border-white/10 rounded-3xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-white">
          Technical Skills
        </h2>

        <div className="flex flex-wrap gap-3">
          {applicant?.skills
            ?.length > 0 ? (
            applicant.skills.map(
              (
                skill,
                index
              ) => (
                <div
                  key={index}
                  className="px-5 py-3 rounded-xl bg-orange-500 text-white font-medium"
                >
                  {skill}
                </div>
              )
            )
          ) : (
            <p className="text-gray-400">
              No Skills Added
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;