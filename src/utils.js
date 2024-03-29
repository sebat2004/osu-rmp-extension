// Communicates with background.js to get instructor rating from Rate My Professors
export const getInstructorRating = async (instructorName, schoolId) => {
    const rating = await chrome.runtime.sendMessage({
        action: "getRating",
        instructorName: instructorName,
        schoolId: schoolId
    }).then((rating) => {
        return rating;
    });
    return rating;
}

// Trims middle name from full name
export const trimMiddleName = (fullName) => {
    const nameArray = fullName.split(" ");
    if (nameArray.length >= 3) {
        return `${nameArray[0]} ${nameArray[2]}`;
    } else {
        return fullName;
    }
}

// Removes the 2nd space and onward from a name
export const keepFirstTwoWords = (fullName) => {
    const nameArray = fullName.split(" ");
    if (nameArray.length >= 3) {
        return `${nameArray[0]} ${nameArray[1]}`;
    } else {
        return fullName;
    }
}
