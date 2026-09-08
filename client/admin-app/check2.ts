import { useMutation, UseMutationOptions } from "@tanstack/react-query";
function test() {
  useMutation({
    mutationFn: () => Promise.resolve(1),
    onSuccess: (...args) => {
      const a = args;
    }
  });
}
