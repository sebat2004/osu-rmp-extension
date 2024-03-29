import { getInstructorRating } from "../../utils";

const professors = document.querySelectorAll("tr.first-row td:nth-child(3)")

professors.forEach(async (professor) => {
    console.log(professor)
    const professorName = professor.textContent.trim()
    await getInstructorRating(professorName, "U2Nob29sLTEyNA==").then((response) => {
        console.log(response)
        if (response.ratingStats && response.ratingStats.avgRating !== 0) {
            professor.innerHTML = `<div style='display:flex;gap:4px;'><a target="_blank" rel="noopener noreferrer" style='display:flex;' href='https://www.ratemyprofessors.com/professor/${response.ratingStats.legacyId}'>${professorName}</a><h7 style='padding-left:8px;color:blue;font-weight:500;'>Rating:</h7><h7>${response.ratingStats.avgRating}/5</h7></div>`
        } else {
            professor.innerHTML = `<div style="display:flex;gap:4px;"><a target="_blank" rel="noopener noreferrer" style='display:flex;' href='https://www.ratemyprofessors.com/search/professors/124?q=${professorName}'>${professorName}</a><h7 style='padding-left:8px;color:blue;font-weight:500;'>Rating:</h7><h7>N/A</h7></div>`
        }
    });
});