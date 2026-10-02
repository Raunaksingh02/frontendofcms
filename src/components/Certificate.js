import React, {
  useRef,
} from "react";

import html2canvas from "html2canvas";

import jsPDF from "jspdf";

const Certificate = ({
  studentName = "Girdhar Gopal Singh",
  course = {
    title:
      "CERTIFICATION, TRAINING_NAME",
  },
  creatorName = "Shailendra Chauhan",
  completionDate = "DD-MM-YYYY",
  certificateId = "12HH1212FD",
}) => {
  /*
  =====================================================
  REF
  =====================================================
  */

  const certificateRef =
    useRef(null);

  /*
  =====================================================
  DOWNLOAD PDF
  =====================================================
  */

  const downloadCertificate =
    async () => {
      const element =
        certificateRef.current;

      /*
      =====================================================
      HIGH QUALITY CANVAS
      =====================================================
      */

      const canvas =
        await html2canvas(
          element,
          {
            scale: 4,
            useCORS: true,
            backgroundColor:
              "#f8f8f8",
          }
        );

      const image =
        canvas.toDataURL(
          "image/png",
          1.0
        );

      /*
      =====================================================
      PDF
      =====================================================
      */

      const pdf =
        new jsPDF({
          orientation:
            "landscape",
          unit: "px",
          format: [
            1100,
            760,
          ],
        });

      pdf.addImage(
        image,
        "PNG",
        0,
        0,
        1100,
        760
      );

      pdf.save(
        `${studentName}-certificate.pdf`
      );
    };

  return (
    <div
      className="
      w-full
      min-h-screen
      bg-gray-200
      py-10
      px-4
      flex
      flex-col
      items-center
      overflow-auto
      "
    >
      {/* DOWNLOAD BUTTON */}

      <button
        onClick={
          downloadCertificate
        }
        className="
        mb-10
        px-8
        py-4
        bg-[#114ea7]
        hover:bg-[#0d3f88]
        text-white
        rounded-lg
        font-bold
        shadow-xl
        transition-all
        duration-300
        "
      >
        Download Certificate
      </button>

      {/* CERTIFICATE */}

      <div
        ref={
          certificateRef
        }
        id="certificate"
        className="
        relative
        w-[1100px]
        min-h-[760px]
        bg-[#f8f8f8]
        border-[8px]
        border-[#114ea7]
        shadow-2xl
        overflow-hidden
        flex
        flex-col
        "
      >
        {/* TOP BAR */}

        <div className="relative w-full h-7 bg-[#11b8ef] flex-shrink-0">
          <div className="absolute top-0 left-0 w-[120px] h-full bg-[#114ea7]"></div>
        </div>

        {/* BOTTOM BAR */}

        <div className="absolute bottom-0 right-0 w-[120px] h-7 bg-[#114ea7]"></div>

        {/* CONTENT */}

        <div
          className="
          flex-1
          px-[70px]
          pt-[55px]
          pb-[45px]
          flex
          flex-col
          justify-between
          "
        >
          {/* TOP SECTION */}

          <div>
            {/* HEADER */}

            <div className="flex items-center justify-center gap-6">
              {/* MEDAL */}

              <div className="relative flex-shrink-0">
                <div
                  className="
                  relative
                  w-20
                  h-20
                  rounded-full
                  bg-yellow-300
                  border-[8px]
                  border-yellow-500
                  shadow-lg
                  "
                >
                  <div
                    className="
                    absolute
                    inset-2
                    rounded-full
                    border-[3px]
                    border-yellow-100
                    "
                  ></div>
                </div>

                {/* LEFT RIBBON */}

                <div
                  className="
                  absolute
                  left-3
                  -bottom-7
                  w-5
                  h-9
                  bg-yellow-300
                  "
                  style={{
                    clipPath:
                      "polygon(0 0,100% 0,50% 100%)",
                  }}
                ></div>

                {/* RIGHT RIBBON */}

                <div
                  className="
                  absolute
                  right-3
                  -bottom-7
                  w-5
                  h-9
                  bg-yellow-500
                  "
                  style={{
                    clipPath:
                      "polygon(0 0,100% 0,50% 100%)",
                  }}
                ></div>
              </div>

              {/* TITLE */}

              <div>
                <h1
                  className="
                  text-[64px]
                  font-black
                  leading-none
                  tracking-[3px]
                  text-[#114ea7]
                  "
                >
                  CERTIFICATE
                </h1>

                <p
                  className="
                  mt-3
                  text-center
                  text-sm
                  tracking-[6px]
                  text-gray-700
                  "
                >
                  OF COMPLETION
                </p>
              </div>
            </div>

            {/* AWARD */}

            <div className="mt-16 text-center">
              <p className="text-lg font-semibold text-gray-600">
                PROUDLY AWARDED TO
              </p>

              <h2
                className="
                mt-5
                text-[44px]
                font-black
                text-gray-700
                "
              >
                {studentName}
              </h2>

              {/* LINE */}

              <div
                className="
                w-[420px]
                h-[2px]
                bg-gray-400
                mx-auto
                mt-5
                "
              ></div>

              {/* DESCRIPTION */}

              <p
                className="
                mt-5
                text-base
                leading-8
                text-gray-600
                uppercase
                "
              >
                For successfully completing the course
                <br />

                <span className="font-bold tracking-wide">
                  {
                    course?.title
                  }
                </span>
              </p>
            </div>

            {/* CENTER LOGO */}

            <div className="mt-12 flex flex-col items-center">
              <div
                className="
                w-[70px]
                h-5
                bg-cyan-400
                "
                style={{
                  clipPath:
                    "polygon(50% 0,100% 50%,50% 100%,0 50%)",
                }}
              ></div>

              <div
                className="
                w-[70px]
                h-5
                bg-sky-500
                mt-2
                "
                style={{
                  clipPath:
                    "polygon(50% 0,100% 50%,50% 100%,0 50%)",
                }}
              ></div>

              <div
                className="
                w-[70px]
                h-5
                bg-cyan-700
                mt-2
                "
                style={{
                  clipPath:
                    "polygon(50% 0,100% 50%,50% 100%,0 50%)",
                }}
              ></div>
            </div>
          </div>

          {/* FOOTER */}

          <div className="mt-10">
            <div className="flex items-end justify-between">
              {/* LEFT */}

              <div>
                <p className="text-sm font-bold text-gray-800">
                  Date:
                  {" "}
                  {completionDate}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Certificate Id:
                  {" "}
                  {certificateId}
                </p>
              </div>

              {/* SIGN */}

              <div className="text-center">
                <div className="text-3xl text-blue-400 italic">
                  ~~~
                </div>

                <h3 className="text-lg font-bold text-gray-800">
                  {creatorName}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Founder & CEO
                </p>
              </div>
            </div>

            {/* VERIFY */}

            <div
              className="
              mt-10
              text-center
              text-xs
              text-gray-500
              "
            >
              The certificate can be verified at
              {" "}
              www.yoursite.com/certificate/verify
              {" "}
              to check the authenticity of this  certificate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;