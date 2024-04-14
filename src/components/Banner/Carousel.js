import { makeStyles } from "@material-ui/core";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";


function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Carousel = ({ countries }) => {
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

  const items = countries?.map((country) => {
    // let profit = coin?.price_change_percentage_24h >= 0;

    return (
      // <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
      <Link className={classes.carouselItem}>
        <img
          src={country?.flags.svg}
          alt={country.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {country?.cca3}
          &nbsp;
          <span
            style={{
              color: "rgb(14, 203, 129)" ,
              fontWeight: 500,
            }}
          >
            {country?.capital[0]}
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

export default Carousel;
