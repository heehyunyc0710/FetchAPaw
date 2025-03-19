import { AxiosError } from "axios";
import { toast } from "sonner";

export const customToast = (title: string, message: string, type: "error" | "success") => {
    toast(title, {
        description: message,
        action: {
          label: "Dismiss",
          onClick: () => console.log("Undo"),
        },
        style: {
          backgroundColor: type === "error" ? "#E25E3E" : "#4CAF50",
        },
      });
};

const handleError = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.response && error.response.status === 401) {
        customToast("Unauthorized access. Please log in.", "Please log in to continue.", "error");
    } else if (error.response && error.response.status === 500) {
      // console.error("Internal server error:", error);
      customToast("Internal server error. Please try again later.", "Please try again later.", "error");
    } else {
      // console.error("Unexpected error:", error);
      customToast("An unexpected error occurred. Please try again later.", "Please try again later.", "error");
    }
  } else {
    // console.error("Unexpected error:", error);
    customToast("An unexpected error occurred. Please try again later.", "Please try again later.", "error");
  }
};

export default handleError;
