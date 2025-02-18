import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField } from "@mui/material";
import { deleteUrl, editUrl } from "../apis/urlApis";

function UrlDetails({ url, onDelete }) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [newUrl, setNewUrl] = useState({
    title: url.title,
    destination: url.destination,
  });

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteUrl(id);
      if (response.error) {
        console.error(response.error);
        return;
      }
      onDelete();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const response = await editUrl(url._id, newUrl);
      if (response.error) {
        console.error(response.error);
        return;
      }
      handleCloseEdit();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="container bg-white shadow-sm rounded-2 p-3">
      <h5 className="fw-bold">{url.title}</h5>
      <p className="text-secondary m-0 mt-2">Shorten Url :</p>
      <a href={url.shortenUrl} target="_blank" rel="noopener noreferrer">
        {url.shortenUrl}
      </a>
      <p className="text-secondary m-0 mt-2">Destination Url :</p>
      <a href={url.destination} target="_blank" rel="noopener noreferrer">
        {url.destination}
      </a>
      <p className="text-secondary m-0 mt-2">
        Created At : {new Date(url.createdAt).toLocaleString()}
      </p>
      <div className="d-flex mt-3 gap-2">
        <div
          className="btn btn-dark btn-sm rounded-5 px-3 py-1"
          onClick={handleClickOpenEdit}
        >
          Edit
        </div>
        <div
          className="btn btn-danger btn-sm rounded-5 px-3 py-1"
          onClick={handleClickOpenDelete}
        >
          Delete
        </div>
      </div>

      {/* Delete Dialog */}
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this link?"}
        </DialogTitle>
        <DialogContent>
          <p>This action cannot be undone.</p>
        </DialogContent>
        <DialogActions>
          <div
            className="btn btn-secondary rounded-5"
            onClick={handleCloseDelete}
          >
            Close
          </div>
          <div
            className="btn btn-danger rounded-5"
            onClick={() => {
              handleCloseDelete();
              handleDelete(url._id);
            }}
          >
            Delete
          </div>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit</DialogTitle>
        <DialogContent>
          <div>
            {" "}
            {/* Avoid wrapping form inside <p> */}
            <Box
              component="form"
              sx={{
                width: "30vw",
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
                "& label.Mui-focused": { color: "black" },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "black" },
                  "&:hover fieldset": { borderColor: "gray" },
                },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Url Title"
                variant="outlined"
                fullWidth
                onChange={(e) =>
                  setNewUrl({ ...newUrl, title: e.target.value })
                }
                value={newUrl.title}
              />
              <TextField
                id="outlined-basic"
                label="Url Destination"
                variant="outlined"
                fullWidth
                onChange={(e) =>
                  setNewUrl({ ...newUrl, destination: e.target.value })
                }
                value={newUrl.destination}
              />
            </Box>
          </div>
        </DialogContent>
        <DialogActions>
          <div
            className="btn btn-secondary rounded-5"
            onClick={handleCloseEdit}
          >
            Close
          </div>
          <div
            className="btn btn-dark rounded-5"
            onClick={() => {
              handleCloseEdit();
              handleSaveEdit();
            }}
          >
            Save
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UrlDetails;
