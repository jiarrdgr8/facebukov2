const Post = require("../models/post");

module.exports.index = async () => {
  // console.log("here");
  return Post.find()
    .populate("user")
    .then((result: any) => {
      return result;
    });
};

module.exports.get = async (id: string) => {
  return (
    Post.findOne({ _id: id })
      // .populate("motorhomes")
      .then((result: any) => {
        return result;
      })
  );
};

module.exports.create = async (values: any) => {
  return Post.create({
    ...values,
  }).then((result: any) => {
    return result;
  });
};

module.exports.update = async (id: string, values: any) => {
  // console.log(values);
  return Post.findByIdAndUpdate(id, { ...values }, { new: true }).then(
    (result: any) => {
      console.log(result);
      return result;
    }
  );
};

module.exports.delete = async (id: string) => {
  return Post.findByIdAndDelete(id).then((result: any) => {
    return result;
  });
};
