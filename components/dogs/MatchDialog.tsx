import { Dialog } from "@/components/ui/dialog";
import { Dog } from "@/types";
import DogInfoCard from "./DogInfoCard";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface MatchDialogProps {
  dog: Dog;
  onClose: () => void;
}

export const MatchDialog = ({ dog, onClose }: MatchDialogProps) => {
  const router = useRouter();
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg max-w-md relative">
          <h2 className="text-2xl font-bold mb-4">Your Pawfect Match!</h2>
          {dog && <DogInfoCard dog={dog} />}
          <div className="flex items-center gap-2 mt-4 w-full cursor-pointer">
            <button
              onClick={() => router.push(`/dogs/${dog.id}`)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md w-full cursor-pointer"
            >
              Adopt me!
            </button>
          </div>
          <button
            onClick={onClose}
            className="absolute top-0 right-0 font-bold bg-transparent text-yellow-600 px-4 py-2 rounded"
          >
            <X className="w-6 h-6 " />
          </button>
        </div>
      </div>
    </Dialog>
  );
};
