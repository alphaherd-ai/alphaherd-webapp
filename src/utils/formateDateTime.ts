

const formatDateAndTime = (dateTime: string) => {
    const dateObject = new Date(dateTime);
    const formattedDate = dateObject.toLocaleDateString();
    const formattedTime = dateObject.toLocaleTimeString();
    return { formattedDate, formattedTime };
  };

  export default formatDateAndTime;