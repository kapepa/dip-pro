import { useCallback, useState, useTransition } from "react";

interface ViewTextProps {
  title: string,
  subtitle?: string,
}

interface UseConfirmReturn {
  title: string,
  subtitle?: string,
  handlerClose: () => void,
  handlerSuccess: () => void,
  handlerOpenModal: (props: ViewTextProps, cb: () => void) => void,
  openConfirmModal: boolean,
  isPending?: boolean;
}

export function useConfirm(): UseConfirmReturn {
  const [isPending, startTransition] = useTransition()
  const [callback, setCallback] = useState<(() => void) | null>(null);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [viewText, setViewText] = useState<ViewTextProps>({ title: "", subtitle: "" })

  const handlerClose = useCallback(() => {
    setOpenConfirmModal(false);
    setCallback(null);
  }, [setCallback, openConfirmModal])

  const handlerSuccess = useCallback(() => {
    startTransition(() => {
      try {
        console.log(callback)
        if (callback) callback();
      } finally {
        handlerClose();
      }
    })
  }, [callback])

  const handlerOpenModal = useCallback((props: ViewTextProps, cb: () => void) => {
    setViewText(props)
    setCallback(() => cb);
    setOpenConfirmModal(true);
  }, [])

  return { ...viewText, isPending, handlerClose, handlerSuccess, handlerOpenModal, openConfirmModal }
}