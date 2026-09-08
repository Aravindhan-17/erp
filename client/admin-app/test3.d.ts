import { UseMutationOptions } from "@tanstack/react-query";
export type Options = UseMutationOptions<any, Error, any>;
export type OnSuccessArgs = Parameters<NonNullable<Options['onSuccess']>>;
