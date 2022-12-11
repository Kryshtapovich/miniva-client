export const getEngines = () => {
  return Array.from({ length: 84 }, (_, i) => {
    const value = i * 100 + 700;
    return { label: value.toString(), value };
  });
};
