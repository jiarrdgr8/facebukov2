module.exports.randomString = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

module.exports.generateToken = () => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 40; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

module.exports.randomEmail = () => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 40; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return `anon${result}@giveatrap.org.nz`;
};

// const { DateTime } = require("luxon");
// module.exports.getLocalDate = (isoDate: any, timezone: any) => {
//   //ISO date are usual date format obtained from mongo db documents

//   const date_isoString = isoDate.toISOString(); //need to convert the date obtained db from ISO to ISO string

//   const renewalDate = DateTime.fromISO(date_isoString).setZone(
//     timezone || "utc"
//   ); //need to convert from ISO to luxon DateTime format and set the time based on time zone

//   const longDateTime = renewalDate.toLocaleString(DateTime.DATETIME_MED); // converts to long date and time format

//   return longDateTime;
// };
