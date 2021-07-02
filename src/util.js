export const sortData = (data, type) => {
  const sortedData = [...data];

  sortedData.sort((a, b) => {
    if (a[type] > b[type]) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};
