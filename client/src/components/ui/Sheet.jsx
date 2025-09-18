import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export function Sheet({ children, trigger }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-0 right-0 h-full w-80 bg-white p-4 shadow-lg">
          <Dialog.Close asChild>
            <button
              aria-label="Close"
              className="absolute top-4 right-4"
            >
              <X size={24} />
            </button>
          </Dialog.Close>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export const SheetTrigger = Dialog.Trigger;
export const SheetContent = Dialog.Content;
