import CitationKaamelott from "./components/citationKaamelott";
import AddCitationMe from "./components/addCitationMe";
import CardCitation from "./components/cardCitationMe";
import "./style/App.css";
import { useMemo, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "./firebase";

export default function App() {
  const [citations, setCitations] = useState<any>([]);

  useMemo(() => {
    const refCitations = ref(database, 'citations/' );
    onValue(refCitations, (snapshot) => {
      setCitations(Object.entries(snapshot.val()));
    })
  }, [])

  
  return (
    <>
      <CitationKaamelott />
      <AddCitationMe />
      <div>
        {citations.map((citation, index) => (
          <CardCitation
            key = { index }
            nom = { citation[1].citations}
            idCitation = {citation[0]} 
          ></CardCitation>
        ))}
      </div>
    </>
  )
}
