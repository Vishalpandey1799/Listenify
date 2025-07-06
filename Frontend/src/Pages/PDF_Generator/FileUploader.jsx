import { useState, useCallback } from "react";
import { UploadCloud, FileText, File, X, AlertTriangle } from "lucide-react";
import { useAudioStore } from "../../Apicalls/Audio.apis.js";
import toast from "react-hot-toast";
const FileUploader = () => {
  const { generatePdf } = useAudioStore();
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const validFileTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const handleFileChange = useCallback((e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      validateFiles([selectedFile]);
    }
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateFiles([droppedFile]);
    }
  };

  const validateFiles = (fileList) => {
    setError(null);
    const file = fileList[0];

    if (!validFileTypes.includes(file.type)) {
      setError(
        `Invalid file type: ${file.name}. Only PDF and DOCX files are allowed.`
      );
      return;
    }

    setFiles([file]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (type) => {
    if (type === "application/pdf")
      return <FileText className="h-5 w-5 text-red-400" />;
    if (
      type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )
      return <File className="h-5 w-5 text-blue-400" />;
    return <File className="h-5 w-5" />;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      console.log(files[0]);
      console.log(files);
      let { success, data } = await generatePdf(files[0]);

      console.log(success);
      console.log(data);
      if (success) {
        toast.success("Redirecting");
        window.location.href = data?.pdfUrl;
      }
    } catch (error) {
      console.log(error);
      toast.error("Please Try Again Later");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-slate-900 p-6 mt-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-3">
            Upload Documents
          </h2>
          <p className="text-slate-400 text-lg">
            AI generates comprehensive answers and creates diagrams from your
            documents
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
          <div
            className={`border-2 border-dashed rounded-t-2xl p-12 text-center transition-all duration-200 ${
              isDragging
                ? "border-emerald-400 bg-emerald-500/10"
                : "border-slate-600 hover:border-slate-500"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <UploadCloud
                className={`h-16 w-16 transition-colors duration-200 ${
                  isDragging ? "text-emerald-400" : "text-slate-400"
                }`}
              />
              <div>
                <p className="text-xl font-semibold text-white mb-2">
                  {isDragging ? "Drop your file here" : "Drag & drop file here"}
                </p>
                <p className="text-slate-400 mb-4">or</p>
                <label className="inline-block px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg cursor-pointer transition-colors duration-200 font-medium">
                  Browse File
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.docx"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <p className="text-slate-500 text-sm">
                Supported formats: PDF, DOCX (Max 10MB each)
              </p>
            </div>
          </div>

          <div className="px-6 py-4 bg-amber-900/20 border-y border-amber-700/30">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-amber-400 mb-1">
                  Important Notice
                </h4>
                <div className="text-amber-200/80 text-sm space-y-1">
                  <p>• Each conversion consumes 2 tokens from your account</p>
                  <p>
                    • Only upload PDF or DOCX files - other formats will be
                    rejected
                  </p>
                  <p>• Large files may take longer to process</p>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="mx-6 mt-4 p-4 bg-red-900/30 border border-red-700/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <X className="h-5 w-5 text-red-400" />
                <span className="text-red-300 text-sm">{error}</span>
              </div>
            </div>
          )}

          {/* Files List */}
          {files.length > 0 && (
            <div className="p-6">
              <h3 className="font-semibold text-white mb-4 flex items-center">
                <span className="bg-emerald-600 text-white text-sm px-2 py-1 rounded-full mr-3">
                  1
                </span>
                Selected File
              </h3>

              <div className="space-y-3 mb-6">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl border border-slate-600/50 hover:bg-slate-700 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file.type)}
                      <div>
                        <p className="text-white font-medium truncate max-w-xs">
                          {file.name}
                        </p>
                        <p className="text-slate-400 text-sm">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="p-2 text-slate-400 hover:text-red-400 rounded-full hover:bg-slate-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Convert Button */}
              <button
                className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={files.length === 0}
              >
                {loading ? "Converting..." : "Convert File (2 tokens)"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
