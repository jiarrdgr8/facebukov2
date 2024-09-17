import { httpClient } from "util/Api";

export const getUser = (id: string) => {
  return httpClient
    .get(`users/${id}`)
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

export const updateUser = (id: string, values: unknown) => {
  return httpClient
    .put(`users/${id}`, values)
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
