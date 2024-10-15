import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FaFile } from 'react-icons/fa';
import { FiUploadCloud } from 'react-icons/fi';
import { Toaster, toast } from 'sonner'

const Uploader = ({ updateParentFile }) => {
    const [file, setFile] = useState(null)


    const { getRootProps, getInputProps } = useDropzone(
        {
            multiple: false,
            accept: {
                'image/jpeg': ['.jpg', '.jpeg'],
                'image/png': ['.png']
            },
            maxSize: 100000,
            onDrop: (acceptedFiles) => {
                updateParentFile(acceptedFiles[0])
                setFile(acceptedFiles[0].name)
                toast(acceptedFiles[0].name + ' uploaded!')

            },
        }
    )
    return (
        <div className='w-full text-center'>
            <div {...getRootProps()} className="px-6 py-8 border-2 border-border border-dashed bg-main rounded-md cursor-pointer">
                <input name='image' {...getInputProps()} />
                <span className='mx-auto flex-colo text-subMain text-3xl'>
                    <FiUploadCloud />
                </span>
                <p className="text-sm mt-2">Drag your image here</p>
                <em className="text-xs text-border">(only image files will be accepted)</em>
                {file && <span className="mx-auto flex flex-rows gap-2 mt-3 text-sm"><FaFile></FaFile>
                    {file}</span>}


            </div>

        </div>
    )
}

export default Uploader
