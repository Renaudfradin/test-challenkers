import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"

export default function citation() {
  const [citation, setCitation] = useState<any>([]);
  const [personage, setPersonage] = useState<any>([]);

  function callApi() {
    axios('http://localhost:3001',{
      method: 'get',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS"
      }
    })
    .then((response) => {
      console.log(response.data.citation);
      setCitation(response.data.citation);
      setPersonage(response.data.citation.infos.personnage);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    callApi();
  }, [ ])

  return (
    <div>
      <p>{ citation['citation'] }</p>
      <p>{ personage }</p>
      <button onClick={() => callApi()}>Afficher une autre citation</button>
    </div>
  )
}