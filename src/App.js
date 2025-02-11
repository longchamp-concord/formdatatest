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
      var token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IkVXSWJfdjhYRUo4VDVPeUZvVVFJNGl1ODhNQi1pS1JQODV2RldXaVJoYzgiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiI0ZWI3Y2Y4YS02NzY5LTQyZDgtOTFiYy04YzgyYzBhZTBlYzgiLCJpc3MiOiJodHRwczovL2Rldi5hY2NvdW50LmJhc3lzcHJvLmNvbS84YzU0MzU0Ny1jOTY1LTRhZDktYjg3Mi0zNmYxODU4Y2E4N2MvdjIuMC8iLCJleHAiOjE3MzkzMTgyMDEsIm5iZiI6MTczOTMwODEyMSwib2lkIjoiOTk3MzQ2MDMtYTliMy00MWM0LTk3NDAtMDlkZjJhZmQxNGRhIiwic3ViIjoiOTk3MzQ2MDMtYTliMy00MWM0LTk3NDAtMDlkZjJhZmQxNGRhIiwibmFtZSI6Ik1heHggTG9uZ2NoYW1wIiwiZXh0ZW5zaW9uX1N5c3RlbVVzZXJJZCI6IjBhMjk0YzMyLWNhYTAtNDZiYy1hNmM1LTdmYjMxMjg4Y2I1NiIsImV4dGVuc2lvbl9Sb2xlQ29kZSI6IlNVIiwiZW1haWxzIjpbIm1heC5sb25nY2hhbXBAY29uY29yZHVzYS5jb20iXSwibm9uY2UiOiJlNDc1ZDg1Mi0zNmEzLTQ2NzQtOGExOC0zZTA5OGJlYmJlYzEiLCJzY3AiOiJhcGkucmVhZCIsImF6cCI6IjY0OWE4NGMwLWI2MmItNDQ0MS05ZmJjLTQ4NzVlNDRhMThmYyIsInZlciI6IjEuMCIsImlhdCI6MTczOTMwODEyMX0.NB3aBqD3qOmleeVD0SZrTTJ9-g7ll_uHOP2XS19xCWarQSikrT425WGfAuQYqn0EzV6jsbYnbSsPCvdnNWVpk_cwz-bL-MX_qq8xlihR_gHWaBp9JN6ofe433-nZ67Rp93880vkt_Gno-k-zkU1JenYiURw1c-5I24bftY6eQjOYVBbIbj35uJ9jPk-sOvQ7K6HGnRfzmb6uGxvTddvXqAnqQF7nnEYgEGykaAfdmCHSXOkJN4Xif2NqcR3a14atkKvR0xYC4bWPWZv_XSswj7Bt2jWhbC5fMdrLsXDxnUG9TXzfQ2Ye96hKj2oN9XWWAoY0qzygu4mtcsavKrPcEQ"
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
