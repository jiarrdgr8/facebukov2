import * as service from "./index.js";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGetUser = (id: string) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => service.getUser(id),
  });
};

// export const useCreateUser = (cbFunction?: (res: unknown) => void) => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (values) => service.get(values),
//     onSuccess: (res) => {
//       // queryClient.invalidateQueries(["payments"], ["brands", res.brand]); //review: other keys that should invalidate
//       queryClient.invalidateQueries({ queryKey: ["posts"] });
//       if (cbFunction) cbFunction(res);
//     },
//   });
// };

export const useUpdateUser = (cbFunc?: (res: unknown) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, values }: { id: string; values: unknown }) =>
      service.updateUser(id, values),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["users", res?._id] });

      if (cbFunc) cbFunc(res);
    },
  });
};
