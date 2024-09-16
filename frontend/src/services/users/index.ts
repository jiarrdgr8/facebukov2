import { httpClient } from "util/Api";

export const createPost = (values: unknown) => {
  return httpClient
    .post("posts", values)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      } else {
        console.log(res);
      }
    })
    .catch(function (err) {
      console.log(err.response);
    });
};

export const updatePost = (id: string, values: unknown) => {
  return httpClient
    .put(`posts/${id}`, values)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      } else {
        console.log(res);
      }
    })
    .catch(function (err) {
      console.log(err.response);
    });
};
