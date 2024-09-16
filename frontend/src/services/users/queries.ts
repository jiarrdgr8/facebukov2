import * as service from "./index.js";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreatePost = (cbFunction?: (res: unknown) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => service.createPost(values),
    onSuccess: (res) => {
      // queryClient.invalidateQueries(["payments"], ["brands", res.brand]); //review: other keys that should invalidate
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      if (cbFunction) cbFunction(res);
    },
  });
};

export const useUpdatePost = (cbFunc?: (res: unknown) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, values }: { id: string; values: unknown }) =>
      service.updatePost(id, values),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["posts", res?._id] });

      if (cbFunc) cbFunc(res);
    },
  });
};
