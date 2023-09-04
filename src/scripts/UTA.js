import { getInstructorRating, keepFirstTwoWords } from "../utils.js";

const professors = document.querySelectorAll("td")

professors.forEach(async (professor) => {
    if (professor.getAttribute('data-th') == "Instructor") {
        const professorDiv = professor
        const professorName = keepFirstTwoWords(professorDiv.querySelector("span").textContent)
        await getInstructorRating(professorName, "U2Nob29sLTEyNTU=").then((response) => {
            if (response.ratingStats && response.ratingStats.avgRating !== 0) {
                professor.innerHTML = `<div style=''><a target="_blank" rel="noopener noreferrer" style='display:flex;' href='https://www.ratemyprofessors.com/professor/${response.ratingStats.legacyId}'>${professorName}</a><h7 style='padding-left:8px;color:blue;font-weight:500;'>Rating:</h7><h7>${response.ratingStats.avgRating}/5</h7></div>`
            } else {
                professor.innerHTML = `<div style=""><a target="_blank" rel="noopener noreferrer" style='display:flex;' href='https://www.ratemyprofessors.com/search/professors/1255?q=${professorName}'>${professorName}</a><h7 style='padding-left:8px;color:blue;font-weight:500;'>Rating:</h7><h7>N/A</h7></div>`
            }
        });
    }
});