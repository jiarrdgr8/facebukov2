// const ActiveSession = require("../services/auth/activeSession");

// const reqAuth = async (req, res, next) => {
//   let token = String(req.headers.authorization);
//   const rememberMe = req.body.rememberMe;
//   const maxSessionLength = (rememberMe ? 2592000000 : 86400000);
//   const currentTime = new Date();

//   try {
//     if (token.startsWith("Bearer ")) {
//       token = token.slice(7, token.length).trimStart()
//     }
//     const item = await ActiveSession.findOne({ token: token });

//     if (item) {
//       const sessionStart = new Date(item.date);
//       if (currentTime - sessionStart < maxSessionLength) {
//         return next();
//       } else {
//         await ActiveSession.deleteOne({ token: token });
//         res.status(401).json({ message: "Session expired. Please log in again." });
//       }
//     } else {
//       res.status(401).json({ message: "User is not logged on" });
//     }
//   } catch (err) {
//     res.status(500).json({  message: err });
//     console.log('An error occurred while authenticating.')
//   }
// };

// module.exports = {
//   reqAuth: reqAuth,
// };
