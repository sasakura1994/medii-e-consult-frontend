import { act, renderHook } from '@testing-library/react';
import { useImageEditor } from './useImageEditor';
import { ImageEditorProps } from './ImageEditor';
import { KonvaEventObject } from 'konva/lib/Node';

const props: ImageEditorProps = {
  file: new File([], 'test.png'),
  onSubmit: (_) => {
    return;
  },
  onClose: () => {
    return;
  },
};

const createMouseEvent = (
  type: 'mousedown' | 'mousemove' | 'mouseup',
  offsetX: number,
  offsetY: number
) =>
  ({
    target: {
      getPosition: () => ({ x: 0, y: 0 }),
    },
    evt: {
      type,
      offsetX,
      offsetY,
    },
  } as KonvaEventObject<MouseEvent>);

describe('useImageEditor', () => {
  test('lineWidths are right', () => {
    const { result } = renderHook(() => useImageEditor(props));

    act(() => result.current.onMouseDown(createMouseEvent('mousedown', 0, 0)));
    act(() =>
      result.current.onMouseMove(createMouseEvent('mousemove', 10, 20))
    );
    act(() => result.current.setLineWidthType('thin'));
    expect(result.current.allScaledLines[0].lineWidth).toBe(25);

    act(() => result.current.setLineWidthType('normal'));
    expect(result.current.allScaledLines[0].lineWidth).toBe(50);

    act(() => result.current.setLineWidthType('thick'));
    expect(result.current.allScaledLines[0].lineWidth).toBe(90);
  });

  test('Add line by instruction', () => {
    const { result } = renderHook(() => useImageEditor(props));

    act(() => result.current.onMouseDown(createMouseEvent('mousedown', 0, 0)));
    act(() =>
      result.current.onMouseMove(createMouseEvent('mousemove', 10, 20))
    );
    act(() => result.current.onMouseUp(createMouseEvent('mouseup', 20, 40)));
    expect(result.current.lines.length).toBe(1);
  });

  test('undo', () => {
    const { result } = renderHook(() => useImageEditor(props));

    act(() => result.current.onMouseDown(createMouseEvent('mousedown', 0, 0)));
    act(() =>
      result.current.onMouseMove(createMouseEvent('mousemove', 10, 20))
    );
    act(() => result.current.onMouseUp(createMouseEvent('mouseup', 20, 40)));
    act(() => result.current.undo());
    expect(result.current.lines.length).toBe(0);
  });
});
