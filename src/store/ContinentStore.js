import { makeAutoObservable } from "mobx";
class ContinentsStore {
  selectedContinent = "Africa";
  continents = [
    "Africa",
    "Europe",
    "Asia",
    "North America",
    "South America",
    "Oceania",
  ];
  updateSelectedContinent = (value) => {
    this.selectedContinent = value;
  };
  constructor() {
    makeAutoObservable(this);
  }
}
export const continentsStore = new ContinentsStore();
