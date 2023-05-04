import React, { useRef, useState,useContext,useEffect } from 'react';
import axios from 'axios';
import { useEventListener, useHuddle01 } from '@huddle01/react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Button from '../components/Button';
import App from './_app';
const Mailchain = require('@mailchain/sdk').Mailchain; // imports the Mailchain SDK
import { useLobby,useRoom,useAudio,useVideo } from '@huddle01/react/hooks';

export default function Home() {

  const videoRef = useRef(null);
  const [addressG, setAddress] = useState('');
  const[link,setLink] = useState("");
  var addr = [];
  const [mail, setMail] = useState(addr);
  const { initialize, isInitialized } = useHuddle01();
  const { joinLobby } = useLobby();
  const { joinRoom, leaveRoom } = useRoom();


const [id,setId] = useState("");
  // Event Listner
  useEventListener('lobby:cam-on', () => {
    if (state.context.camStream && videoRef.current)
      videoRef.current.srcObject = state.context.camStream;
  });

  //const { initialize, isInitialized } = useHuddle01();

  async function joinRoomm() {
   // event.preventDefault()
    console.log("I am callesd");
    const response = await axios.post(
      'https://iriko.testing.huddle01.com/api/v1/create-room',
      {
        title: 'Huddle01-Test',
        hostWallets: ['0x0dDda6871f1216D7EF56722167652e4F881d74Aa'],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.HuddleKey,
        },
      }
    );
    var myObj = JSON.stringify(response.data);
    var myObj1 = JSON.parse(myObj);
    console.log("New Meeting :" + myObj1.data.roomId);
   // setId(myObj1.data.roomId);

    var meetId = "https://iframe.huddle01.com/" + myObj1.data.roomId;
    console.log(meetId);
    setLink(meetId);

  }

  async function sendMail() {

    event.preventDefault();
    alert("Video Link Generated : "+link);
    console.log("Address" + addressG);
    var a = [];
    a = addressG.split(",");
    //console.log("Address" + a[1]);
    for (var i = 0; i < a.length; i++) {
      a[i] = a[i] + "@ethereum.mailchain.com"
      addr.push(a[i]);
    }
    setMail(addr);
    //console.log(a[0]);
    console.log("Mail1"+addr[0]);
    console.log("Link"+link);
var testt = link;
    /const secretRecoveryPhrase = process.env.SECRET_RECOVERY_PHRASE; // 24 word mnemonicPhrase from .env

    const mailchain = Mailchain.fromSecretRecoveryPhrase(secretRecoveryPhrase);

//console.log(`Hello Frens,Please join this link for a Vide Meet'+${testt}`);
     const user = await mailchain.user()
    console.log(user);
    const result = await mailchain.sendMail({
      from: user.address,
      to: addr,
      subject: 'Hello Frens,Lets do a Huddle Meet',
      content: {
        text: `Long Time No Meet ${link}`,
        html: `Hello Frens,Please join this link for a Vide Meet' <a href=${testt}> Link</a> `,
      }
    }); 
 
    console.log(result);
  }

  useEffect(() => {
    // its preferable to use env vars to store projectId
  joinRoomm();

  }, []);

  return (
     <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >

      <div className="grid grid-cols-2">

        <h1 className="text-6xl font-bold">
          Welcome to Share Video
        </h1>

      </div>

      <div>
        <TextField
          sx={{
            width: 700
          }}
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={10}
          onChange={e => setAddress(e.target.value)}
        />
      </div>
      <div>
        <Button
          onClick={() => {
            sendMail()
          }}
        >
          Send Video link mail
        </Button>
      </div>
    </Box>

  );
}
