import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import {
  Container,
  createTheme,
  TableCell,
  LinearProgress,
  ThemeProvider,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CountriesTable({ allCountries }) {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const useStyles = makeStyles({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "gold",
      },
    },
  });

  const classes = useStyles();
  const history = useNavigate();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handleSearch = () => {
    return allCountries.filter(
      (country) =>
        country.name.common.toLowerCase().includes(search) ||
        country.capital[0]?.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          All
        </Typography>
        <TextField
          label="Search for your favourite country.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "darblackk" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "grey" }}>
                <TableRow>
                  {["Country", "Capital", "Population", "Currency", "Language"].map(
                    (head) => (
                      // {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "700",
                          fontFamily: "Montserrat",
                        }}
                        key={head}
                        align={head === "Country" ? "" : "right"}
                      >
                        {head}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    const curr = Object.keys(row.currencies)[0];
                    const curObject = row.currencies[curr];
                    const curText = `${curObject?.symbol ?? ""} - ${
                      curr ?? ""
                    }`;
                    return (
                      <TableRow
                        onClick={() => history.push(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.flags.svg}
                            alt={row.name.common}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.cca3}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name.common}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            fontWeight: 900,

                          }}
                        >
                          {row.capital[0]}
                        </TableCell>
                        <TableCell align="right">
                          {numberWithCommas(row.population)}
                        </TableCell>

                        <TableCell align="right">{curText}</TableCell>
                        <TableCell align="right">{Object.values(row.languages).join(',')}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        {/* Comes from @material-ui/lab */}
        <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
}
