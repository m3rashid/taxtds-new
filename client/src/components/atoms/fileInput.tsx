import React from "react";
import { useDropzone } from "react-dropzone";
import AddPhotoAlternate from "@material-ui/icons/AddPhotoAlternate";

interface IProps {
  title?: string;
}

const FileInput = ({ title }: IProps) => {
  const onDrop = React.useCallback((acceptedFiles) => {
    // do something with the files
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div
        className="bg-[white] p-4 mb-4 rounded-md shadow-md border-x-4 border-buttonSuccess flex flex-col items-center gap-8"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <p className="text-darkFgTwo">
          {title ? title : "Select Avatar"}
          <br />
          {isDragActive
            ? "Drop the files here ..."
            : "Drag and drop files here, or click to select files"}
        </p>
        <div className="w-full h-full flex items-center justify-center pb-2">
          <AddPhotoAlternate
            className="text-darkFgTwo"
            style={{ fontSize: "4rem" }}
          />
        </div>
      </div>
    </>
  );
};

export default FileInput;
