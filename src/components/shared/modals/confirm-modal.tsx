"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FC } from "react";

interface ConfirmModalProps {
  open: boolean,
  title: string,
  onClose: () => void,
  onSuccess: () => void,
  subtitle?: string,
  isLoading?: boolean;
}

const ConfirmModal: FC<ConfirmModalProps> = (props) => {
  const { open, title, onClose, onSuccess, subtitle, isLoading } = props;

  const handleSuccess = () => {
    if (!isLoading) {
      onSuccess();
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen && !isLoading) onClose();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle
            className="text-center text-2xl"
          >
            {title}
          </DialogTitle>
          {
            !!subtitle && (
              <DialogDescription
                className="text-center py-2"
              >
                {subtitle}
              </DialogDescription>
            )
          }
        </DialogHeader>
        <DialogFooter className="justify-around">
          <Button
            type="button"
            variant="destructive"
            onClick={onSuccess}
            loading={isLoading}
            disabled={isLoading}
          >
            Ок
          </Button>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              disabled={isLoading}
            >
              Скасувати
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { ConfirmModal }