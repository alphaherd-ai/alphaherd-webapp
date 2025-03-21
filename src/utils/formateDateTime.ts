

const formatDateAndTime = (dateTime: string) => {
  const dateObject = new Date(dateTime);


  const day = String(dateObject.getDate()).padStart(2, '0');
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const year = dateObject.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;


  const formattedTime = dateObject.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true, // Ensures AM/PM format
  });

  return { formattedDate, formattedTime };
};

export default formatDateAndTime;