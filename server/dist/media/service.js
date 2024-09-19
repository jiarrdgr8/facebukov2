"use strict";
// const User = require("../models/user");
// module.exports.index = async () => {
//   return User.find().then((result: any) => {
//     return result;
//   });
// };
// module.exports.get = async (id: string) => {
//   return User.findOne({ _id: id })
//     .populate("friends")
//     .then((result: any) => {
//       return result;
//     });
// };
// module.exports.create = async (values: any) => {
//   return User.create({
//     ...values,
//   }).then((result: any) => {
//     return result;
//   });
// };
// module.exports.update = async (id: string, values: any) => {
//   // console.log(values);
//   return User.findByIdAndUpdate(id, { ...values }, { new: true }).then(
//     (result: any) => {
//       console.log(result);
//       return result;
//     }
//   );
// };
// module.exports.delete = async (id: string) => {
//   return User.findByIdAndDelete(id).then((result: any) => {
//     return result;
//   });
// };
