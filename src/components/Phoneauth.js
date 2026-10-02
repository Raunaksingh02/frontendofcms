import React, { useState } from "react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import { auth } from "./Firebase";

const PhoneAuth = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] =
    useState(null);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier =
        new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "normal",
            callback: () => {
              console.log(
                "Recaptcha Verified"
              );
            },
          }
        );
    }
  };

  const sendOTP = async () => {
    try {
      setupRecaptcha();

      const appVerifier =
        window.recaptchaVerifier;

      const result =
        await signInWithPhoneNumber(
          auth,
          phone,
          appVerifier
        );

      setConfirmationResult(result);

      alert("OTP Sent Successfully");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const verifyOTP = async () => {
    try {
      if (!confirmationResult) {
        return alert(
          "Please send OTP first"
        );
      }

      const result =
        await confirmationResult.confirm(
          otp
        );

      console.log(
        "Logged In User:",
        result.user
      );

      alert(
        "Login Successful"
      );
    } catch (error) {
      console.error(error);
      alert("Invalid OTP");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h2>Firebase Phone OTP Login</h2>

      <input
        type="text"
        placeholder="+919999999999"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <button
        onClick={sendOTP}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
        }}
      >
        Send OTP
      </button>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) =>
          setOtp(e.target.value)
        }
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <button
        onClick={verifyOTP}
        style={{
          width: "100%",
          padding: "10px",
        }}
      >
        Verify OTP
      </button>

      <div
        id="recaptcha-container"
        style={{ marginTop: "20px" }}
      ></div>
    </div>
  );
};

export default PhoneAuth;