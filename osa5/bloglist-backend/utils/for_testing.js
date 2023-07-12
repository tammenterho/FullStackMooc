// split jakaa yksittäisiin merkkeihin
// reverse kääntää ympäri
// join yhdistää takaisin merkkijonoksi
const reverse = (string) => {
    return string
      .split('')
      .reverse()
      .join('')
  }
  // laskee taulukon alkioiden keskiarvon, plussaa ensin ja jakaa pituudella
 
  const average = array => {
    const reducer = (sum, item) => {
      return sum + item
    }
    return array.length === 0 // jos taulukon pituus on 0..?
      ? 0 // palautetaan 0
      : array.reduce(reducer, 0) / array.length // : muuten...
  }
  
  // exporttaa nämä funktiot
  module.exports = {
    reverse,
    average,
  }