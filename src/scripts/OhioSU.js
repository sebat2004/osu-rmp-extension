import { getInstructorRating } from '../utils'

// Instructor div: li.right ng-binding ng-scope
setTimeout(() => {
    const instructors = document.querySelectorAll('li.right.ng-binding.ng-scope')
    instructors.forEach(async (instructorDiv) => {
        let instructorName = instructorDiv.lastChild.nodeValue
        await getInstructorRating(instructorName, "The Ohio State University").then((response) => {
            if (response.ratingStats) {
                instructorDiv.innerHTML = `<div style='display:flex;gap:4px;'><a target="_blank" rel="noopener noreferrer" style='display:flex;' href='https://www.ratemyprofessors.com/professor/${response.ratingStats.legacyId}'>${instructorName}</a><h7 style='padding-left:8px;color:blue;font-weight:500;'>Rating:</h7><h7>${response.ratingStats.avgRating}/5</h7></div>`
            } else {
                instructorDiv.innerHTML = `<div style="display:flex;gap:4px;"><a target="_blank" rel="noopener noreferrer" style='display:flex;' href='https://www.ratemyprofessors.com/search/professors/724?q=${instructorName}'>${instructorName}</a><h7 style='padding-left:8px;color:blue;font-weight:500;'>Rating:</h7><h7>N/A</h7></div>`
            }
        });
    });
}, 6000)
