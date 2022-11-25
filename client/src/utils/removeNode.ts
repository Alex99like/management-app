export const removeNode = (
  arr: {
    id: string;
    title: string;
    order: number[];
  }[],
  id: number,
  newColumn: {
    order: number[];
    id: string;
    title: string;
  }
) => {
  arr.forEach((it, index) => {
    if (Number(it.id) === id) {
      arr.splice(index, 1, newColumn);
    }
  });
  return arr;
};
