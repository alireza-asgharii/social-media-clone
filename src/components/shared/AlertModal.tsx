import { useModal } from "../../context/ModalContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const AlertModal = () => {
  const { confirmAction, desc, title, buttonName } = useModal();
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger id="modal">Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title ?? "Default title!"}</AlertDialogTitle>
            <AlertDialogDescription>
              {desc ?? "Default desc!"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel id="close-modal">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmAction}>
              {buttonName ?? "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AlertModal;
