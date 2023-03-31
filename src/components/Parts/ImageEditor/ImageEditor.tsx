import React from 'react';
import { useImageEditor } from './useImageEditor';
import styles from './ImageEditor.module.scss';
import { ImageEditorPenSize } from './ImageEditorPenSize';
import { Layer, Line, Image, Stage, Circle } from 'react-konva';

const lineColor = '#F5847D';

export type ImageEditorProps = {
  file: File;
};

const ImageEditor: React.FC<ImageEditorProps> = (props: ImageEditorProps) => {
  const {
    canvasWidth,
    canvasHeight,
    drawCanvasRef,
    drawingPoints,
    image,
    imageAreaRef,
    // imageCanvasRef,
    imageWidth,
    imageHeight,
    isLineWidthSettingShown,
    lines,
    lineWidth,
    lineWidthType,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    setIsLineWidthSettingShown,
    setLineWidthType,
  } = useImageEditor(props);

  return (
    <div
      className="
        fixed
        inset-0  
        z-[1]
        flex
        flex-col
        items-center
        justify-between
        overflow-hidden
        bg-black/[.7]
      "
    >
      <div
        className="
          my-1
          flex
          w-full
          shrink-0
          grow-0
          justify-between
          justify-items-center
          lg:hidden
        "
      >
        <a
          href="#"
          className="my-auto ml-2 inline-block text-lg font-semibold text-white"
        >
          &lt; 戻る
        </a>
        <button>アップロード</button>
      </div>
      <div
        className="
        flex
        w-full
        grow
        items-center
        justify-center
        overflow-hidden
        "
      >
        <div
          ref={imageAreaRef}
          className="
            h-[80%]
            max-h-[80%]
            w-[80%]
            max-w-[80%]
            overflow-auto
          "
          style={
            canvasWidth > 0
              ? {
                  width: `${canvasWidth}px`,
                  height: `${canvasHeight}px`,
                }
              : {}
          }
        >
          <div className="relative">
            <Stage
              width={canvasWidth}
              height={canvasHeight}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseOut={onMouseUp}
              style={{ zIndex: 2, position: 'absolute' }}
            >
              <Layer
                className="absolute inset-0 z-10 cursor-crosshair"
                ref={drawCanvasRef}
              >
                {[...lines, { points: drawingPoints, lineWidth }].map(
                  (line, index) => (
                    <Line
                      points={line.points}
                      key={index}
                      stroke={lineColor}
                      fill={lineColor}
                      strokeWidth={line.lineWidth * 2}
                      lineCap="round"
                    />
                  )
                )}
              </Layer>
            </Stage>
            {image && (
              <img
                src={image.src}
                style={{
                  width: `${canvasWidth}px`,
                  height: `${canvasHeight}px`,
                  left: 0,
                  top: 0,
                  zIndex: 1,
                }}
                className="absolute"
                onDragStart={() => false}
              />
            )}
          </div>
        </div>
      </div>
      <div
        className="
          flex
          h-[70px]
          w-full
          items-center
          justify-between
          bg-[#333333]
        "
      >
        <div
          className="
            flex
            grow
            items-center
            justify-center
          "
        >
          <div
            className="
              relative
              flex
              shrink-0
              grow-0
              items-center
              justify-center
              gap-8
            "
          >
            <img src="/icons/circle_back.svg" />
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsLineWidthSettingShown(
                  (isLineWidthSettingShown) => !isLineWidthSettingShown
                );
              }}
            >
              <img src="/icons/circle_pen.svg" />
            </a>
            <img src="/icons/circle_plus.svg" />
            <img src="/icons/circle_minus.svg" />
            {isLineWidthSettingShown && (
              <div className={styles['pen-select']}>
                <ImageEditorPenSize
                  onClick={() => setLineWidthType('thin')}
                  selected={lineWidthType === 'thin'}
                >
                  小
                </ImageEditorPenSize>
                <ImageEditorPenSize
                  onClick={() => setLineWidthType('normal')}
                  selected={lineWidthType === 'normal'}
                >
                  中
                </ImageEditorPenSize>
                <ImageEditorPenSize
                  onClick={() => setLineWidthType('thick')}
                  selected={lineWidthType === 'thick'}
                >
                  大
                </ImageEditorPenSize>
              </div>
            )}
          </div>
        </div>
        <div className="hidden shrink-0 grow-0 lg:block">
          <button type="button">アップロード</button>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
