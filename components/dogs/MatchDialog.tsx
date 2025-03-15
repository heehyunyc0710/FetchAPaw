import { Dialog } from "@/components/ui/dialog";
import { Dog } from "@/types";
import DogInfoCard from "./DogInfoCard";
import { X } from "lucide-react";


interface MatchDialogProps {
  dog: Dog;
  onClose: () => void;
}

export const MatchDialog = ({ dog, onClose }: MatchDialogProps) => (
  <Dialog open={true} onOpenChange={onClose}>
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md relative">
        <h2 className="text-2xl font-bold mb-4">Your Pawfect Match!</h2>
       { dog && <DogInfoCard dog={dog} />}
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