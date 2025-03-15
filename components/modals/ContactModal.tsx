import { Dialog, DialogContent } from "../ui/dialog";

const ContactModal = ({contactModalOpen, setContactModalOpen}: {contactModalOpen: boolean, setContactModalOpen: (open: boolean) => void}) => {
  return (
   <div className="z-150">
     <Dialog open={contactModalOpen} onOpenChange={setContactModalOpen}>
    <DialogContent className="sm:max-w-[425px]">
     
    <div className="flex flex-col gap-2">
        <p className="text-xl font-semibold mb-3">Contact us</p>
        <p>Email: contact@fetchapaw.com</p>
        <p>Phone: 123-456-7890</p>
        <p>Address: 123 Main St, Anytown, USA</p>
    </div>
    </DialogContent>
  </Dialog>
   </div>
   
  );
};

export default ContactModal;
