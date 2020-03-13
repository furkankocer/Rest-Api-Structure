const calculateTip = (total, tiPercent) => {
  const tip = total * tiPercent;
  return total + tip;
};


module.exports = {
    calculateTip
}
