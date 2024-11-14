export const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: '2-digit',
    };
    const formattedDate = new Date(date).toLocaleDateString('en-GB', options); 
    return formattedDate;
};