export const getRelativeDate = (daysOffset) => {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const getRelativeTime = (minutesOffset) => {
  const d = new Date();
  d.setMinutes(d.getMinutes() + minutesOffset);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
};

export const getRandomAmount = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed(1);
};
