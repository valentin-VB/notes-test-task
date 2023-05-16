export const getFirstKeyValue = (obj: { [key: string]: string }) => {
  const value = Object.values(obj);
  return value[0];
};

export const getFormattedDate = (defaultDate: string) => {
  const date: Date = new Date(defaultDate);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};
