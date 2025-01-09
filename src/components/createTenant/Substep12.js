import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaFolder, FaUpload } from "react-icons/fa";
import { MdDelete, MdClose } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import {
  addFileToFolder,
  createFolder,
  removeFileFromFolder,
} from "../../redux/tenant/tenantSlice";

const Substep12 = ({ tenantId, uploadDocumentLater }) => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.tenant.files);
  console.log(files);
  const [selectedFolder, setSelectedFolder] = React.useState(null);
  const [editingFolderIndex, setEditingFolderIndex] = React.useState(null);
  const [newFolderName, setNewFolderName] = React.useState("");

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/tenant/fetch-documents`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { tenantId: tenantId },
        });

        if (response.data.success) {
          // Update Redux store with fetched documents
          Object.entries(response.data.documents || {}).forEach(
            ([folder, documents]) => {
              documents.forEach((doc) => {
                dispatch(addFileToFolder({ folderName: folder, file: doc }));
              });
            }
          );
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
        toast.error("Error fetching documents. Please try again.");
      }
    };

    if (tenantId) fetchDocuments();
  }, [tenantId, dispatch]);

  const addFolder = () => {
    const newFolder = "New Folder";
    dispatch(createFolder({ folderName: newFolder }));
    setEditingFolderIndex(Object.keys(files).length);
    setNewFolderName(newFolder);
  };

  const renameFolder = (oldFolderName) => {
    if (newFolderName.trim() && oldFolderName !== newFolderName) {
      const folderFiles = files[oldFolderName] || [];

      // Create new folder with the files from old folder
      dispatch(createFolder({ folderName: newFolderName }));

      // Transfer files to new folder
      folderFiles.forEach((file) => {
        dispatch(addFileToFolder({ folderName: newFolderName, file }));
      });

      // Remove the old folder completely from Redux state
      // Add this action to your hcmSlice:
      dispatch({
        type: "hcm/removeFolder",
        payload: { folderName: oldFolderName },
      });
    }
    setEditingFolderIndex(null);
    setNewFolderName("");
  };

  const handleFileUpload2 = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const file1 = convertToBase64(file);
    // Create FormData to send the file to the API
    const formData = new FormData();
    formData.append("userId", tenantId);
    formData.append("file", file1);
    formData.append("folder", selectedFolder); // Attach the selected folder
    formData.append("year", new Date().getFullYear().toString()); // Get current year dynamically

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/document/upload-document`, // Your API endpoint
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("File uploaded successfully");
        // Optionally, fetch documents again to update the UI with the newly uploaded file
        // fetchDocuments(); // Call the fetchDocuments function to re-fetch the documents after uploading
      } else {
        // toast.error("Failed to upload the file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      // toast.error("Error uploading file. Please try again.");
    }
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const base64 = await convertToBase64(file);
    console.log(base64);
    // Store just the file metadata and the File object in Redux
    dispatch(
      addFileToFolder({
        folderName: selectedFolder,
        file: {
          name: file.name,
          date: new Date().toLocaleDateString(),
          file: base64, // Store the actual File object
        },
      })
    );
    toast.success("File Uploaded successfully");
  };

  const deleteFile = (fileName) => {
    if (selectedFolder) {
      dispatch(
        removeFileFromFolder({
          folderName: selectedFolder,
          fileName,
        })
      );
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  if (uploadDocumentLater) {
    return null;
  }
  return (
    <div className="p-6">
      <div className="flex justify-between p-2">
        <h2 className="text-2xl font-bold mb-4">Folder Management</h2>
        <button
          onClick={addFolder}
          className="px-4 py-2 bg-[#6F84F8] text-white rounded hover:bg-[#6F84F8]"
        >
          Create Folder
        </button>
      </div>

      {/* Folder Display */}
      <div className="grid grid-cols-3 gap-4 h-[200px] overflow-y-auto tenant-visits-scrollbar">
        {Object.keys(files).map((folder, index) => (
          <div
            key={folder}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setSelectedFolder(folder)}
          >
            <FaFolder className="text-gray-400 text-5xl mb-2" />
            {editingFolderIndex === index ? (
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onBlur={() => renameFolder(folder)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") renameFolder(folder);
                }}
                autoFocus
                className="border border-gray-300 rounded px-2 py-1"
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
              onClick={() => setSelectedFolder(null)}
              className="absolute top-5 right-6 text-gray-600 hover:text-black"
            >
              <MdClose size={24} />
            </button>

            <h3 className="text-lg font-bold mb-4">{selectedFolder}</h3>

            {/* File Upload Section */}
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
              {files[selectedFolder]?.map((file, index) => (
                <div key={index} className="grid grid-cols-3 gap-4">
                  <div>{file.name}</div>
                  <div>{file.date}</div>
                  <div>
                    <button
                      onClick={() => deleteFile(file.name)}
                      className="text-red-500"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Substep12;
