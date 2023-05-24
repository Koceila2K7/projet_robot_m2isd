import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function PLayerList({ playerList }) {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        maxHeight: 300,
        "& ul": { padding: 0 },
      }}
      subheader={<li />}
    >
      {playerList.map((player) => (
        <li key={`section-${player}`}>
          <ul>
            <ListItem key={`item-${player}-${player}`}>
              <ListItemText primary={`${player}`} />
            </ListItem>
          </ul>
        </li>
      ))}
    </List>
  );
}
