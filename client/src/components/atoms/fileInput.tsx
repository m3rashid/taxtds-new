import React from "react";
import { useDropzone } from "react-dropzone";
import { MdAddPhotoAlternate, MdOutlineClose } from "react-icons/md";

interface IProps {
  title?: string;
  name: string;
  setData: React.Dispatch<React.SetStateAction<any>>;
}

const FileInput = ({ title, name, setData }: IProps) => {
  const [image, setImage] = React.useState<string>("");
  const onDrop = React.useCallback((acceptedFiles: any) => {
    const url = URL.createObjectURL(acceptedFiles[0]);
    setImage(url);

    setData((prev: any) => ({
      ...prev,
      [name]: acceptedFiles[0],
    }));
  }, []);

  const removeImage = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    setImage("");
    setData((prev: any) => ({ ...prev, [name]: "" }));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div className="bg-[white] p-4 mb-4 rounded-md shadow-md border-x-4 border-buttonSuccess flex flex-col items-center gap-4 ">
        <p className="text-lg mb-0">
          {title
            ? image
              ? `Selected ${title}`
              : `Select ${title}`
            : "Select Photo"}
        </p>

        {!image ? (
          <div className="flex flex-col items-center gap-4" {...getRootProps()}>
            <input name={name} {...getInputProps()} />
            <p className="text-darkFgTwo">
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
        ) : (
          <div className="relative">
            <MdOutlineClose
              size={30}
              className="absolute top-0 right-0 bg-red-400 rounded-full p-1 mt-3 mr-3 cursor-pointer"
              onClick={removeImage}
            />
            <img className="rounded-md" src={image} alt="" />
          </div>
        )}
      </div>
    </>
  );
};

export default FileInput;
