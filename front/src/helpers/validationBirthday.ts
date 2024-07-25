export function isBirthdayValid(birthday?: string): boolean {
    if (!birthday) return true; 
    const selectedDate = new Date(birthday);
    const currentDate = new Date();
    return selectedDate < currentDate; 
}