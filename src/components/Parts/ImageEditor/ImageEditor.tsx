import React from 'react';
import { useImageEditor } from './useImageEditor';
import styles from './ImageEditor.module.scss';
import { ImageEditorPenSize } from './ImageEditorPenSize';
import { Layer, Line, Image, Stage } from 'react-konva';
import { ImageEditorToolButton } from './ImageEditorToolButton';

const lineColor = '#F5847D';

export type ImageEditorProps = {
  file: File;
  onSubmit: (file: File) => void;
  onClose: () => void;
};

const ImageEditor: React.FC<ImageEditorProps> = (props: ImageEditorProps) => {
  const {
    allScaledLines,
    canvasWidth,
    canvasHeight,
    changeScale,
    image,
    imageAreaRef,
    isLineWidthSettingShown,
    lines,
    lineWidthType,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onSubmit,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    setIsLineWidthSettingShown,
    setLineWidthType,
    scale,
    stageRef,
    undo,
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
          onClick={(e) => {
            e.preventDefault();
            props.onClose();
          }}
        >
          &lt; 戻る
        </a>
        <button onClick={onSubmit}>アップロード</button>
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
              ref={stageRef}
              width={canvasWidth}
              height={canvasHeight}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseOut={onMouseUp}
              onTouchEnd={onTouchEnd}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              style={{ zIndex: 2, position: 'absolute' }}
            >
              <Layer className="absolute inset-0 z-10 cursor-crosshair">
                {image && (
                  <Image
                    image={image}
                    x={0}
                    y={0}
                    width={canvasWidth}
                    height={canvasHeight}
                  />
                )}
                {allScaledLines.map((line, index) => (
                  <Line
                    points={line.points}
                    key={index}
                    stroke={lineColor}
                    fill={lineColor}
                    strokeWidth={line.lineWidth * 2}
                    lineCap="round"
                    lineJoin="round"
                  />
                ))}
              </Layer>
            </Stage>
          </div>
        </div>
        <div className="ml-5 hidden h-[80%] max-h-[80%] lg:block">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              props.onClose();
            }}
          >
            <img src="/icons/close.svg" className="h-10 w-10" />
          </a>
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
            <ImageEditorToolButton
              src="/icons/circle_back.svg"
              isDisabled={lines.length === 0}
              onClick={undo}
            />
            <ImageEditorToolButton
              src="/icons/circle_pen.svg"
              onClick={() =>
                setIsLineWidthSettingShown(
                  (isLineWidthSettingShown) => !isLineWidthSettingShown
                )
              }
            />
            <ImageEditorToolButton
              src="/icons/circle_plus.svg"
              onClick={() => changeScale(scale * 1.2)}
            />
            <ImageEditorToolButton
              src="/icons/circle_minus.svg"
              onClick={() => changeScale(scale / 1.2)}
            />
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
          <button type="button" onClick={onSubmit}>
            アップロード
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
