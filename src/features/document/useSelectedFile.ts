import { useState, useCallback, useRef } from 'react';

type UseSelectedFile = () => {
  file?: File;
  imageSource: string;
  onFileSelected: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setImageSource: React.Dispatch<React.SetStateAction<string>>;
  openFileSelector: () => void;
  fileSelectorRef: React.RefObject<HTMLInputElement>;
  reset: () => void;
};
export const useSelectedFile: UseSelectedFile = () => {
  const [file, setFile] = useState<File>();
  const [imageSource, setImageSource] = useState('');
  const fileSelectorRef = useRef<HTMLInputElement>(null);

  const onFileSelected = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSource(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setFile(file);
    }
  }, []);

  const openFileSelector = useCallback(() => {
    fileSelectorRef.current?.click();
  }, []);

  const reset = useCallback(() => {
    setFile(undefined);
    setImageSource('');
    if (fileSelectorRef.current) {
      fileSelectorRef.current.value = '';
    }
  }, []);

  return {
    file,
    imageSource,
    setImageSource,
    onFileSelected,
    openFileSelector,
    fileSelectorRef,
    reset,
  };
};
