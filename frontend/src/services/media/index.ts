import { httpClient } from "util/Api";

export const uploadImage = (values: unknown) => {
  return httpClient
    .post("media/upload", values)
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
