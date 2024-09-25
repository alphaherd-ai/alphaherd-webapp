

const formatDateAndTime = (dateTime: string) => {
    const dateObject = new Date(dateTime);
    const formattedDate = dateObject.toLocaleDateString();
    const formattedTime = dateObject.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true, // Ensures AM/PM format
  });
    return { formattedDate, formattedTime };
  };

  export default formatDateAndTime;