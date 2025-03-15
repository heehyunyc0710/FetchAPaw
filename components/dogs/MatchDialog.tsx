import { Dialog } from "@/components/ui/dialog";
import { Dog } from "@/types";
import DogInfoCard from "./DogInfoCard";

interface MatchDialogProps {
  dog: Dog;
  onClose: () => void;
}

export const MatchDialog = ({ dog, onClose }: MatchDialogProps) => (
  <Dialog open={true} onOpenChange={onClose}>
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md">
        <h2 className="text-2xl font-bold mb-4">Your Perfect Match!</h2>
       { dog && <DogInfoCard dog={dog} />}
        <button
          onClick={onClose}
          className="mt-4 bg-yellow-500 text-zinc-700 px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  </Dialog>
); 