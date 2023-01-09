import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";


const CountryInfo = (props) => {
  const [populationCounts, setPopulationCounts] = useState()
  
  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0
      },
    },
  }));

  useEffect(() => {
    setPopulationCounts(props.populationCounts)
  },[]);

  const classes = useStyles();
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        <>
          <Line
            data={{
              labels: populationCounts?.map((data) => {
                return data.year;
              }),

              datasets: [
                {
                  data: populationCounts?.map((country) => country.value),
                  label: `Population`,
                  borderColor: "#EEBC1D",
                },

                
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }
          }
          />
        </>
      </div>
    </ThemeProvider>
  );
};

export default CountryInfo;
