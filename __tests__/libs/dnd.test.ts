import { moveItem } from '@/libs/dnd';

describe('moveItem', () => {
  test('下から上に移動', () => {
    const data = [1, 2, 3, 4];
    const moved = moveItem(data, 3, 2);
    expect(moved).toEqual([1, 2, 4, 3]);
  });

  test('上から下に移動', () => {
    const data = [1, 2, 3, 4];
    const moved = moveItem(data, 1, 3);
    expect(moved).toEqual([1, 3, 4, 2]);
  });
});
