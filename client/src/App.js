import "./App.css";
import DenseAppBar from "./BarApp";
import { useEffect, useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import SetIpModal from "./SetIpModal";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Notyf } from "notyf";

import axios from "axios";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import PLayerList from "./PlayerList";

const playerlistconst = [
  "nabil",
  "kociela",
  "lilan",
  "amayas",
  "maxime",
  "elon",
  "test1",
];
function App() {
  const [ipRobot, setIpRobot] = useState("192.168.99.93");
  const [ipDispatcher, setIpDispatcher] = useState("192.168.99.100");
  const notyf = new Notyf();
  const [playerName, setPlayerName] = useState("KoceilaNabilLilian");
  const [requestResult, setRequestResult] = useState("");
  const [open, setOpen] = useState(false);
  const [bonus, setBonus] = useState(0);
  let API = axios.create({ baseURL: 'http://'+ipDispatcher+":5500/" });

  useEffect(() => {
    notyf.success(requestResult);
  }, [requestResult, notyf]);

  const handleOpen = () => setOpen(true);
  const handleClose = async () => {
    try {
      const { data } = await API.post("/connect", {
        player_name: playerName,
        ip_address: ipRobot,
      });
      setRequestResult(JSON.stringify(data));
    } catch (error) {
      setRequestResult(JSON.stringify(error));
    }

    setOpen(false);
  };

  const sendCommand = async (command) => {
    try {
      const { data } = await API.post("/sendCommand", {
        type: command,
        payload: "",
      });
      setRequestResult(JSON.stringify(data));
    } catch (error) {
      setRequestResult(JSON.stringify(error));
    }
  };
  return (
    <div className="App">
      <DenseAppBar bonus={bonus} />
      <Container>
        <div>
          <Button
            onClick={handleOpen}
            fullWidth
            variant="contained"
            style={{ marginTop: 5 }}
          >
            Fixe Robot IP
          </Button>
          <div
            style={{
              margin: "20%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={async () => {
                sendCommand("forward");
              }}
              style={{ margin: 2 }}
            >
              <ArrowDropUpIcon />
            </Button>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Button
                onClick={async () => {
                  sendCommand("left");
                }}
                variant="contained"
                style={{ margin: 2 }}
              >
                <ArrowLeftIcon />
              </Button>
              <Button
                onClick={async () => {
                  sendCommand("backward");
                }}
                variant="contained"
                style={{ margin: 2 }}
              >
                <ArrowDropDownIcon />
              </Button>
              <Button
                onClick={async () => {
                  sendCommand("right");
                }}
                variant="contained"
                style={{ margin: 2 }}
              >
                <ArrowRightIcon />
              </Button>
            </div>
          </div>
          <Button
            onClick={async () => {
              sendCommand("ds");
              sendCommand("ts");
            }}
            fullWidth
            variant="contained"
            style={{ marginTop: 5 }}
          >
            Stop All
          </Button>
        </div>
        <Typography variant="h5"> Players List : </Typography>
        <div>
          <PLayerList playerList={playerlistconst} />
        </div>
        <SetIpModal
          ipDispatcher={ipDispatcher}
          setIpDispatcher={setIpDispatcher}
          open={open}
          setIp={setIpRobot}
          ip={ipRobot}
          handleClose={handleClose}
          playerName={playerName}
          setPlayerName={setPlayerName}
        />
      </Container>
    </div>
  );
}

export default App;
