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
import { useState } from "react";

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

function Header({ region, setRegion }) {
  const classes = useStyles();

  const history = useNavigate();
  const continents = [
  //   {
  //     label : Africa,
  //     value : Africa
  //   },
  //   {
  //     label : Europe,
  //     value : Europe
  //   },
  //   {
  //     label : Africa,
  //     value : Africa
  //   },
  //   {
  //     label : Asia,
  //     value : Africa
  //   },
  //   {
  //     label : North America,
  //     value : Africa
  //   },
  //   {
  //     label : Africa,
  //     value : Africa
  //   },
    "Africa", "Europe", "Asia", "North America" ,"South America", "Oceania"
  ];

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
              value={region}
              style={{ width: 400, height: 40, marginLeft: 15 }}
              onChange={(e) => setRegion(e.target.value)}
            >
              {continents.map((continent, index) => {
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
}

export default Header;
