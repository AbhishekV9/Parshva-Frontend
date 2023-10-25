import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

export default function FileUpload() {
  const [file, setFile] = useState([]);
  const [isUplaodButtonLoading, setIsUplaodButtonLoading] = useState(false);
  const [isDownloadButtonLoading, setIsDownloadButtonLoading] = useState(false);

  const uploadFile = (e) => {
    setFile(e.target.files[0]);
  };

  const downloadFile = () => {
    const fileId = localStorage.getItem("fileId");
    if (!fileId) {
      toast.error("Please upload the file first");
      return;
    }
    window.open(
      `https://drive.google.com/u/0/uc?id=${fileId}&export=download",
      "_blank`
    );
  };

  const handleFileUplaod = async () => {
    try {
      let fileId = localStorage.getItem("fileId");
      if (fileId) {
        window.open(
          `https://drive.google.com/u/0/uc?id=${fileId}&export=download`,
          "_blank"
        );
        return;
      } else if (file?.length === 0) {
        toast.error("Please provide File to uplaod");
        return;
      }
      setIsUplaodButtonLoading(true);
      let formData = new FormData();
      formData.append("file", file);
      const result = await axios.post(
        "https://parshva-screening-backend.onrender.com/uplaodFle",
        formData
      );
      fileId = result?.data?.data?.id;
      localStorage.setItem("fileId", fileId);
      window.open(
        `https://drive.google.com/u/0/uc?id=${fileId}&export=download`,
        "_blank"
      );
      setFile([]);
      toast.success("File Uploaded SuccessFully");
    } catch (error) {
      toast.error(error?.response?.data ?? "Something went Wrong");
    } finally {
      setIsUplaodButtonLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "80%",
        alignItems: "center",
      }}
    >
      <div>
        <div style={{ textAlign: "center", margin: "20px" }}>
          <label style={{ fontSize: "18px" }}>Upload File</label>
          <span>
            &nbsp; &nbsp; (Please upload file only once otherwise duplicate
            records will bew created)
          </span>
        </div>
        <div style={{ textAlign: "center" }}>
          <input
            type="file"
            onChange={uploadFile}
            style={{ padding: "10px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <Button
            variant="contained"
            onClick={handleFileUplaod}
            laoding={isUplaodButtonLoading}
          >
            {isUplaodButtonLoading ? (
              <CircularProgress
                size={20}
                style={{ marginRight: 5, color: "white" }}
              />
            ) : null}
            Upload
          </Button>
        </div>
        <div>
          {isUplaodButtonLoading ? (
            <div style={{ width: "700px", marginTop: "15px" }}>
              Please wait for some minutes as sheet is uploading to cloud and
              data been uploaded to mongoDB atlas. please don't reload and
              please don't leave the page.
            </div>
          ) : null}
        </div>
      </div>
      <div>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <Button
            variant="contained"
            onClick={downloadFile}
            laoding={isDownloadButtonLoading}
          >
            {isDownloadButtonLoading ? (
              <CircularProgress
                size={20}
                style={{ marginRight: 5, color: "white" }}
              />
            ) : null}
            Download File
          </Button>
        </div>
      </div>
    </div>
  );
}
