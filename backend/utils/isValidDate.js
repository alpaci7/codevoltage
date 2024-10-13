function isValidDate(value) {
    // Split the input value by '-' (expected format: YYYY-MM-DD)
    const dateParts = value.split('-');
    if(dateParts.length === 3){
        
        const year = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10);
        const day = parseInt(dateParts[2], 10);
        
        // Check if the year, month, and day are valid numbers
        if (isNaN(year) || isNaN(month) || isNaN(day)) {
            return false;
        }
        
        // Ensure the month is between 1 and 12
        if (month < 1 || month > 12) {
            return false;
        }
        
        // Create a Date object using the entered year, month, and day
        const date = new Date(year, month - 1, day); // Month is zero-indexed in JavaScript Date
        
        // Check if the Date object corresponds to the same year, month, and day
        if (
            date.getFullYear() === year &&
            date.getMonth() === month - 1 && // Months are zero-indexed (0 = January, 11 = December)
            date.getDate() === day
        ) {
            return true; // Valid date
        }
        return false; // Invalid date

    }else if(dateParts.length === 2){
        const year = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10);
        
        // Check if the year, month, and day are valid numbers
        if (isNaN(year) || isNaN(month)) {
            return false;
        }
        
        // Ensure the month is between 1 and 12
        if (month < 1 || month > 12) {
            return false;
        }
        
        // Create a Date object using the entered year, month, and day
        const date = new Date(year, month - 1, 1); // Month is zero-indexed in JavaScript Date
        
        // Check if the Date object corresponds to the same year, month, and day
        if (
            date.getFullYear() === year &&
            date.getMonth() === month - 1 && // Months are zero-indexed (0 = January, 11 = December)
            date.getDate() === 1
        ) {
            return true; // Valid date
        }
        return false; // Invalid date

    }else if(dateParts.length === 1){
        return true;
    }
    
}


module.exports = {
    isValidDate
}