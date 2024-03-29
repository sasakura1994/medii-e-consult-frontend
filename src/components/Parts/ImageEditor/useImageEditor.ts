/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { KonvaEventObject } from 'konva/lib/Node';
import React from 'react';
import { ImageEditorProps } from './ImageEditor';
import Konva from 'konva';

type LineWidthType = 'thin' | 'normal' | 'thick';

type Line = {
  points: number[];
  lineWidth: number;
};

export const useImageEditor = (props: ImageEditorProps) => {
  const [isDown, setIsDown] = React.useState(false);
  const [scale, setScale] = React.useState(1.0);
  const [minScale, setMinScale] = React.useState(1.0);
  const [imageWidth, setImageWidth] = React.useState(0);
  const [imageHeight, setImageHeight] = React.useState(0);
  const [lineBaseWidth, setLineBaseWidth] = React.useState(50);
  const [lineWidthType, setLineWidthType] = React.useState<LineWidthType>('normal');
  const [isLineWidthSettingShown, setIsLineWidthSettingShown] = React.useState(false);
  const [drawingPoints, setDrawingPoints] = React.useState<number[]>([]);
  const [lines, setLines] = React.useState<Line[]>([]);
  const [image, setImage] = React.useState<HTMLImageElement>();

  const imageAreaRef = React.useRef<HTMLDivElement>(null);
  const stageRef = React.useRef<Konva.Stage>(null);
  const [firstCanvasWidth, setFirstCanvasWidth] = React.useState(0);
  const [firstCanvasHeight, setFirstCanvasHeight] = React.useState(0);

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

  const allScaledLines = React.useMemo(() => {
    const currentDrawingPoints = drawingPoints.length === 2 ? [...drawingPoints, ...drawingPoints] : drawingPoints;
    const allLines = [...lines, { points: currentDrawingPoints, lineWidth }];
    if (scale === minScale) {
      return allLines;
    }

    return allLines.map((line) => ({
      points: line.points.map((point) => (point * scale) / minScale),
      lineWidth: (line.lineWidth * scale) / minScale,
    }));
  }, [lines, scale, drawingPoints, lineWidth, minScale]);

  const initialize = React.useCallback(() => {
    if (!imageAreaRef.current) {
      return;
    }

    const imageAreaRect = imageAreaRef.current.getBoundingClientRect();

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
        const scale = Math.min(hScale, wScale);
        console.log('scale' + scale);

        setScale(scale);
        // 中ペンの太さを画像の短い方の辺の長さの5％に設定
        setLineBaseWidth(Math.min(firstCanvasHeight, firstCanvasWidth) * 0.05);
        setMinScale(scale);
        setImage(image);
      };
      image.src = args.target.result as string;
    };
    reader.readAsDataURL(props.file);
  }, [firstCanvasHeight, firstCanvasWidth, props.file]);

  const onMouseDown = React.useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      setIsDown(true);
      const pos = e.target.getPosition();
      setDrawingPoints([((e.evt.offsetX - pos.x) * minScale) / scale, ((e.evt.offsetY - pos.y) * minScale) / scale]);
    },
    [scale, minScale]
  );

  const onTouchStart = React.useCallback(
    (e: KonvaEventObject<TouchEvent>) => {
      if (e.evt.touches.length === 1) {
        const rect = (e.evt.target as HTMLCanvasElement).getBoundingClientRect();
        onMouseDown({
          target: e.target,
          evt: {
            offsetX: e.evt.touches[0].clientX - rect.left,
            offsetY: e.evt.touches[0].clientY - rect.top,
          },
        } as KonvaEventObject<MouseEvent>);
      }
    },
    [onMouseDown]
  );

  const onMouseMove = React.useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (!isDown) {
        return;
      }

      const pos = e.target.getPosition();
      setDrawingPoints((drawingPoints) => [
        ...drawingPoints,
        ((e.evt.offsetX - pos.x) * minScale) / scale,
        ((e.evt.offsetY - pos.y) * minScale) / scale,
      ]);
    },
    [isDown, scale, minScale]
  );

  const onTouchMove = React.useCallback(
    (e: KonvaEventObject<TouchEvent>) => {
      if (e.evt.touches.length === 1) {
        const rect = (e.evt.target as HTMLCanvasElement).getBoundingClientRect();
        onMouseMove({
          target: e.target,
          evt: {
            offsetX: e.evt.touches[0].clientX - rect.left,
            offsetY: e.evt.touches[0].clientY - rect.top,
          },
        } as KonvaEventObject<MouseEvent>);
      }
    },
    [onMouseMove]
  );

  const drawEnd = React.useCallback(() => {
    if (!isDown) {
      return;
    }

    const currentDrawingPoints = drawingPoints.length === 2 ? [...drawingPoints, ...drawingPoints] : drawingPoints;
    setLines((lines) => [...lines, { lineWidth, points: currentDrawingPoints }]);
    setDrawingPoints([]);
    setIsDown(false);
  }, [isDown, drawingPoints, lineWidth]);

  const onTouchEnd = React.useCallback(() => {
    drawEnd();
  }, [drawEnd]);

  const onMouseUp = React.useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (e.evt.type !== 'mouseup' && e.evt.type !== 'mouseout') {
        // なぜかmousemoveも来て線がちぎれまくるため…
        return;
      }

      drawEnd();
    },
    [drawEnd]
  );

  const undo = React.useCallback(() => {
    setLines((lines) => lines.slice(0, lines.length - 1));
  }, []);

  const changeScale = React.useCallback(
    (newScale: number) => {
      if (minScale > newScale) {
        newScale = minScale;
      }

      setScale(newScale);
    },
    [minScale]
  );

  const onSubmit = React.useCallback(() => {
    const dataURL = stageRef.current!.toDataURL({ quality: 1.0, pixelRatio: 2.0 });

    const bin = window.atob(dataURL.replace(/^.*,/, ''));
    const buffer = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) {
      buffer[i] = bin.charCodeAt(i);
    }
    const resultFile = new File([buffer.buffer], 'image.jpg', {
      type: 'image/jpeg',
    });
    props.onSubmit(resultFile);
  }, [props]);

  React.useEffect(() => {
    initialize();
  }, [initialize]);

  React.useEffect(() => {
    setFirstCanvasWidth((prev) => {
      return prev === 0 ? canvasWidth : prev;
    });
    setFirstCanvasHeight((prev) => {
      return prev === 0 ? canvasHeight : prev;
    });
  }, [canvasWidth, canvasHeight]);

  return {
    allScaledLines,
    canvasWidth,
    canvasHeight,
    changeScale,
    image,
    imageAreaRef,
    lines,
    lineWidthType,
    isLineWidthSettingShown,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onSubmit,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    scale,
    setIsLineWidthSettingShown,
    setLineWidthType,
    stageRef,
    undo,
  };
};
