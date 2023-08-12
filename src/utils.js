// Communicates with background.js to get instructor rating from Rate My Professors
export const getInstructorRating = async (instructorName, schoolName) => {
    const rating = await chrome.runtime.sendMessage({
        instructorName: instructorName,
        schoolName: schoolName
    }).then((rating) => {
        return rating;
    });
    return rating;
}