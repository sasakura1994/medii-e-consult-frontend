import { ColoredImage } from '@/components/Image/ColoredImage';
import React from 'react';

type DocumentTypeSelectButtonProps = {
  image: string;
  text: string;
  onClick: () => void;
  children: React.ReactNode;
  id: string;
};

const DocumentTypeSelectButton: React.FC<DocumentTypeSelectButtonProps> = ({ image, text, onClick, children, id }) => {
  return (
    <div className="w-full cursor-pointer">
      <div onClick={onClick} className="block h-full text-inherit">
        <div
          className="flex h-full flex-col items-center justify-start rounded-md
         border border-border-field bg-white py-4"
        >
          <div className="flex h-[64px] items-center justify-center">
            <img src={image} alt="" />
          </div>
          <div className="mt-[10px] flex items-center justify-center">
            <div className="flex justify-center font-semibold text-medii-blue-base" data-testid={id}>
              {text}
            </div>
            <ColoredImage width="7px" height="13px" color="#0758E4" className="ml-3" src="icons/arrow_right.svg" />
          </div>
          <div className="mt-[10px] px-4 text-medii-sm text-secondary">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DocumentTypeSelectButton;
