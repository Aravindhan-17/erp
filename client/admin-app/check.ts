import { UseMutationOptions } from "@tanstack/react-query";
type Test = NonNullable<UseMutationOptions<any, any, any, any>['onSuccess']>;
type Args = Parameters<Test>;
const a: Args = [];
