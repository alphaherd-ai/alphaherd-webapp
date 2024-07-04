// utils/calculateNextOccurrence.ts
export const calculateNextOccurrence = (startDate: string | number | Date, repeatType: string): Date => {
    const currentDate = new Date();
    let nextDate = new Date(startDate);
  
    switch (repeatType) {
      case 'everyDay':
        nextDate.setDate(nextDate.getDate() + 1);
        break;
      case 'everyWeek':
        nextDate.setDate(nextDate.getDate() + 7);
        break;
      case 'everyMonth':
        nextDate.setMonth(nextDate.getMonth() + 1);
        break;
      case 'everyYear':
        nextDate.setFullYear(nextDate.getFullYear() + 1);
        break;
      default:
        throw new Error('Invalid repeat type');
    }
  
    while (nextDate <= currentDate) {
      switch (repeatType) {
        case 'everyDay':
          nextDate.setDate(nextDate.getDate() + 1);
          break;
        case 'everyMonth':
          nextDate.setMonth(nextDate.getMonth() + 1);
          break;
        case 'everyYear':
          nextDate.setFullYear(nextDate.getFullYear() + 1);
          break;
      }
    }
  
    return nextDate;
  };
  