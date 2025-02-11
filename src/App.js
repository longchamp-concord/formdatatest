import React from "react";
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";
import FileUploader from "./FileUploader";

const App = () => {
  const methods = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      if (data.logo) {
        formData.append("logo", data.logo);
      } else {
        console.log("No file selected.");
        return;
      }
      
      // Note: Replace with new token or likely to get 401
      var token = ""
      const response = await axios.post("https://devbasysapimgmt.azure-api.net/iqsaas/v1/api/gateway/852edf4a-8965-45e9-9dd2-80881fad9c23/configuration/image?categoryCode=templates&fieldCode=add_logo_url", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
      });

      console.log("Upload success:", response.data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <h1>File Upload Demo</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FileUploader
            name="logo"
            acceptedTypes={{ "image/png": [".png"], "image/jpeg": [".jpg"] }}
            disabled={false}
          />
          <button type="submit" style={{ padding: "10px 20px", fontSize: "16px" }}>
            Submit
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default App;
