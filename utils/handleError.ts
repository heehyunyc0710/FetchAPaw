import { AxiosError } from "axios";
import { toast } from "sonner";

const handleError = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.response && error.response.status === 401) {
      toast.error("Unauthorized access. Please log in.");
    } else if (error.response && error.response.status === 500) {
      // console.error("Internal server error:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    } else {
      // console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  } else {
    // console.error("Unexpected error:", error);
    toast.error("An unexpected error occurred. Please try again later.");
  }
};

export default handleError;
