import React from "react";
import { useDropzone } from "react-dropzone";
import { MdAddPhotoAlternate } from "react-icons/md";

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
        className="bg-[white] p-4 mb-4 rounded-md shadow-md border-x-4 border-buttonSuccess flex flex-col items-center gap-4"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <p className="text-darkFgTwo">
          {title ? title : "Select Photo"}
          <br />
          {isDragActive
            ? "Drop the files here ..."
            : "Drag and drop files here, or click to select files"}
        </p>
        <div className="w-full h-full flex items-center justify-center py-4 border-2 rounded-md border-dashed border-darkFgTwo">
          <MdAddPhotoAlternate
            className="opacity-40"
            style={{ fontSize: "4rem" }}
          />
        </div>
      </div>
    </>
  );
};

export default FileInput;
