import React, { useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import CountriesTable from "../components/CountriesTable";
import { getCountriesApi } from "../config/api";
import axios from "axios";
import { worldCountries } from "../store/Countries";

import { observer } from "mobx-react-lite";

const Homepage = observer(() => {
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
    const strippedData = data.map((country) => {
      const curr = Object.keys(country.currencies)[0];
      const curObject = country.currencies[curr];
      const curText = `${curObject?.symbol ?? ""} - ${curr ?? ""}`;
      return {
        flag: country?.flags?.svg ?? "",
        name: country?.name?.common ?? "",
        cca3: country?.cca3 ?? "",
        capital: country?.capital.join("") ?? "N/A",
        population: country?.population ?? 0,
        continents: country?.continents ?? "",
        language: Object.values(country.languages).join(","),
        currency: curText,
      };
    });

    strippedData
      .sort((c1, c2) => {
        return c1.name.localeCompare(c2.name);
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

    worldCountries.updateCountriesByContinent({
      Africa,
      Asia,
      ["North America"]: NorthAmerica,
      ["South America"]: SouthAmerica,
      Europe,
      Oceania,
    });
    worldCountries.updateCountries(strippedData);
    setLoading(false);
  };
  useEffect(() => {
    fetchCountries();
  }, []);
  return (
    <>
      {!loading && <Banner />}
     <CountriesTable />
    </>
  );
});

export default Homepage;
