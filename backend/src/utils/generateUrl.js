const { nanoid } = require("nanoid");

const generateUrl = () => {
  return nanoid(8);
};

module.exports = generateUrl;
