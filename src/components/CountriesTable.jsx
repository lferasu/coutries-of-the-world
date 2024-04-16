
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { worldCountries } from "../store/Countries";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@material-ui/core";
import { useTheme } from "@mui/material";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CountriesTable = () => {
 
  const history = useNavigate();
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Country",
        size: 150,
      },
      {
        id: "flag",
        accessorFn: (row) => {
          return (
            <>
              <img
                src={row?.flag}
                alt={row.name}
                // height="100"
                style={{
                  marginBottom: 10,
                  borderRadius: "50%",
                  objectFit: "cover",
                  height: "2rem",
                  width: "2rem",
                  alignContent: "center",
                  justifyContent: "right",
                }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    textTransform: "uppercase",
                    fontSize: 22,
                  }}
                >
                  {row.cca3}
                </span>
              </div>
            </>
          );
        },
        accessorKey: "flag",
        header: "Flag",
        size: 150,
      },
      {
        accessorKey: "capital",

        header: "Capital",
        size: 150,
      },
      {
        accessorKey: "population",

        header: "Population",
        size: 150,
      },
      {
        accessorKey: "continents",

        header: "Continent",
        size: 150,
      },
      {
        accessorKey: "language",

        header: "Languages",
        size: 150,
      },
      {
        accessorKey: "currency",

        header: "Currency",
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: worldCountries.countries,
    muiTableBodyRowProps: ({ row }) => ({
      onClick: (event) => {
        history(`/countries/${row._valuesCache.name.toLocaleLowerCase()}`);
      },
      sx: {
        cursor: "pointer",
      },
    }),
  });

  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          primary: {
            main: "#ffd700",
          },
          secondary: {
            main: "#ffd700",
          },
        },
      })}
    >
      <MaterialReactTable table={table} />
    </ThemeProvider>
  );
};

export default CountriesTable;
