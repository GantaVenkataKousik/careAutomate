import React, { useState, useEffect } from "react";
import { FaFolder, FaUpload } from "react-icons/fa";
import { MdDelete, MdClose } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
const Substep12 = ({ tenantID }) => {
  const [folders, setFolders] = useState([
    "Intake Documents",
    "ID Proofs",
    "Lease Agreements",
  ]);
  const [editingFolderIndex, setEditingFolderIndex] = useState(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [fileToUpload, setFileToUpload] = useState(null);

  const [fetchedDocuments, setFetchedDocuments] = useState([]); // State for fetched documents

  // Fetch the documents for the tenant
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/tenant/fetch-documents`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            tenantId: tenantID, // Pass tenantID in request
          },
        });

        if (response.data.success) {
          setFetchedDocuments(response.data.documents); // Assuming the API response contains 'documents'
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
        toast.error("Error fetching documents. Please try again.");
      }
    };

    if (tenantID) {
      fetchDocuments();
    }
  }, [tenantID]); // Re-fetch when tenantID changes

  const getYearFolders = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 2 }, (_, i) => currentYear - i);
  };

  const addFolder = () => {
    const newFolder = "New Folder";
    setFolders([...folders, newFolder]);
    setEditingFolderIndex(folders.length);
    setNewFolderName(newFolder);
  };

  const renameFolder = (index) => {
    if (newFolderName.trim()) {
      const updatedFolders = [...folders];
      updatedFolders[index] = newFolderName.trim();
      setFolders(updatedFolders);
    }
    setEditingFolderIndex(null);
    setNewFolderName("");
  };

  const openFolder = (folder) => {
    setSelectedFolder(folder);
    setSelectedYear(null);
  };

  const openYearFolder = (year) => {
    setSelectedYear(year);
  };

  const closeFolder = () => {
    setSelectedFolder(null);
    setSelectedYear(null);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      name: file.name,
      date: new Date().toLocaleDateString(),
    }));

    if (selectedFolder && selectedYear) {
      setUploadedFiles((prev) => ({
        ...prev,
        [selectedFolder]: {
          ...(prev[selectedFolder] || {}),
          [selectedYear]: [
            ...(prev[selectedFolder]?.[selectedYear] || []),
            ...files,
          ],
        },
      }));
    }

    if (e.target.files.length > 0) {
      setFileToUpload(e.target.files[0]);
      handleFileSubmit(e.target.files[0]); // Automatically submit after file selection
    }
  };

  const deleteFile = (fileIndex) => {
    if (selectedFolder && selectedYear) {
      setUploadedFiles((prev) => {
        const updatedFiles = { ...prev };
        updatedFiles[selectedFolder][selectedYear].splice(fileIndex, 1);

        if (updatedFiles[selectedFolder][selectedYear].length === 0) {
          delete updatedFiles[selectedFolder][selectedYear];
        }
        return updatedFiles;
      });
    }
  };

  const getFilesForSelectedFolderAndYear = () =>
    uploadedFiles[selectedFolder]?.[selectedYear] || [];

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileSubmit = async (file) => {
    if (!file || !selectedFolder || !selectedYear) {
      toast.error("Please select a file and specify a folder and year.");
      return;
    }

    console.log("step3", tenantID);
    try {
      const fileBase64 = await convertToBase64(file);

      const data = {
        tenantId: tenantID,
        folderName: selectedFolder,
        fileName: file.name,
        document: fileBase64,
      };

      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/document/upload-document`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error uploading document:", error);
      toast.error("Error uploading the document. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between p-2">
        <div>
          <h2 className="text-2xl font-bold mb-4">Folder Management</h2>
        </div>
        <div className="flex items-center mb-6">
          <button
            onClick={addFolder}
            className="px-4 py-2 bg-[#6F84F8] text-white rounded hover:bg-[#6F84F8]"
          >
            Create Folder
          </button>
        </div>
      </div>

      {/* Folder Display */}
      <div className="grid grid-cols-3 gap-4">
        {folders.map((folder, index) => (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => {
              if (editingFolderIndex !== index) openFolder(folder);
            }}
          >
            <FaFolder className="text-gray-400 text-5xl mb-2" />
            {editingFolderIndex === index ? (
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onBlur={() => renameFolder(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") renameFolder(index);
                }}
                autoFocus
                className="border border-gray-300 rounded px-2 py-1 "
              />
            ) : (
              <span
                className="font-semibold"
                onDoubleClick={() => {
                  setEditingFolderIndex(index);
                  setNewFolderName(folder);
                }}
              >
                {folder}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Modal View */}
      {selectedFolder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-[50rem] h-[30rem] max-w-3xl">
            <button
              onClick={closeFolder}
              className="absolute top-5 right-6 text-gray-600 hover:text-black"
            >
              <MdClose size={24} />
            </button>

            {/* Breadcrumbs */}
            <div className="mb-4 text-sm">
              <span
                className="text-blue-500 cursor-pointer"
                onClick={closeFolder}
              >
                Folders
              </span>{" "}
              /{" "}
              {selectedFolder && !selectedYear && <span>{selectedFolder}</span>}
              {selectedYear && (
                <>
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => setSelectedYear(null)}
                  >
                    {selectedFolder}
                  </span>{" "}
                  / <span>{selectedYear}</span>
                </>
              )}
            </div>

            {/* Year Folders */}
            {!selectedYear && (
              <div className="grid grid-cols-3 gap-4">
                {getYearFolders().map((year) => (
                  <div
                    key={year}
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => openYearFolder(year)}
                  >
                    <FaFolder className="text-gray-400 text-4xl mb-2" />
                    <span className="font-semibold">{year}</span>
                  </div>
                ))}
              </div>
            )}

            {/* File Upload Section */}
            {selectedYear && (
              <div>
                <div className="flex flex-col items-center mb-4">
                  <label className="w-[30rem] h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded cursor-pointer hover:border-blue-500">
                    <FaUpload className="text-blue-500 text-3xl mb-2" />
                    <span>Upload your file here</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>

                {/* File List */}
                <div className="mb-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-semibold">Document Name</div>
                    <div className="font-semibold">Date Uploaded</div>
                    <div className="font-semibold">Action</div>
                  </div>
                  {getFilesForSelectedFolderAndYear().map((file, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4">
                      <div>{file.name}</div>
                      <div>{file.date}</div>
                      <div>
                        <button
                          onClick={() => deleteFile(index)}
                          className="text-red-500"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Substep12;
