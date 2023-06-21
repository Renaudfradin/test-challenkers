import { useState } from "react";
import { push, ref, set } from "firebase/database";
import { database } from "../firebase";

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
      <div>
        <div>
          <label>Citation</label>
          <input
            type="Citation"
            //label="Citation"
            value={nomCitation}
            onChange={(e) => setNomCitation(e.target.value)}
            required
            className=""
          />
        </div>
      </div>
      <button
        type="submit"
        onClick={insrtCitation}
        className=""
      > Ajouter la citation</button>
    </form>
  )
}