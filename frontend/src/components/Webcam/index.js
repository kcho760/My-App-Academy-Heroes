import React, { useRef } from "react";
import Webcam from "react-webcam";
import "./webcam.css";

const WebcamCapture = ({ onCapture }) => {
  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc); // pass the captured image back to the parent
  };

  const videoConstraints = {
    width: 320,
    height: 240,
    facingMode: "user", // Add this if you want to use the front-facing camera
  };

  return (
    <div className="webcam-capture">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <div >
        <button className="capture-button" onClick={capture}>
          Capture photo
        </button>
      </div>
    </div>
  );
};

export default WebcamCapture;
