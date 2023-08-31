// Communicates with background.js to get instructor rating from Rate My Professors
export const getInstructorRating = async (instructorName, schoolName, schoolId) => {
    const rating = await chrome.runtime.sendMessage({
        instructorName: instructorName,
        schoolName: schoolName,
        schoolId: schoolId
    }).then((rating) => {
        return rating;
    });
    return rating;
}

// Trims middle name from full name
export const trimMiddleName = (fullName) => {
    const nameArray = fullName.split(" ");
    if (nameArray.length === 3) {
        return `${nameArray[0]} ${nameArray[2]}`;
    } else {
        return fullName;
    }
}