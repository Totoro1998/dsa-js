export const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0,
};
export const defaultCompareFn = (a, b) => {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a > b ? Compare.BIGGER_THAN : Compare.LESS_THAN;
};
