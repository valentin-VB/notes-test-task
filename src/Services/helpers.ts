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
