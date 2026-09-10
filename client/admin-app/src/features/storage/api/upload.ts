import { axiosPrivate } from "@/lib/api-client";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { MutationConfig } from "@/types/query";

type GetPresignedUrlDTO = {
  fileName: string;
  contentType: string;
  fileSize: number;
  folder?: string;
};

type PresignedUrlResponse = {
  uploadUrl: string;
  key: string;
  publicUrl: string;
};

export const getPresignedUrl = async (data: GetPresignedUrlDTO): Promise<PresignedUrlResponse> => {
  const res = await axiosPrivate.post("/admin/uploads/presigned-url", data);
  return res.data;
};

export const uploadFileToS3 = async (url: string, file: File) => {
  await axios.put(url, file, {
    headers: {
      "Content-Type": file.type,
    },
  });
};

export const uploadFile = async (file: File, folder: string = "categories") => {
  // 1. Get presigned URL
  const { uploadUrl, key, publicUrl } = await getPresignedUrl({
    fileName: file.name,
    contentType: file.type,
    fileSize: file.size,
    folder,
  });

  // 2. Upload directly to S3/B2
  await uploadFileToS3(uploadUrl, file);

  // 3. Return the key and publicUrl
  return { key, publicUrl };
};

type UploadFileArgs = {
  file: File;
  folder: "categories" | "products" | "avatars";
};

type UseUploadFileOptions = {
  mutationConfig?: MutationConfig<({ file, folder }: UploadFileArgs) => ReturnType<typeof uploadFile>>;
};

export const useUploadFile = ({ mutationConfig }: UseUploadFileOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    ...restConfig,
    mutationFn: ({ file, folder }: UploadFileArgs) => uploadFile(file, folder),
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
  });
};
