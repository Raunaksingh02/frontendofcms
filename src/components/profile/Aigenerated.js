import axios from "axios";
import { useState } from "react";
import { Upload, ImageIcon, Sparkles } from "lucide-react";

function Aigenerated() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!image || !question) {
      alert("Please upload an image and ask a question.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("image", image);
      formData.append("question", question);

      const res = await axios.post(
        "http://localhost:5001/image-answer",
        formData
      );

      setAnswer(res.data.answer);
    } catch (err) {
      console.log(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex justify-center items-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* Left Side */}

        <div className="p-8 border-r">

          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Sparkles className="text-indigo-600" />
            Gemini Image AI
          </h1>

          <p className="text-gray-500 mt-2">
            Upload an image and ask anything about it.
          </p>

          <label className="mt-8 flex flex-col justify-center items-center border-2 border-dashed border-indigo-300 rounded-2xl h-72 cursor-pointer hover:border-indigo-500 transition">

            {preview ? (
              <img
                src={preview}
                alt=""
                className="object-contain h-full rounded-2xl"
              />
            ) : (
              <>
                <Upload
                  size={50}
                  className="text-indigo-500"
                />
                <p className="mt-4 text-gray-600">
                  Click to Upload Image
                </p>
              </>
            )}

            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setImage(file);

                if (file) {
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />
          </label>
        </div>

        {/* Right Side */}

        <div className="p-8 flex flex-col">

          <h2 className="text-xl font-semibold text-gray-700">
            Ask AI
          </h2>

          <textarea
            rows={5}
            placeholder="Example: Solve this math problem step by step..."
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            className="mt-5 border rounded-xl p-4 resize-none focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <button
            onClick={submit}
            disabled={loading}
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-4 font-semibold transition duration-300 disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Image"}
          </button>

          <div className="mt-8 flex-1">

            <h3 className="font-bold text-lg flex items-center gap-2">
              <ImageIcon size={20} />
              AI Response
            </h3>

            <div className="mt-3 bg-gray-50 rounded-2xl p-5 border min-h-[250px] overflow-auto">

              {loading ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              ) : answer ? (
                <p className="whitespace-pre-wrap leading-8 text-gray-700">
                  {answer}
                </p>
              ) : (
                <div className="text-center mt-20 text-gray-400">
                  AI answer will appear here.
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Aigenerated;