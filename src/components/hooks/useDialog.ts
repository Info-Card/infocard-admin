import { useState, useCallback } from 'react';

interface Data {
  title: string;
  message: string;
}

/**
 * useDialog - A custom hook for handling the open/close state and data of a dialog.
 *
 * @return {Object} An object containing 'isOpen', 'data', 'open', 'close', and 'setData' properties.
 */
function useDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<Data | null>(null);

  // Open the dialog
  const open = useCallback((dialogData: Data | null = null) => {
    setData(dialogData);
    setIsOpen(true);
  }, []);

  // Close the dialog
  const close = useCallback(() => {
    setIsOpen(false);
    // Optionally reset the dialog data
    setData(null);
  }, []);

  return {
    isOpen,
    data,
    open,
    close,
    setData,
  };
}

export default useDialog;
