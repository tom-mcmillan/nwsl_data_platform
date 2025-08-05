import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  userEmail: string | null;
  isSignedIn: boolean;
  signIn: (email: string) => void;
  signOut: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userEmail: null,
      isSignedIn: false,
      signIn: (email: string) => {
        set({ userEmail: email, isSignedIn: true });
      },
      signOut: () => {
        set({ userEmail: null, isSignedIn: false });
      },
    }),
    {
      name: "auth-store",
    }
  )
);

export default useAuthStore;