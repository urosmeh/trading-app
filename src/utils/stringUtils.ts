export const formatNumber = (val: string | number) => {
  let v = val;

  if (typeof v === 'string') {
    v = Number(val);
  }

  if (v === 0) return v.toFixed();

  if (v < 1) {
    return v.toFixed(4);
  }

  if (v < 100) {
    return v.toFixed(2);
  }

  if (v < 10000) {
    return v.toFixed(1);
  }

  if (v < 150000) {
    return v.toFixed();
  }

  return v.toString();
};
