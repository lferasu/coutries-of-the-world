import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import { continentsStore } from "../store/ContinentStore";
import { observer } from "mobx-react-lite";
import React from "react";

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

  const Header = observer(() => {
  const classes = useStyles();
  const history = useNavigate();
  
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => history(`/`)}
              variant="h6"
              className={classes.title}
            >
              Countries of The World
            </Typography>
            <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={continentsStore.selectedContinent}
              style={{ width: 400, height: 40, marginLeft: 15 }}
              onChange={(e) =>
                continentsStore.updateSelectedContinent(e.target.value)
              }
            >
              {continentsStore.continents.map((continent, index) => {
                return (
                  <MenuItem value={continent} key={index}>
                    {continent}
                  </MenuItem>
                );
              })}
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
});

 export default Header;
