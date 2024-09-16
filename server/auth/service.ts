export {};
const User = require("../models/user");
const bcrypt = require("bcrypt");
const ActiveSession = require("../models/activeSession");
const utils = require("../utils/generalUtils");

module.exports.createUser = async (values: any) => {
  //This layer is where data manipulation will occur. It's okay to have some logic here, but it should be minimal.
  // It's also OK to include some critical validation here in case the service is called by another service.
  const hashedPassword = await bcrypt.hash(values.password, 10);
  return User.create({
    ...values,
    password: hashedPassword,
  }).then((user: any) => {
    return user;
  });
};

module.exports.createActiveSession = async (
  userId: string,
  token: string,
  tokenExpiry: any
) => {
  return ActiveSession.create({
    userId,
    token,
    tokenExpiry,
  });
};

module.exports.getUser = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    // .populate({
    //   path: "locations",
    //   populate: {
    //     path: "spaces",
    //   },
    // })
    // .exec();

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// might try to make this one with getUserbyEmail
module.exports.getUserbyID = async (id: string) => {
  return User.findOne({ _id: id }).then((user: any) => {
    return user;
  });
};

module.exports.generateToken = () => {
  return utils.generateToken();
};

module.exports.updateUser = async (id: string, newvalues: any) => {
  return User.updateOne(
    { _id: id },
    {
      $set: { ...newvalues },
    }
  ).then((user: any) => {
    return user;
    // if (res.modifiedCount === 1) return true;
    // else return false;
  });
};

// module.exports.deleteSession = async (token: string) => {
//   return ActiveSession.deleteMany({ token: token });
// };
