import React, {
  useState,
} from "react";

import axios from "axios";

import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const Airesume = () => {
  const [loading, setLoading] =
    useState(false);

  const [resumeText, setResumeText] =
    useState("");

  const [analysis, setAnalysis] =
    useState(null);

  const [error, setError] =
    useState("");

  const extractPdfText =
    async (file) => {
      try {
        const arrayBuffer =
          await file.arrayBuffer();

        const pdf =
          await pdfjsLib.getDocument({
            data: arrayBuffer,
          }).promise;

        let extractedText = "";

        for (
          let pageNum = 1;
          pageNum <= pdf.numPages;
          pageNum++
        ) {
          const page =
            await pdf.getPage(
              pageNum
            );

          const content =
            await page.getTextContent();

          const pageText =
            content.items
              .map(
                (item) =>
                  item.str
              )
              .join(" ");

          extractedText +=
            pageText + "\n\n";
        }

        return extractedText;
      } catch (error) {
        console.error(error);
        throw new Error(
          "Unable to extract PDF text"
        );
      }
    };

  const handleFile =
    async (event) => {
      try {
        setError("");
        setAnalysis(null);

        const file =
          event.target.files[0];

        if (!file) return;

        if (
          file.type !==
          "application/pdf"
        ) {
          setError(
            "Please upload PDF file only"
          );
          return;
        }

        setLoading(true);

        const text =
          await extractPdfText(
            file
          );

        setResumeText(text);

        const response =
          await axios.post(
            "http://localhost:5000/analyze-resume",
            {
              resumeText: text,
            }
          );

        setAnalysis(
          response.data.analysis
        );
      } catch (error) {
        console.error(error);

        setError(
          error?.response?.data
            ?.message ||
            "Analysis failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          <h1 className="text-4xl font-bold text-center mb-3">
            AI Resume ATS Analyzer
          </h1>

          <p className="text-center text-gray-500 mb-8">
            Upload Resume PDF and get ATS Score,
            Missing Keywords, Recruiter Feedback
            and Interview Readiness.
          </p>

          <div className="flex justify-center">
            <input
              type="file"
              accept=".pdf"
              onChange={
                handleFile
              }
              className="border p-3 rounded-lg"
            />
          </div>

          {loading && (
            <div className="mt-8 text-center">
              <div className="text-xl font-semibold">
                Analyzing Resume...
              </div>
            </div>
          )}

          {error && (
            <div className="mt-6 bg-red-100 text-red-700 p-4 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {analysis && (
          <>
            <div className="grid lg:grid-cols-4 gap-6 mb-6">

              <div className="bg-white rounded-2xl p-6 shadow">
                <h3 className="font-bold mb-3">
                  ATS Score
                </h3>

                <div className="text-5xl font-bold">
                  {
                    analysis.atsScore
                  }
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow">
                <h3 className="font-bold mb-3">
                  Rating
                </h3>

                <div className="text-xl font-semibold">
                  {
                    analysis.overallRating
                  }
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow">
                <h3 className="font-bold mb-3">
                  Level
                </h3>

                <div className="text-xl">
                  {
                    analysis.candidateLevel
                  }
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow">
                <h3 className="font-bold mb-3">
                  Interview Readiness
                </h3>

                <div className="text-xl">
                  {
                    analysis.interviewReadiness
                  }
                </div>
              </div>

            </div>

            <div className="grid lg:grid-cols-2 gap-6">

              <div className="bg-white rounded-2xl p-6 shadow">
                <h2 className="text-2xl font-bold mb-4">
                  Strengths
                </h2>

                <ul className="space-y-2">
                  {analysis.strengths?.map(
                    (
                      item,
                      index
                    ) => (
                      <li
                        key={
                          index
                        }
                        className="bg-green-50 p-3 rounded-lg"
                      >
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow">
                <h2 className="text-2xl font-bold mb-4">
                  Weaknesses
                </h2>

                <ul className="space-y-2">
                  {analysis.weaknesses?.map(
                    (
                      item,
                      index
                    ) => (
                      <li
                        key={
                          index
                        }
                        className="bg-red-50 p-3 rounded-lg"
                      >
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow">
                <h2 className="text-2xl font-bold mb-4">
                  Missing Keywords
                </h2>

                <div className="flex flex-wrap gap-2">
                  {analysis.missingKeywords?.map(
                    (
                      item,
                      index
                    ) => (
                      <span
                        key={
                          index
                        }
                        className="bg-yellow-100 px-4 py-2 rounded-full"
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow">
                <h2 className="text-2xl font-bold mb-4">
                  ATS Improvements
                </h2>

                <ul className="space-y-2">
                  {analysis.atsImprovements?.map(
                    (
                      item,
                      index
                    ) => (
                      <li
                        key={
                          index
                        }
                        className="bg-blue-50 p-3 rounded-lg"
                      >
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>

            </div>

            <div className="bg-white rounded-2xl p-6 shadow mt-6">
              <h2 className="text-2xl font-bold mb-4">
                Recommended Roles
              </h2>

              <div className="flex flex-wrap gap-3">
                {analysis.recommendedRoles?.map(
                  (
                    role,
                    index
                  ) => (
                    <span
                      key={
                        index
                      }
                      className="bg-indigo-100 px-4 py-2 rounded-full"
                    >
                      {role}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow mt-6">
              <h2 className="text-2xl font-bold mb-4">
                Resume Summary
              </h2>

              <p>
                {
                  analysis.resumeSummary
                }
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow mt-6">
              <h2 className="text-2xl font-bold mb-4">
                Recruiter Feedback
              </h2>

              <p>
                {
                  analysis.recruiterFeedback
                }
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow mt-6">
              <h2 className="text-2xl font-bold mb-4">
                Salary Estimate
              </h2>

              <p>
                {
                  analysis.salaryEstimateIndia
                }
              </p>
            </div>
          </>
        )}

        {resumeText && (
          <div className="bg-white rounded-2xl shadow p-6 mt-6">
            <h2 className="text-2xl font-bold mb-4">
              Extracted Resume Text
            </h2>

            <textarea
              value={resumeText}
              readOnly
              rows={20}
              className="w-full border rounded-xl p-4"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Airesume;