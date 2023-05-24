import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  borderRadius: "5",
  p: 4,
};

export default function SetIpModal({
  ip,
  setIp,
  handleClose,
  open,
  ipDispatcher,
  setIpDispatcher,
  setPlayerName,
  playerName,
}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            fullWidth
            style={{ marginBottom: 10 }}
          />
          <TextField
            value={ipDispatcher}
            onChange={(e) => setIpDispatcher(e.target.value)}
            fullWidth
            style={{ marginBottom: 10 }}
          />

          <TextField
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            fullWidth
            style={{ marginBottom: 10 }}
          />
          <Button onClick={handleClose} variant="contained" fullWidth>
            Etablir une connexion
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
