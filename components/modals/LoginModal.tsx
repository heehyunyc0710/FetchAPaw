import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

export function LoginModal({
  loginModalOpen,
  setLoginModalOpen,
 
}: {
  loginModalOpen: boolean;
  setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isNav: boolean;
}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const { login } = useAuth();
  const handleLogIn = async () => {
    await login(username, email);

    setLoginModalOpen(false);
    // console.log(res)
  };
  return (
    <Dialog open={loginModalOpen} onOpenChange={setLoginModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Log In</DialogTitle>
        
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              className="col-span-3"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              className="col-span-3"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <button
            className="cursor-pointer bg-yellow-500 text-zinc-700 rounded-full px-4 py-2"
            onClick={handleLogIn}
          >
            Log In
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
