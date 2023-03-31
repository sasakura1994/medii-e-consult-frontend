/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { KonvaEventObject } from 'konva/lib/Node';
import React from 'react';
import { ImageEditorProps } from './ImageEditor';

type LineWidthType = 'thin' | 'normal' | 'thick';

type Line = {
  points: number[];
  lineWidth: number;
};

export const useImageEditor = (props: ImageEditorProps) => {
  const [isDown, setIsDown] = React.useState(false);
  const [scale, setScale] = React.useState(1.0);
  const [minScale, setMinScale] = React.useState(0.0);
  const [imageWidth, setImageWidth] = React.useState(0);
  const [imageHeight, setImageHeight] = React.useState(0);
  const [lineBaseWidth, setLineBaseWidth] = React.useState(50);
  const [lineWidthType, setLineWidthType] =
    React.useState<LineWidthType>('normal');
  const [isLineWidthSettingShown, setIsLineWidthSettingShown] =
    React.useState(false);
  const [drawingPoints, setDrawingPoints] = React.useState<number[]>([]);
  const [lines, setLines] = React.useState<Line[]>([]);
  const [image, setImage] = React.useState<HTMLImageElement>();
  const imageAreaRef = React.useRef<HTMLDivElement>(null);
  const drawCanvasRef = React.useRef(null);
  const canvasWidth = Math.floor(imageWidth * scale);
  const canvasHeight = Math.floor(imageHeight * scale);
  const lineWidth = React.useMemo(() => {
    switch (lineWidthType) {
      case 'thin':
        return lineBaseWidth * 0.5;
      case 'normal':
        return lineBaseWidth;
      case 'thick':
        return lineBaseWidth * 1.8;
    }
  }, [lineWidthType, lineBaseWidth]);

  const initialize = React.useCallback(() => {
    if (!imageAreaRef.current) {
      return;
    }

    const imageAreaRect = imageAreaRef.current.getBoundingClientRect();
    console.log(imageAreaRect);

    const reader = new FileReader();
    reader.onload = (args) => {
      if (!args.target?.result) {
        console.error('Load file failed');
        return;
      }

      const image = new Image();
      image.onerror = () => {
        console.log('Image failed!');
      };
      image.onload = () => {
        const width = Math.floor(image.naturalWidth);
        const height = Math.floor(image.naturalHeight);
        setImageWidth(width);
        setImageHeight(height);
        const wScale = imageAreaRect.width / width;
        const hScale = imageAreaRect.height / height;
        console.log({ imageAreaRectW: imageAreaRect.width, width, wScale });
        const scale = Math.min(hScale, wScale);
        setScale(scale);
        setLineBaseWidth(Math.min(width, height) * 0.05);
        setMinScale(scale);
        setImage(image);
      };
      image.src = args.target.result as string;
    };
    reader.readAsDataURL(props.file);
  }, []);

  React.useEffect(() => {
    initialize();
  }, []);

  const onMouseDown = React.useCallback((e: KonvaEventObject<MouseEvent>) => {
    setIsDown(true);
    const pos = e.target.getPosition();
    setDrawingPoints([e.evt.offsetX - pos.x, e.evt.offsetY - pos.y]);
  }, []);

  const onMouseMove = React.useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (!isDown) {
        return;
      }

      setIsDown(true);
      const pos = e.target.getPosition();
      setDrawingPoints((drawingPoints) => [
        ...drawingPoints,
        e.evt.offsetX - pos.x,
        e.evt.offsetY - pos.y,
      ]);
    },
    [isDown]
  );

  const onMouseUp = React.useCallback(() => {
    if (!isDown) {
      return;
    }

    setLines((lines) => [...lines, { lineWidth, points: drawingPoints }]);
    setDrawingPoints([]);
    setIsDown(false);
  }, [isDown, drawingPoints, lineWidth]);

  const undo = React.useCallback(() => {
    setLines((lines) => lines.slice(0, lines.length - 1));
  }, []);

  return {
    canvasWidth,
    canvasHeight,
    drawCanvasRef,
    drawingPoints,
    image,
    imageAreaRef,
    // imageCanvasRef,
    imageWidth,
    imageHeight,
    lines,
    lineWidth,
    lineWidthType,
    isLineWidthSettingShown,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    scale,
    setIsLineWidthSettingShown,
    setLineWidthType,
    undo,
  };
};
