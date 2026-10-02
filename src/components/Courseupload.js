import React, {
  useState,
  useEffect,
} from "react";

import axios from "axios";

import {
  Upload,
  Video,
  CheckCircle2,
  Loader2,
  BookOpen,
  ImageIcon,
  IndianRupee,
  Layers3,
  Plus,
  Library,
} from "lucide-react";

const API =
  "http://localhost:5001/api/course";

const Courseupload = () => {
  /*
  ==================================================
  COURSE STATE
  ==================================================
  */

  const [courseData, setCourseData] =
    useState({
      title: "",
      description: "",
      category: "",
      price: "",
    });

  const [poster, setPoster] =
    useState(null);

  const [posterPreview, setPosterPreview] =
    useState("");

  /*
  ==================================================
  ALL COURSES
  ==================================================
  */

  const [allCourses, setAllCourses] =
    useState([]);

  const [
    selectedCourse,
    setSelectedCourse,
  ] = useState("");

  /*
  ==================================================
  COURSE CREATE STATE
  ==================================================
  */

  const [
    courseLoading,
    setCourseLoading,
  ] = useState(false);

  const [courseCreated, setCourseCreated] =
    useState(false);

  const [courseId, setCourseId] =
    useState("");

  /*
  ==================================================
  LECTURE STATE
  ==================================================
  */

  const [lectureData, setLectureData] =
    useState({
      title: "",
      duration: "",
      isPreviewFree: false,
    });

  const [video, setVideo] =
    useState(null);

  const [videoName, setVideoName] =
    useState("");

  const [uploadProgress, setUploadProgress] =
    useState(0);

  const [
    lectureLoading,
    setLectureLoading,
  ] = useState(false);

  const [lectures, setLectures] =
    useState([]);

  /*
  ==================================================
  FETCH COURSES
  ==================================================
  */

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses =
    async () => {
      try {
        const response =
          await axios.get(
            `${API}/all`
          );

        setAllCourses(
          response.data.courses
        );
      } catch (error) {
        console.log(error);
      }
    };

  /*
  ==================================================
  HANDLE INPUT
  ==================================================
  */

  const handleChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]:
        e.target.value,
    });
  };

  /*
  ==================================================
  HANDLE POSTER
  ==================================================
  */

  const handlePoster = (e) => {
    const file =
      e.target.files[0];

    if (!file) return;

    setPoster(file);

    setPosterPreview(
      URL.createObjectURL(file)
    );
  };

  /*
  ==================================================
  CREATE COURSE
  ==================================================
  */

  const createCourse = async (
    e
  ) => {
    e.preventDefault();

    try {
      setCourseLoading(true);

      const formData =
        new FormData();

      formData.append(
        "title",
        courseData.title
      );

      formData.append(
        "description",
        courseData.description
      );

      formData.append(
        "category",
        courseData.category
      );

      formData.append(
        "price",
        courseData.price
      );

      if (poster) {
        formData.append(
          "poster",
          poster
        );
      }

      const response =
        await axios.post(
          `${API}/create`,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      setCourseId(
        response.data.course._id
      );

      setSelectedCourse(
        response.data.course._id
      );

      setCourseCreated(true);

      fetchCourses();

      alert(
        "Course created successfully"
      );
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Something went wrong"
      );
    } finally {
      setCourseLoading(false);
    }
  };

  /*
  ==================================================
  HANDLE LECTURE CHANGE
  ==================================================
  */

  const handleLectureChange = (
    e
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setLectureData({
      ...lectureData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  /*
  ==================================================
  HANDLE VIDEO
  ==================================================
  */

  const handleVideo = (e) => {
    const file =
      e.target.files[0];

    if (!file) return;

    setVideo(file);

    setVideoName(file.name);
  };

  /*
  ==================================================
  ADD LECTURE
  ==================================================
  */

  const addLecture = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLectureLoading(true);

      setUploadProgress(0);

      const formData =
        new FormData();

      formData.append(
        "title",
        lectureData.title
      );

      formData.append(
        "duration",
        lectureData.duration
      );

      formData.append(
        "isPreviewFree",
        lectureData.isPreviewFree
      );

      formData.append(
        "video",
        video
      );

      const response =
        await axios.post(
          `${API}/add-lecture/${courseId}`,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },

            onUploadProgress: (
              progressEvent
            ) => {
              const percent =
                Math.round(
                  (progressEvent.loaded *
                    100) /
                    progressEvent.total
                );

              setUploadProgress(
                percent
              );
            },
          }
        );

      setLectures([
        ...lectures,
        response.data.course
          .videos[
          response.data.course
            .videos.length -
            1
        ],
      ]);

      /*
      RESET
      */

      setLectureData({
        title: "",
        duration: "",
        isPreviewFree: false,
      });

      setVideo(null);

      setVideoName("");

      setUploadProgress(0);

      alert(
        "Lecture uploaded successfully"
      );
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Upload failed"
      );
    } finally {
      setLectureLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}

        <div className="mb-10">
          <h1 className="text-4xl font-black">
            LMS Course Upload
          </h1>

          <p className="text-slate-400 mt-2">
            Professional course
            management and lecture
            upload system
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT */}

          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-7 h-7 text-orange-400" />

              <h2 className="text-2xl font-bold">
                Create Course
              </h2>
            </div>

            <form
              onSubmit={createCourse}
              className="space-y-5"
            >
              {/* TITLE */}

              <div>
                <label className="block mb-2 text-sm font-semibold">
                  Course Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={
                    courseData.title
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter course title"
                  className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-4 outline-none focus:border-orange-400 transition-all"
                />
              </div>

              {/* DESCRIPTION */}

              <div>
                <label className="block mb-2 text-sm font-semibold">
                  Description
                </label>

                <textarea
                  rows="5"
                  name="description"
                  value={
                    courseData.description
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter course description"
                  className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-4 outline-none focus:border-orange-400 transition-all"
                />
              </div>

              {/* CATEGORY */}

              <div>
                <label className="block mb-2 text-sm font-semibold">
                  Category
                </label>

                <div className="relative">
                  <Layers3 className="absolute left-4 top-4 text-slate-400 w-5 h-5" />

                  <input
                    type="text"
                    name="category"
                    value={
                      courseData.category
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Web Development"
                    className="w-full bg-slate-950 border border-slate-700 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-orange-400 transition-all"
                  />
                </div>
              </div>

              {/* PRICE */}

              <div>
                <label className="block mb-2 text-sm font-semibold">
                  Price
                </label>

                <div className="relative">
                  <IndianRupee className="absolute left-4 top-4 text-slate-400 w-5 h-5" />

                  <input
                    type="number"
                    name="price"
                    value={
                      courseData.price
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="2999"
                    className="w-full bg-slate-950 border border-slate-700 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-orange-400 transition-all"
                  />
                </div>
              </div>

              {/* POSTER */}

              <div>
                <label className="block mb-2 text-sm font-semibold">
                  Course Poster
                </label>

                <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-3xl p-8 cursor-pointer hover:border-orange-400 transition-all">
                  <ImageIcon className="w-12 h-12 text-orange-400 mb-3" />

                  <p className="text-slate-300">
                    Click to upload
                    poster
                  </p>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={
                      handlePoster
                    }
                    hidden
                  />
                </label>

                {posterPreview && (
                  <img
                    src={
                      posterPreview
                    }
                    alt="preview"
                    className="w-full h-60 object-cover rounded-2xl mt-5 border border-slate-700"
                  />
                )}
              </div>

              {/* BUTTON */}

              <button
                type="submit"
                disabled={
                  courseLoading
                }
                className="w-full bg-orange-500 hover:bg-orange-600 transition-all rounded-2xl py-4 font-bold flex items-center justify-center gap-3"
              >
                {courseLoading ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" />

                    Creating Course for Uploading Lectures...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />

                    Create Course
                  </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT */}

          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Library className="w-7 h-7 text-orange-400" />

              <h2 className="text-2xl font-bold">
                Upload Lectures
              </h2>
            </div>

            {/* COURSE SELECT */}

            <div className="mb-6">
              <label className="block mb-2 text-sm font-semibold">
                Select Existing Course
              </label>

              <select
                value={
                  selectedCourse
                }
                onChange={(e) => {
                  setSelectedCourse(
                    e.target.value
                  );

                  setCourseId(
                    e.target.value
                  );

                  setCourseCreated(
                    true
                  );
                }}
                className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-4 outline-none focus:border-orange-400"
              >
                <option value="">
                  Select Course
                </option>

                {allCourses.map(
                  (course) => (
                    <option
                      key={
                        course._id
                      }
                      value={
                        course._id
                      }
                    >
                      {
                        course.title
                      }
                    </option>
                  )
                )}
              </select>
            </div>

            {!courseCreated &&
            !selectedCourse ? (
              <div className="h-[400px] flex flex-col items-center justify-center text-center">
                <CheckCircle2 className="w-20 h-20 text-slate-600 mb-5" />

                <h3 className="text-2xl font-bold">
                  Create Or Select
                  Course
                </h3>

                <p className="text-slate-400 mt-2">
                  Select an existing
                  course or create a
                  new course first
                </p>
              </div>
            ) : (
              <>
                <form
                  onSubmit={
                    addLecture
                  }
                  className="space-y-5"
                >
                  {/* TITLE */}

                  <div>
                    <label className="block mb-2 text-sm font-semibold">
                      Lecture Title
                    </label>

                    <input
                      type="text"
                      name="title"
                      value={
                        lectureData.title
                      }
                      onChange={
                        handleLectureChange
                      }
                      placeholder="Introduction"
                      className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-4 outline-none focus:border-orange-400"
                    />
                  </div>

                  {/* DURATION */}

                  <div>
                    <label className="block mb-2 text-sm font-semibold">
                      Duration
                    </label>

                    <input
                      type="text"
                      name="duration"
                      value={
                        lectureData.duration
                      }
                      onChange={
                        handleLectureChange
                      }
                      placeholder="12:45"
                      className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-4 outline-none focus:border-orange-400"
                    />
                  </div>

                  {/* FREE PREVIEW */}

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="isPreviewFree"
                      checked={
                        lectureData.isPreviewFree
                      }
                      onChange={
                        handleLectureChange
                      }
                    />

                    <span>
                      Free Preview
                    </span>
                  </div>

                  {/* VIDEO */}

                  <div>
                    <label className="block mb-2 text-sm font-semibold">
                      Upload Video
                    </label>

                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-3xl p-8 cursor-pointer hover:border-orange-400 transition-all">
                      <Video className="w-12 h-12 text-orange-400 mb-3" />

                      <p className="text-slate-300">
                        Click to upload
                        lecture video
                      </p>

                      <input
                        type="file"
                        accept="video/*"
                        onChange={
                          handleVideo
                        }
                        hidden
                      />
                    </label>

                    {videoName && (
                      <div className="mt-4 bg-slate-950 border border-slate-700 rounded-2xl p-4">
                        <p className="text-sm text-slate-300 truncate">
                          {
                            videoName
                          }
                        </p>
                      </div>
                    )}
                  </div>

                  {/* PROGRESS */}

                  {lectureLoading && (
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>
                          Uploading...
                        </span>

                        <span>
                          {
                            uploadProgress
                          }
                          %
                        </span>
                      </div>

                      <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
                        <div
                          style={{
                            width: `${uploadProgress}%`,
                          }}
                          className="bg-orange-500 h-full transition-all duration-300"
                        />
                      </div>
                    </div>
                  )}

                  {/* BUTTON */}

                  <button
                    type="submit"
                    disabled={
                      lectureLoading
                    }
                    className="w-full bg-orange-500 hover:bg-orange-600 transition-all rounded-2xl py-4 font-bold flex items-center justify-center gap-3"
                  >
                    {lectureLoading ? (
                      <>
                        <Loader2 className="animate-spin w-5 h-5" />

                        Uploading...
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" />

                        Add Lecture
                      </>
                    )}
                  </button>
                </form>

                {/* LECTURE LIST */}

                <div className="mt-8 space-y-4">
                  <h3 className="text-xl font-bold">
                    Uploaded Lectures
                  </h3>

                  {lectures.map(
                    (
                      lecture,
                      index
                    ) => (
                      <div
                        key={index}
                        className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center justify-between"
                      >
                        <div>
                          <h4 className="font-semibold">
                            {
                              lecture.title
                            }
                          </h4>

                          <p className="text-sm text-slate-400">
                            Duration :
                            {
                              lecture.duration
                            }
                          </p>
                        </div>

                        <CheckCircle2 className="text-green-400 w-6 h-6" />
                      </div>
                    )
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courseupload;