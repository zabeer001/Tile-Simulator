import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import Image from "next/image";

const SVGUpload = ({ onUpload }: { onUpload: (data: string) => void }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const svgData = event.target.result as string;
          setPreview(svgData);
          onUpload(svgData);
        }
      };
      reader.readAsText(file);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/svg+xml": [".svg"] },
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className="border border-gray-300 p-6 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer bg-gray-50"
    >
      <input {...getInputProps()} />
      {preview ? (
        <div className="w-full flex justify-center">
          <Image src={`data:image/svg+xml,${encodeURIComponent(preview)}`} alt="SVG Preview" className="h-24" />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <UploadCloud className="h-10 w-10 text-gray-500" />
          <p className="text-gray-600">Drag and drop SVG here, or click to upload</p>
          <button type="button" className="bg-red-500 text-white px-4 py-2 mt-3 rounded-md">Add Image</button>
        </div>
      )}
    </div>
  );
};

export default SVGUpload;
