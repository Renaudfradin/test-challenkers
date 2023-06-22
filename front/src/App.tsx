import CitationKaamelott from "./components/citationKaamelott";
import AddCitation from "./components/addCitationMe";
import CardCitation from "./components/cardCitationMe";
import { useMemo, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "./firebase";
import { Box, Typography, Input } from "@mui/material";
import "./style/App.css";

export default function App() {
  const [citations, setCitations] = useState<any>([]);
  const [searchCitation, setSearchCitation] = useState<any>("");

  useMemo(() => {
    const refCitations = ref(database, 'citations/' );
    onValue(refCitations, (snapshot) => {
      setCitations(Object.entries(snapshot.val()));
    })
  }, [])

  function searchCitations(e:any) {
    setSearchCitation(e.target.value);
    console.log(searchCitation);
    const filter = citations.filter(data => data.citation.toLowerCase().includes(searchCitation))
    console.log(filter);
    
  }
  
  return (
    <Box
      sx={{
        width: "75%",
        margin: "0 auto"
      }}>
      <Typography
        variant="h2"
        sx={{
          color: "#07002e"
        }}
      >Citations</Typography>
      <CitationKaamelott />
      <Box>
        <Typography
          variant="h4"
          sx={{
            color: "#07002e",
            marginTop: "60px",
            marginBottom: "40px"
          }}
        >Mes Citations</Typography>
        <Box
          sx={{
            display: "flex",
            paddingBottom: "15px"
          }}
        >
          <AddCitation />
          <Input
            sx={{
              width: "80%",
              border: "2px solid #6303ad",
              borderRadius: "8px",
              paddingLeft: "15px",
              color: "#6303ad"
            }}
            placeholder="Rechercher dans mes citations"
            type="text"
            value={searchCitation}
            onChange={searchCitations}
          />
        </Box>
        <Box>
          {citations.map((citation) => (
            <CardCitation
              key = { citation[0] }
              nom = { citation[1].citations }
              idCitation = { citation[0] } 
            ></CardCitation>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
