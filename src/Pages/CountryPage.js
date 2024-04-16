import { LinearProgress, makeStyles } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { singleCountryPopulation } from "../config/api";
import CountryInfo from "../components/CountryInfo";
import GPTPage from "../Pages/GPTPage";
import { worldCountries } from "../store/Countries";
import { observer } from "mobx-react-lite";
import OpenAI from "openai";
import { toJS } from "mobx";
console.log(process.env)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const CountryPage = () => {
  const { id } = useParams();
  const [country, setCountry] = useState();
  const [gptAns, setGptAns] = useState();
  const [errors, setErrors] = useState({ gpt: "", population: "" });

  const fetchPopulation = async () => {
    try {
      const { data } = await axios.post(singleCountryPopulation(id), {
        country: id,
      });
      if (!data.error) {
        setCountry(data);
      } else {
        throw new Error(data.msg);
      }
    } catch (e) {
      setErrors({ ...errors, population: e.message });
    }
  };

  const fetchGptData = async () => {
    const prompt = `Generate a fun fact about :${worldCountries.selectedCountry?.name}`;
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: "Who won the world series in 2020?" },
          {
            role: "assistant",
            content: "The Los Angeles Dodgers won the World Series in 2020.",
          },
          { role: "user", content: prompt },
        ],
        model: "gpt-3.5-turbo",
      });
      setGptAns(completion.choices[0].message.content);
    } catch (e) {
      setErrors({ ...errors, gpt: e.message });
    }
  };

  useEffect(() => {
    const { countries } = worldCountries;
    const ct = toJS(countries).find(
      (country) => country?.name.toLocaleLowerCase() === id
    );
    worldCountries.updateSelectedCountry(ct);
    fetchPopulation();
    fetchGptData();
  }, []);

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

  if (!country) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className={classes.container}>
      {errors.gpt ? (
        <div>cant't redner response , please try again</div>
      ) : (
        <GPTPage gptAns={gptAns}></GPTPage>
      )}

      {errors.population ? (
        <>
          population data not available
          <LinearProgress style={{ backgroundColor: "gold" }} />
        </>
      ) : (
        <CountryInfo
          populationCounts={country?.data?.populationCounts}
        ></CountryInfo>
      )}
    </div>
  );
};

export default observer(CountryPage);
