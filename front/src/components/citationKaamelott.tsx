import axios from "axios";
import { useState, useEffect } from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Box, Button, Typography } from "@mui/material";

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
    <Box sx={{
      border: "2px solid #6303ad",
      borderRadius: "8px",
      padding: "15px",
      color: "#6303ad"
    }}>
      <Typography
        sx={{
          padding: "5px 0"
        }}
      >{citation['citation']}</Typography>
      <Typography
        sx={{
          padding: "10px 0"
        }}
      >{personage}</Typography>
      <Button
        onClick={() => callApi()}
        sx={{
          backgroundColor: "#ffffff",
          color: "#6303ad"
        }}
      ><RemoveRedEyeIcon />Afficher une autre citation de Kaamelott</Button>
    </Box>
  )
}