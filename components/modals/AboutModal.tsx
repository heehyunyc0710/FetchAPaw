import { Dialog, DialogContent } from "../ui/dialog";

const AboutModal = ({aboutModalOpen, setAboutModalOpen}: {aboutModalOpen: boolean, setAboutModalOpen: (open: boolean) => void}) => {
  return (
   <div className="z-150">
     <Dialog open={aboutModalOpen} onOpenChange={setAboutModalOpen}>
    <DialogContent className="sm:max-w-[425px]">
     
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-center gap-2">
        <p className="text-xl font-semibold">Welcome to </p>
        <p className="text-xl font-bold text-yellow-500">FetchAPaw</p>
        </div>
        <p> We are the ultimate destination for dog lovers searching
        for their new best friend! </p>
        <p>Our mission is to connect shelter dogs
        with loving homes. </p>
        <p>Every dog deserves a second chance; start your search
        today and make a difference in a pup&apos;s life!</p>
    </div>
    </DialogContent>
  </Dialog>
   </div>
   
  );
};

export default AboutModal;
