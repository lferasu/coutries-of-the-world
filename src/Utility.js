
class Utility {
  static numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0;
  }
}

export default Utility
