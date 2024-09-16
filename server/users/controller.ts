export {};
const service = require("./service");

module.exports.index = async (req: any, res: any) => {
  try {
    const response = await service.index();
    if (response) {
      return res.status(200).json(response);
    } else {
      return res.status(404).json({ message: "No document found." });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.get = async (req: any, res: any) => {
  try {
    const response = await service.get(req.params.id);
    if (response) {
      return res.status(200).json(response);
    } else {
      return res.status(404).json({ message: "Document does not exist." });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// module.exports.getBySpace = async (req: any, res: any) => {
//   try {
//     const response = await service.getBySpace(req.params.id);
//     if (response) {
//       return res.status(200).json(response);
//     } else {
//       return res.status(404).json({ message: "Document does not exist." });
//     }
//   } catch (err) {
//     return res.status(500).json({ message: err });
//   }
// };

module.exports.create = async (req: any, res: any) => {
  try {
    console.log(req.body);
    // const response = await service.create(req.body);
    // if(response){
    //   return res.status(200).json(response);
    // }else{
    //   return res.status(400).json({ message: "Error in creating document" });
    // }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.update = async (req: any, res: any) => {
  try {
    console.log(req.params.id, req.body);
    const response = await service.update(req.params.id, req.body);
    console.log(response);
    if (response) {
      return res.status(200).json(response);
    } else {
      return res.status(400).json({ message: "Error updating the document." });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.delete = async (req: any, res: any) => {
  try {
    const doesExist = await service.get(req.params.id);
    if (!doesExist) {
      res.status(404).json("Document does not exist.");
    }
    const response = await service.delete(req.params.id);
    if (response) {
      return res.status(200).json(response);
    } else {
      return res.status(400).json({ message: "Error deleting document" });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
