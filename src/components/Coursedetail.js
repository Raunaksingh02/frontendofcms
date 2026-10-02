import React, {
  useState,
  useRef,
} from "react";

import {
  FaPlay,
  FaClock,
  FaChevronRight,
} from "react-icons/fa";

import {
  MdVideoLibrary,
} from "react-icons/md";

const Coursedetail = ({
  course,
  setActiveScreen,
}) => {
  const videoRef =
    useRef(null);

  const [
    selectedVideo,
    setSelectedVideo,
  ] = useState(
    course?.videos?.[0] || null
  );

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">
            No Course Selected
          </h1>

          <button
            onClick={() =>
              setActiveScreen(
                "Courses"
              )
            }
            className="mt-5 px-6 py-3 bg-orange-500 rounded-xl"
          >
            Back To Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white">
      <div className="max-w-[1800px] mx-auto px-4 py-6">
        {/* BACK */}
         
         <div className="mb-3">
  <button
    onClick={() =>
      setActiveScreen(
        "Courses"
      )
    }
    className="
      inline-flex
      items-center
      gap-2
      px-4
      py-2
      text-sm
      font-medium
      rounded-lg
      bg-[#181818]
      border
      border-[#2a2a2a]
      hover:border-orange-500/50
      hover:text-orange-400
      transition-all
      duration-300
    "
  >
    ← Back
  </button>
</div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6">
          {/* LEFT */}

          <div>
            {/* VIDEO */}

            <div className="bg-black rounded-2xl overflow-hidden border border-[#272727]">
              {selectedVideo ? (
                <video
                  ref={videoRef}
                  controls
                  className="
                  w-full
                  aspect-video
                  bg-black
                  object-contain
                "
                  src={
                    selectedVideo.videoUrl
                  }
                />
              ) : (
                <div className="aspect-video flex items-center justify-center">
                  No Video Available
                </div>
              )}
            </div>

            {/* COURSE INFO */}

            <div className="mt-6">
              <h1 className="text-4xl font-bold">
                {course.title}
              </h1>

              <p className="text-gray-400 mt-6 text-lg leading-8">
                {
                  course.description
                }
              </p>
            </div>

            {/* FEATURES */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
              <div className="bg-[#181818] border border-[#2a2a2a] rounded-2xl p-5">
                <div className="w-14 h-14 rounded-xl bg-orange-500/20 flex items-center justify-center mb-4">
                  <MdVideoLibrary className="text-orange-500 text-2xl" />
                </div>

                <h3 className="text-2xl font-bold">
                  {
                    course.videos
                      ?.length
                  }
                </h3>

                <p className="text-gray-400">
                  Video Lectures
                </p>
              </div>

              <div className="bg-[#181818] border border-[#2a2a2a] rounded-2xl p-5">
                <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                  <FaClock className="text-blue-400 text-xl" />
                </div>

                <h3 className="text-2xl font-bold">
                  Lifetime
                </h3>

                <p className="text-gray-400">
                  Course Access
                </p>
              </div>

              <div className="bg-[#181818] border border-[#2a2a2a] rounded-2xl p-5">
                <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center mb-4">
                  <FaPlay className="text-green-400 text-xl" />
                </div>

                <h3 className="text-2xl font-bold">
                  HD
                </h3>

                <p className="text-gray-400">
                  Video Quality
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}

          <div>
            <div className="sticky top-5">
              <div className="bg-[#181818] border border-[#2a2a2a] rounded-2xl overflow-hidden">
                {/* POSTER */}

                <div className="relative">
                  <img
                    src={
                      course.poster
                        ?.url
                    }
                    alt={
                      course.title
                    }
                    className="
                    w-full
                    h-[240px]
                    object-cover
                  "
                  />

                  <div className="absolute bottom-4 left-4">
                    <span className="bg-orange-500 px-4 py-2 rounded-full text-sm font-semibold">
                      {
                        course.category
                      }
                    </span>
                  </div>
                </div>

                {/* PRICE */}

                <div className="p-6 border-b border-[#2a2a2a]">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-400 text-sm">
                        Course Price
                      </p>

                      
                    </div>

                    <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold">
                      Premium
                    </div>
                  </div>

                  <button
                    className="
                    mt-6
                    w-full
                    h-[58px]
                    bg-orange-500
                    hover:bg-orange-600
                    rounded-xl
                    font-bold
                    text-lg
                    transition-all
                    duration-300
                    flex
                    items-center
                    justify-center
                    gap-3
                  "
                  >
                    Enroll Now

                    <FaChevronRight />
                  </button>
                </div>

                {/* VIDEOS */}

                <div className="max-h-[700px] overflow-y-auto">
                  {course.videos?.map(
                    (
                      video,
                      index
                    ) => (
                      <div
                        key={
                          video._id
                        }
                        onClick={() =>
                          setSelectedVideo(
                            video
                          )
                        }
                        className={`p-5 border-b border-[#2a2a2a] cursor-pointer transition-all ${
                          selectedVideo?._id ===
                          video._id
                            ? "bg-[#272727]"
                            : "hover:bg-[#202020]"
                        }`}
                      >
                        <div className="flex gap-4">
                          <div className="w-[120px] h-[70px] bg-black rounded-xl flex items-center justify-center">
                            <FaPlay className="text-orange-500" />
                          </div>

                          <div>
                            <h3 className="font-semibold text-sm">
                              {
                                video.title
                              }
                            </h3>

                            <div className="mt-2 text-xs text-gray-400">
                              Lecture{" "}
                              {index + 1}
                            </div>

                            <div className="mt-1 text-xs text-gray-500">
                              {
                                video.duration
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coursedetail;