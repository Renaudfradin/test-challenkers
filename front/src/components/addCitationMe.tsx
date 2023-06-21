import { useState } from "react";
import { push, ref, set } from "firebase/database";
import { database } from "../firebase";
import { Box, Button } from "@mui/material";

export default function addCitationMe() {
  const [nomCitation, setNomCitation] = useState("");

  const insrtCitation = (e: any) => {
    e.preventDefault();
    if (nomCitation) {
      const cictationList = ref(database, 'citations/');
      const newCitations = push(cictationList);
      set(newCitations, {
        citations: nomCitation
      })
      setNomCitation("");
    }
  }
  
  return (
     <form>
      <Box>
          <input
            type="Citation"
            placeholder="Ajouter une citation"
            value={nomCitation}
            onChange={(e) => setNomCitation(e.target.value)}
            required
            className=""
          />
      </Box>
      <Button
        type="submit"
        onClick={insrtCitation}
        className=""
      > Ajouter la citation</Button>
    </form>
  )
}