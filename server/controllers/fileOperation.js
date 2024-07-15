const fs = require("fs");
const path = require('path');
const localePath = path.resolve('helpers/locale.json');

const readLocaleData = () => {    
  var data = fs.readFileSync(localePath);
  var jsonObj = JSON.parse(data);
  return jsonObj;
};

const updateLocaleData = (updateData) => {
  const jsonObj = JSON.stringify(updateData);
  fs.writeFile(localePath, jsonObj, (err) => {
    if (err) throw err;
    console.log("new data added");
  });
};

module.exports = {
  readLocaleData,
  updateLocaleData,
};
