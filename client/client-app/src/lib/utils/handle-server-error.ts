import { AxiosError } from "axios";
import { toast } from "sonner";

export function handleServerError(error: unknown) {
  let errMsg = null;

  if (error && typeof error === "object" && "status" in error) {
    const status = (error as { status?: unknown }).status;
    if (Number(status) === 204) {
      errMsg = "Content not found.";
    }
  }

  if (error instanceof AxiosError) {
    if (error.config?.url?.includes("refreshToken")) {
      return;
    }

    const data = error.response?.data;

    if (data) {
      if (typeof data === "string") {
        errMsg = data;
      } else if (typeof data === "object") {
        // Prioritize 'message' field
        if (data.message && typeof data.message === "string") {
          errMsg = data.message;
        }
        // Then check if 'error' is a string
        else if (data.error && typeof data.error === "string") {
          errMsg = data.error;
        }
        // Then check if 'error' is an object with a message
        else if (
          data.error &&
          typeof data.error === "object" &&
          "message" in data.error
        ) {
          errMsg = String((data.error as { message: unknown }).message);
        }
        // Fallback to title
        else if (data.title && typeof data.title === "string") {
          errMsg = data.title;
        }
        // Last resort: stringify if it's not too large, or generic message
        else {
          errMsg = JSON.stringify(data);
        }
      }
    } else {
      errMsg = error.message;
    }
  } else if (error instanceof Error) {
    errMsg = error.message;
  }

  if (import.meta.env.MODE === "development") {
    console.error("Server Error Caught:", errMsg, error);
  }

  if (!errMsg) errMsg = "Something went wrong!";

  toast.error(errMsg);
}
