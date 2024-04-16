import { makeStyles } from "@material-ui/core";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { worldCountries } from '../../store/Countries'
import { continentsStore } from "../../store/ContinentStore";
import { observer } from "mobx-react-lite";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Carousel = () => {
  const useStyles = makeStyles((theme) => ({
    carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white",
    },
  }));

  const classes = useStyles();

  const items = worldCountries.countriesByContinent[
    continentsStore.selectedContinent
  ]?.map((country) => {
   
    return (
      <Link
        className={classes.carouselItem}
        to={`/countries/${country.name.toLocaleLowerCase()}`}
      >
        <img
          src={country?.flag}
          alt={country.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {country?.cca3}
          &nbsp;
          <span
            style={{
              color: "rgb(14, 203, 129)",
              fontWeight: 500,
            }}
          >
            {country?.capital}
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {numberWithCommas(country?.population)}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

export default observer(Carousel);
