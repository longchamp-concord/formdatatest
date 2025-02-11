import React, { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { styled } from "@mui/material/styles";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Button from "@mui/material/Button";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const FileUploader = ({ name, acceptedTypes, disabled }) => {
  const { ...methods } = useFormContext();

  const fileData = methods.watch(name) || "";
  const [preview, setPreview] = useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length) {
        methods.setValue(name, acceptedFiles[0]);
      }
    },
    [methods.setValue, name]
  );

  useEffect(() => {
    if (fileData && typeof fileData === "object") {
      const objectUrl = URL.createObjectURL(fileData);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(fileData);
    }
  }, [fileData]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedTypes,
    disabled,
  });

  useEffect(() => {
    methods.register(name);
    return () => {
      methods.unregister(name);
    };
  }, [methods.register, methods.unregister, name]);

  return (
    <div className="file-upload-wrapper">
      <div
        className={"file-upload" + (disabled ? " disabled" : "")}
        {...getRootProps()}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
          marginBottom: "10px"
        }}
      >
        {!disabled ? (
          preview ? (
            <>
                <img
                    src={preview}
                    alt={"Uploaded Image"}
                    className="uploaded-logo"
                />
              <p>Drag new logo here (only .png or .jpg file types)</p>
            </>
          ) : (
            <>
              <p>Drag logo here to upload (only .png or .jpg file types)</p>
            </>
          )
        ) : preview === "" ? (
          <p>uploaded</p>
        ) : (
          <img src={preview} alt={"Uploaded Image"} className="uploaded-logo" />
        )}
        <VisuallyHiddenInput {...getInputProps()} />
      </div>
      {!disabled && (
        <Button
          variant="text"
          endIcon={<DeleteOutlinedIcon />}
          className="remove-logo-button"
          onClick={() => {
            methods.setValue(name, "");
          }}
        >
          Remove Logo
        </Button>
      )}
    </div>
  );
};
export default FileUploader;
FileUploader.propTypes = {
  name: PropTypes.string.isRequired,
  acceptedTypes: PropTypes.object.isRequired, //ex: {"image/png": ['.png'], "image/jpeg": ['.jpg']}
  disabled: PropTypes.bool,
};


