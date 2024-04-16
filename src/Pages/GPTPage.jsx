
import {makeStyles, Typography} from "@material-ui/core"
import Uitiliy from '../Utility'
import { worldCountries } from "../store/Countries";


const GPTPage = ({ gptAns}) => {
    const {selectedCountry} = worldCountries
    const useStyles = makeStyles((theme) => ({
        container: {
          display: "flex",
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "center",
          },
        },
        sidebar: {
          width: "30%",
          [theme.breakpoints.down("md")]: {
            width: "100%",
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 25,
          borderRight: "2px solid grey",
        },
        heading: {
          fontWeight: "bold",
          marginBottom: 20,
          fontFamily: "Montserrat",
        },
        description: {
          width: "100%",
          fontFamily: "Montserrat",
          padding: 25,
          paddingBottom: 15,
          paddingTop: 0,
          textAlign: "justify",
        },
        marketData: {
          alignSelf: "start",
          padding: 25,
          paddingTop: 10,
          width: "100%",
          [theme.breakpoints.down("md")]: {
            display: "flex",
            justifyContent: "space-around",
          },
          [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignItems: "center",
          },
          [theme.breakpoints.down("xs")]: {
            alignItems: "start",
          },
        },
      }));
    
    const classes = useStyles();
  return (
    <div className={classes.sidebar}>
      <img
        src={selectedCountry?.flag}
        alt={selectedCountry?.name}
        height="200"
        style={{ marginBottom: 20 }}
      />
      <Typography variant="h3" className={classes.heading}>
        {selectedCountry?.name}
      </Typography>
      <Typography
        variant="subtitle1"
        className={classes.description}
      ></Typography>
      <div className={classes.marketData}>
        <span style={{ display: "flex" }}>
          <Typography variant="h5" className={classes.heading}>
            Current Population:
          </Typography>
          &nbsp; &nbsp;
          <Typography
            variant="h5"
            style={{
              fontFamily: "Montserrat",
            }}
          >
            {Uitiliy.numberWithCommas(selectedCountry?.population)}
          </Typography>
        </span>

        <span>
          <Typography
            variant="h5"
            style={{
              fontFamily: "Montserrat",
              color: "gold",
            }}
          >
            {gptAns}
          </Typography>
        </span>
      </div>
    </div>
  );
};

export default GPTPage