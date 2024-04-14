import React, { useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import CountriesTable from "../components/CountriesTable";
import { getCountriesApi } from "../config/api";
import axios from "axios";

function Homepage({ region }) {
  const [countries, setCountries] = useState("");
  const [byContinent, setByContinent] = useState({});
  const [loading, setLoading] = useState(false);

  const Africa = [];
  const Europe = [];
  const NorthAmerica = [];
  const SouthAmerica = [];
  const Oceania = [];
  const Asia = [];

  const fetchCountries = async () => {
    setLoading(true);
    const { data } = await axios.get(getCountriesApi());
    console.log(data);
    data
      .sort((c1, c2) => {
        return c1.name.common.localeCompare(c2.name.common);
      })
      .forEach((country) => {
        if (country.continents?.includes("Africa")) {
          Africa.push(country);
        }
        if (country.continents?.includes("Asia")) {
          Asia.push(country);
        }
        if (country.continents?.includes("Europe")) {
          Europe.push(country);
        }
        if (country.continents?.includes("North America")) {
          NorthAmerica.push(country);
        }
        if (country.continents?.includes("South America")) {
          SouthAmerica.push(country);
        }
        if (country.continents?.includes("Oceania")) {
          Oceania.push(country);
        }
      });
    setByContinent({
      Africa,
      Asia,
      ["North America"] : NorthAmerica,
      ["South America"] : SouthAmerica,
      Europe,
      Oceania,
    });
    setCountries(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchCountries();
  }, []);
  return (
    <>
      {!loading && <Banner byContinent={byContinent[region]} />}
      {countries && <CountriesTable allCountries={countries} />}
    </>
  );
}

export default Homepage;
