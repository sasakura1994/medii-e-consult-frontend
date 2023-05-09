import React from 'react';

type DocumentTypeSelectButtonProps = {
  image: string;
  text: string;
  onClick: () => void;
  children: React.ReactNode;
};

const DocumentTypeSelectButton: React.FC<DocumentTypeSelectButtonProps> = ({
  image,
  text,
  onClick,
  children,
}) => {
  return (
    <div className="w-full cursor-pointer">
      <div onClick={onClick} className="block text-center text-inherit">
        <div
          className="flex flex-row items-center justify-center rounded-md border-2 border-primary
         bg-white py-3 shadow-md hover:shadow-lg lg:mx-0 lg:flex-col lg:py-5 lg:px-1"
        >
          <div className="mx-2 flex h-12 items-center justify-center lg:mr-0 lg:h-10">
            <img src={image} alt="" />
          </div>
          <div className="mt-3 flex items-center justify-center pb-2 lg:pb-0">
            <div className="flex justify-center text-sm text-primary">
              {text}
            </div>
            <img
              className="ml-1 inline-block h-3 w-3"
              src="/icons/arrow_right.svg"
              alt="arrow_right"
            />
          </div>
        </div>
      </div>
      <div className="mt-2 text-center text-sm text-gray-400">{children}</div>
    </div>
  );
};

export default DocumentTypeSelectButton;
