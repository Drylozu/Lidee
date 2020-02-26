module.exports = () => {

  // <Array>.getRandom(<INTEGER>)
  Array.prototype.getRandom = function(num = false) {
    if (!num) return this[Math.floor(Math.random() * this.length)];
    let elements = []
    for (let i = 0; i < num; i++) {
      elements.push(this[Math.floor(Math.random() * this.length)])
    }
    return elements;
  };

  // Number.random(<INTEGER>, <INTEGER>)
  Number.random = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
}