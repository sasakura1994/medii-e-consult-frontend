/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { ImageEditorProps } from './ImageEditor';

type Point = {
  x: number;
  y: number;
};

type LineWidthType = 'thin' | 'normal' | 'thick';

export const useImageEditor = (props: ImageEditorProps) => {
  const [oldPoint, setOldPoint] = React.useState<Point>();
  const [isDown, setIsDown] = React.useState(false);
  const [scale, setScale] = React.useState(1.0);
  const [minScale, setMinScale] = React.useState(0.0);
  const [imageWidth, setImageWidth] = React.useState(0);
  const [imageHeight, setImageHeight] = React.useState(0);
  const [canvasWidth, setCanvasWidth] = React.useState(0);
  const [canvasHeight, setCanvasHeight] = React.useState(0);
  const [imageContext, setImageContext] =
    React.useState<CanvasRenderingContext2D>();
  const [drawContext, setDrawContext] =
    React.useState<CanvasRenderingContext2D>();
  const [lineWidth, setLineWidth] = React.useState(50);
  const [lineBaseWidth, setLineBaseWidth] = React.useState(50);
  const [lineWidthType, setLineWidthType] =
    React.useState<LineWidthType>('normal');
  const [drawingPoints, setDrawingPoints] = React.useState<Point[]>([]);
  const [lines, setLines] = React.useState<Point[][]>([]);
  const imageAreaRef = React.useRef<HTMLDivElement>(null);
  const imageCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const drawCanvasRef = React.useRef<HTMLCanvasElement>(null);

  const applyScale = React.useCallback(
    (newScale: number) => {
      const scale = minScale > newScale ? minScale : newScale;
      setScale(scale);
      setCanvasWidth(Math.floor(imageWidth * scale));
      setCanvasHeight(Math.floor(imageHeight * scale));
    },
    [minScale, imageWidth, imageHeight]
  );

  const setLineWidthByType = React.useCallback(
    (type: LineWidthType) => {
      switch (type) {
        case 'thin':
          setLineWidth(lineBaseWidth * 0.5);
          break;
        case 'normal':
          setLineWidth(lineBaseWidth);
          break;
        case 'thick':
          setLineWidth(lineBaseWidth * 1.8);
          break;
      }
      setLineWidthType(type);
    },
    [lineBaseWidth]
  );

  const initialize = React.useCallback(() => {
    if (!imageAreaRef.current) {
      return;
    }
    if (!imageCanvasRef.current) {
      return;
    }
    if (!drawCanvasRef.current) {
      return;
    }

    const imageAreaRect = imageAreaRef.current.getBoundingClientRect();
    const currentImageContext = imageCanvasRef.current.getContext('2d');
    const currentDrawContext = drawCanvasRef.current.getContext('2d');
    setImageContext(currentImageContext!);
    setDrawContext(currentDrawContext!);

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
        setCanvasWidth(width);
        setCanvasHeight(height);
        currentImageContext?.drawImage(image, 0, 0);
        const wScale = imageAreaRect.width / width;
        const hScale = imageAreaRect.height / height;
        const scale = Math.min(hScale, wScale);
        applyScale(scale);
        setLineBaseWidth(Math.min(width, height) * 0.05);
        setLineWidthByType('normal');
        setMinScale(scale);
      };
      image.src = args.target.result as string;
    };
    reader.readAsDataURL(props.file);
  }, [
    props,
    imageAreaRef.current,
    imageCanvasRef.current,
    drawCanvasRef.current,
    applyScale,
    setLineWidthByType,
  ]);

  React.useEffect(() => {
    initialize();
  }, [initialize]);

  const onMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      setIsDown(true);
      const rect = drawCanvasRef.current!.getBoundingClientRect();
      setDrawingPoints([
        {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        },
      ]);
    },
    []
  );

  const onMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDown) {
        return;
      }

      setIsDown(true);
      const rect = drawCanvasRef.current!.getBoundingClientRect();
      setDrawingPoints((drawingPoints) => [
        ...drawingPoints,
        {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        },
      ]);
    },
    [isDown]
  );

  const onMouseUp = React.useCallback(() => {
    if (!isDown) {
      return;
    }

    setLines((lines) => [...lines, drawingPoints]);
    setIsDown(false);
  }, [isDown, drawingPoints]);

  return {
    canvasWidth,
    canvasHeight,
    drawCanvasRef,
    imageAreaRef,
    imageCanvasRef,
    imageWidth,
    imageHeight,
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
};
