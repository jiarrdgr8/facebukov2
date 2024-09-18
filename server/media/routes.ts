export {};
const express = require("express");
const router = express.Router();
const controller = require("./controller");

// router.get("/", async (req: any, res: any) => {
//   return controller.index(req, res);
// });

// router.get("/spaces/:id", async (req: any, res: any) => {
//   return controller.getBySpace(req, res);
// });

// router.get("/:id", async (req: any, res: any) => {
//   return controller.get(req, res);
// });

router.post("/upload", async (req: any, res: any) => {
  return controller.upload(req, res);
});

// router.put("/:id", async (req: any, res: any) => {
//   return controller.update(req, res);
// });

// router.delete("/:id", async (req: any, res: any) => {
//   return controller.delete(req, res);
// });

module.exports = router;
