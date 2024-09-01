import { Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";

interface Iprops {
  isOpen: boolean;
  close: () => void;
  title?: string;
  description?: string
  children: ReactNode;
}

const Modal = ({ isOpen, close, title, children, description }: Iprops) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10"
        onClose={close}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl">
                <DialogTitle
                  as="h3"
                  className="text-base/7 font-medium text-black uppercase"
                >
                  {title}
                </DialogTitle>
                <DialogTitle
                  as="h3"
                  className="text-base/7 font-sm text-gray-500 leading-tight"
                >
                  {description}
                </DialogTitle>
                <div className="mt-4">
                  {children}
                </div>
              </DialogPanel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;

