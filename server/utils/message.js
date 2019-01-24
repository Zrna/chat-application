var moment = require("moment");

var generateMessage = (from, text) => {
  return {
    from,
    text,
    sentAt: moment().valueOf()
  };
};

var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    sentAt: moment().valueOf()
  };
};

module.exports = { generateMessage, generateLocationMessage };
