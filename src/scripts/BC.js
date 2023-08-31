import { getInstructorRating, keepFirstTwoWords } from "../utils";

const instructors = document.querySelectorAll("span.instructors")

instructors.forEach(async (instructorTag) => {
    // Regex for removing extra spaces
    let instructorName = instructorTag.textContent.replace(/\s+/g, ' ').trim()

    // First and last name are always in the first 2 words
    // Trims unnecessary text after the first 2 words
    instructorName = keepFirstTwoWords(instructorName)
    console.log(instructorName)
    await getInstructorRating(instructorName, "U2Nob29sLTEyMg==").then((response) => {
        if (response.ratingStats && response.ratingStats.avgRating !== 0) {
            instructorTag.innerHTML = `<div style='display:flex;gap:4px;'><a target="_blank" rel="noopener noreferrer" style='display:flex;' href='https://www.ratemyprofessors.com/professor/${response.ratingStats.legacyId}'>${instructorName}</a><h7 style='padding-left:8px;color:blue;font-weight:500;'>Rating:</h7><h7>${response.ratingStats.avgRating}/5</h7></div>`
        } else {
            instructorTag.innerHTML = `<div style="display:flex;gap:4px;"><a target="_blank" rel="noopener noreferrer" style='display:flex;' href='https://www.ratemyprofessors.com/search/professors/122?q=${instructorName}'>${instructorName}</a><h7 style='padding-left:8px;color:blue;font-weight:500;'>Rating:</h7><h7>N/A</h7></div>`
        }
    });
});
