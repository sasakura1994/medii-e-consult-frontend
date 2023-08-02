export const moveItem = <T>(items: T[], dragIndex: number, hoverIndex: number): T[] => {
  const copy = [...items];
  const dragging = copy.splice(dragIndex, 1);
  return [...copy.slice(0, hoverIndex), dragging[0], ...copy.slice(hoverIndex)];
};
