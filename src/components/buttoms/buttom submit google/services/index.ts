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
        console.error("Sign in error:", result.error);
        toast.error(`Failed to sign in with Google: ${result.error}`);
        return;
      }

      if (result?.ok) {
        toast.success("Successfully signed in!");
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error("Unexpected error during sign in:", error);
      toast.error("An error occurred while trying to sign in with Google.");
    } finally {
    }
  };

  return { handleClick };
}
