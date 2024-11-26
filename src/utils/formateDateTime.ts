

const formatDateAndTime = (dateTime: string) => {
    const dateObject = new Date(dateTime);
    const formattedDate = dateObject.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    const formattedTime = dateObject.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true, // Ensures AM/PM format
  });
    return { formattedDate, formattedTime };
  };

  export default formatDateAndTime;