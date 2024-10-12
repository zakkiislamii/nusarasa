import { signIn } from "next-auth/react";
import { toast } from "sonner";

export default function loginWithGoogle() {
  const handleClick = async (onSuccess?: () => void) => {
    try {
      const result = await signIn("google", {
        callbackUrl: "/",
        redirect: false,
      });

      if (result?.error) {
        toast.error(`${result.error}`);
        return;
      }

      if (result?.ok) {
        toast.success("Successfully signed in!");
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      toast.error(`${error}`);
    } finally {
    }
  };
  return { handleClick };
}
