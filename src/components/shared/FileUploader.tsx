import { useCallback, useState } from "react";
import { useDropzone, type FileWithPath } from "react-dropzone";
import { Button } from "../ui/button";

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl?: string;
};

const FileUploader = ({ fieldChange }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState("");

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
      fieldChange(acceptedFiles);
    },
    [file],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });
  return (
    <div
      {...getRootProps()}
      className="flex-center flex cursor-pointer flex-col rounded-xl bg-dark-3"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div className="flex w-full flex-1 justify-center p-5 lg:p-10">
            <img src={fileUrl} alt="image" className="file_uploader-img" />
          </div>
          <p className="file_uploader-label select-none">
            Click or drag photo to replace
          </p>
        </>
      ) : (
        <div>
          {!isDragActive && (
            <div className="file_uploader-box">
              <img
                src="/assets/icons/file-upload.svg"
                alt="file uploader"
                width={96}
                height={77}
              />
              <h3 className="base-medium mb-2 mt-6 text-light-2">
                Drag photo here
              </h3>
              <p className="small-regular mb-6 text-light-4">SVG, PNG, JPG</p>

              <Button className="shad-button_dark_4">Select from device</Button>
            </div>
          )}

          {isDragActive && (
            <div className="file_uploader-box">
              <h3>Drop here</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
