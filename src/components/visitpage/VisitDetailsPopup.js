import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DOMPurify from "dompurify";

const VisitDetailsPopup = ({ openPopup, handleClosePopup, detailsPopup }) => {
  const sanitizeHTML = (html) => DOMPurify.sanitize(html);

  return (
    <Dialog
      open={openPopup}
      onClose={handleClosePopup}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: "#f4f7fc", // Light background color for the dialog box
          borderRadius: "10px", // Rounded corners
          padding: "20px", // Padding inside the dialog box
        },
      }}
    >
      <DialogTitle
        style={{
          fontSize: "1.25rem", // Larger font size for title
          fontWeight: "bold", // Bold title
          color: "#333", // Dark color for the title text
          borderBottom: "2px solid #6F84F8", // Add a border under the title
          paddingBottom: "10px", // Padding bottom for title
        }}
      >
        Visit Details
      </DialogTitle>

      <DialogContent
        style={{
          fontSize: "1rem", // Regular font size for content
          color: "#555", // Dark grey text color for content
          lineHeight: "1.6", // Spacing between lines for better readability
          paddingTop: "10px", // Padding top for content
        }}
      >
        <div
          className="p-5"
          dangerouslySetInnerHTML={{
            __html: sanitizeHTML(
              detailsPopup || "<p>No content available.</p>"
            ),
          }}
        />
        {/* <p>{detailsPopup}</p> */}
      </DialogContent>

      <DialogActions
        style={{
          justifyContent: "flex-end", // Align buttons to the right
          padding: "10px 20px", // Padding for actions
        }}
      >
        <Button
          onClick={handleClosePopup}
          color="primary"
          style={{
            backgroundColor: "#6F84F8", // Blue background for the close button
            color: "#fff", // White text for the button
            padding: "8px 20px", // Button padding
            borderRadius: "25px", // Rounded corners for the button
            transition: "all 0.3s ease", // Smooth transition effect
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VisitDetailsPopup;
