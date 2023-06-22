import { useMemo, useState } from "react";
import { push, ref, set } from "firebase/database";
import { database } from "../firebase";
import { Box, Button, Modal, Input } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function addCitationMe() {
  const [nomCitation, setNomCitation] = useState("");
  const [open, setOpen] = useState<any>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const insertCitation = (e: any) => {
    e.preventDefault();
    if (nomCitation) {
      const cictationList = ref(database, 'citations/');
      const newCitations = push(cictationList);
      set(newCitations, {
        citations: nomCitation
      })
      setNomCitation("");
      setOpen(false);
    }
  }
  
  return (
  <>
    <Button
      onClick={handleOpen}
      sx={{
        width: "20%",
        color: "white",
        backgroundColor: "#6303ad",
        marginRight: "10px",
        "&:hover": {
          backgroundColor: "#6303ad"
        }
      }}
    ><AddIcon />Ajouter une citation</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
        <form>
          <Box>
            <Input
              sx={{
                width: "100%",
                border: "2px solid #6303ad",
                borderRadius: "8px",
                paddingLeft: "15px",
                color: "#6303ad"
              }}
              type="Citation"
              placeholder="Ajouter une citation"
              value={nomCitation}
              onChange={(e) => setNomCitation(e.target.value)}
              required
            />
          </Box>
          <Button
            sx={{
              color: "white",
              backgroundColor: "#6303ad",
              marginRight: "10px",
              marginTop: "15px",
              "&:hover": {
                backgroundColor: "#6303ad"
              }
            }}
            type="submit"
            onClick={insertCitation}
          > Ajouter la citation</Button>
        </form>
      </Box>
      </Modal>
  </>
  )
}