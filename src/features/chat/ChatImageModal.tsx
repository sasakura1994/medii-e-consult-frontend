import { PrimaryButton } from '@/components/Parts/Button/PrimaryButton';
import React, { useState, useRef, useEffect, MouseEvent } from 'react';

const zoomScale = 1.5;

interface ChatImageModalProps {
  fileName?: string;
  url: string;
  onClose: () => void;
}

const ChatImageModal = ({ fileName, url, onClose }: ChatImageModalProps) => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [dragStartY, setDragStartY] = useState<number>(0);
  const [imageStartX, setImageStartX] = useState<number>(0);
  const [imageStartY, setImageStartY] = useState<number>(0);
  const [isMoving, setIsMoving] = useState<boolean>(false);

  const imageAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imageAreaRef.current) {
      setX(imageAreaRef.current.clientWidth / 2);
      setY(imageAreaRef.current.clientHeight / 2);
    }

    const image = new Image();

    image.onload = () => {
      setWidth(image.width);
      setHeight(image.height);
      if (imageAreaRef.current) {
        const fitWidthScale = imageAreaRef.current.clientWidth / image.width;
        const fitHeightScale = imageAreaRef.current.clientHeight / image.height;

        if (fitWidthScale < fitHeightScale) {
          setScale(fitWidthScale);
        } else {
          setScale(fitHeightScale);
        }
      }
    };

    image.src = url;
  }, [url]);

  const imageX = () => {
    return x - (width * scale) / 2;
  };

  const imageY = () => {
    return y - (height * scale) / 2;
  };

  const dragStart = (e: MouseEvent) => {
    const event = getEvent(e, 'mousedown');
    setDragStartX(event.pageX);
    setDragStartY(event.pageY);
    setImageStartX(x);
    setImageStartY(y);
    setIsMoving(true);
  };

  const dragMove = (e: MouseEvent) => {
    if (!isMoving) return;

    const event = getEvent(e, 'mousemove');
    setX(imageStartX + (event.pageX - dragStartX));
    setY(imageStartY + (event.pageY - dragStartY));
  };

  const dragEnd = () => {
    setIsMoving(false);
  };

  const getEvent = (e: MouseEvent | TouchEvent, type: string): MouseEvent | Touch => {
    if ('changedTouches' in e) {
      return e.changedTouches[0];
    } else if (e.type === type) {
      return e;
    }
    throw new Error(`Unexpected event type: ${e.type}`);
  };

  const zoomIn = () => {
    if (imageAreaRef.current) {
      const centerX = imageAreaRef.current.clientWidth / 2;
      const centerY = imageAreaRef.current.clientHeight / 2;
      setScale(scale * zoomScale);
      setX((x - centerX) * zoomScale + centerX);
      setY((y - centerY) * zoomScale + centerY);
    }
  };

  const zoomOut = () => {
    if (imageAreaRef.current) {
      const centerX = imageAreaRef.current.clientWidth / 2;
      const centerY = imageAreaRef.current.clientHeight / 2;
      setScale(scale / zoomScale);
      setX((x - centerX) / zoomScale + centerX);
      setY((y - centerY) / zoomScale + centerY);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[101] flex items-center justify-center bg-[rgba(157,157,157,0.7)]"
      onMouseMove={dragMove}
      onMouseUp={dragEnd}
    >
      <div className="fixed inset-0 flex flex-col lg:static lg:h-[603px] lg:w-[865px]">
        <div className="flex items-center justify-between bg-[#333333] py-4 pl-4 pr-8">
          <PrimaryButton className="cursor-pointer px-[40px] py-[8px] text-base" onClick={onClose}>
            閉じる
          </PrimaryButton>
          <div className="hidden items-center gap-x-[40px] lg:flex">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                zoomIn();
              }}
              className="block h-[40px] w-[40px] bg-[url('/icons/zoom_in.svg')] hover:bg-[url('/icons/zoom_in_hover.svg')]"
            ></a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                zoomOut();
              }}
              className="block h-[40px] w-[40px] bg-[url('/icons/zoom_out.svg')] hover:bg-[url('/icons/zoom_out_hover.svg')]"
            ></a>
          </div>
        </div>
        <div ref={imageAreaRef} className="relative flex-grow overflow-hidden bg-[#d9d9d9]">
          {url && (
            <img
              src={url}
              alt={fileName}
              style={{
                display: 'block',
                position: 'absolute',
                pointerEvents: isMoving ? 'none' : 'auto',
                cursor: 'grab',
                left: `${imageX()}px`,
                top: `${imageY()}px`,
                width: width * scale + 'px',
                height: height * scale + 'px',
                maxWidth: 'none',
              }}
              onMouseDown={dragStart}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatImageModal;
