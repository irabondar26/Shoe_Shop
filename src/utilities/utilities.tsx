export default function formatDate (dateString: string) {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) return dateString;

    return new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
}