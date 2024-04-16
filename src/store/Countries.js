import { makeAutoObservable } from "mobx";

class Countries {
  countries = [];
  countriesByContinent = {};
  selectedCountry = {};

  updateCountries = (value) => {
    this.countries = value;
  };
  addCountry = (country) => {
    this.countries.push(country);
  };

  updateCountriesByContinent = (value) => {
    this.countriesByContinent = value;
  };

  updateSelectedCountry(country) {
    this.selectedCountry = country;
  }
  constructor() {
    makeAutoObservable(this);
  }
}

export const worldCountries = new Countries();
