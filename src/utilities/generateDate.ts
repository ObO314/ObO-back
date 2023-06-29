export const generateDate = (date?: Date) => {
  if (!date) {
    date = new Date();
  }
  let year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};
