import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaFile } from 'react-icons/fa';
import { FiUploadCloud } from 'react-icons/fi';
import { Toaster, toast } from 'sonner';

const Uploader = ({ updateParentFile }) => {
  const [file, setFile] = useState(null);

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    multiple: false,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxSize: 2 * 1024 * 1024, // 2MB
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length) {
        const selectedFile = acceptedFiles[0];
        updateParentFile(selectedFile);
        setFile(selectedFile.name);
        toast(`${selectedFile.name} uploaded!`);
      }
    },
    onDropRejected: () => {
      toast('File too large or invalid format!');
    },
  });

  return (
    <div className="w-full text-center">
      <div
        {...getRootProps()}
        className="px-6 py-8 border-2 border-border border-dashed bg-main rounded-md cursor-pointer"
      >
        <input {...getInputProps()} />
        <span className="mx-auto flex-colo text-subMain text-3xl">
          <FiUploadCloud />
        </span>
        <p className="text-sm mt-2">Drag your image here</p>
        <em className="text-xs text-border">(Only .jpg, .jpeg, .png files will be accepted)</em>
        {file && (
          <span className="mx-auto flex flex-rows gap-2 mt-3 text-sm">
            <FaFile /> {file}
          </span>
        )}
      </div>
    </div>
  );
};

export default Uploader;
