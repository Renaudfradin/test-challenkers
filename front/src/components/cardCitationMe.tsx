import { useMemo, useState } from "react";
import { ref, remove, set, onValue } from "firebase/database";
import { database } from "../firebase.ts";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Typography, Modal, Input } from "@mui/material";

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

export default function cardCitation({ key, nom, idCitation }) {
  const [updateCitation, setUpdateCitation] = useState<any>("");
  const [open, setOpen] = useState<any>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const removeCitations = () => {
    const citationstliste = ref(database, 'citations/' + idCitation);
    remove(citationstliste);
  }

  const updateCitations = (e: any) => {
    e.preventDefault();
    if (updateCitation) {
      set(ref(database, 'citations/' + idCitation), {
        citations: updateCitation
      })
      setOpen(false);
    }
  }

  useMemo(() => {
    const refCitation = ref(database, 'citations/' + idCitation);
    onValue(refCitation, (snapshot) => {
      setUpdateCitation(Object.entries(snapshot.val())[0][1]);
    })
  }, [])

  return (
    <Box
      key={ key }
      sx={{
        display: "flex",
        justifyContent: "center"
      }}>
      <Typography
        sx={{
          width: "90%",
          padding:"15px 0"
        }}
      >{nom}</Typography>
      <Button
        onClick={ removeCitations }
        sx={{
          color: "black"
        }}
      ><DeleteIcon /></Button>
      <Button
        onClick={ handleOpen}
        sx={{
          color: "black"
        }}
      ><EditIcon /></Button>
      <Modal
        open={ open }
        onClose={ handleClose }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={ style }>
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
            placeholder="Modifier une citation"
            value={updateCitation}
            onChange={(e) => setUpdateCitation(e.target.value)}
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
          onClick={updateCitations}
        >Modifier la citation</Button>
      </Box>
      </Modal>
    </Box>
  )
}