import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

const ContactModal = ({
  contactModalOpen,
  setContactModalOpen,
}: {
  contactModalOpen: boolean;
  setContactModalOpen: (open: boolean) => void;
}) => {
  return (
    <div className="z-150">
      <Dialog open={contactModalOpen} onOpenChange={setContactModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>Contact Us</DialogTitle>
          <div className="flex flex-col gap-2">
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
