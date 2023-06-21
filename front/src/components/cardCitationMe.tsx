import { ref, remove } from "firebase/database";
import { database } from "../firebase.ts";
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button } from "@mui/material";

export default function cardCitation({ key, nom, idCitation }) {

  const removeCitations = () => {
    const citationstliste = ref(database, 'citations/' + idCitation);
    remove(citationstliste);
  }

  return (
    <Box
      key={key}
      sx={{ display: 'flex', justifyContent: 'center' }}>
      <p>{nom}</p>
      <Button
        onClick={removeCitations}
        sx={{ color: "black" }}
      ><DeleteIcon /></Button>
    </Box>
  )
}