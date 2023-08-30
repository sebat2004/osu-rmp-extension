import { getInstructorRating } from "../utils.js";

// Map of instructor names to their rating stats, to reduce API calls
let instructorNames = new Map()

// Finds instructor name
for (const instructorRow of document.querySelectorAll("td.instructor")) {
    let instructorDiv = instructorRow.firstElementChild
    let newDiv = document.createElement("div")
    let sibling = instructorDiv.firstChild
    while (sibling) {
        if (sibling.nodeName !== "#text") {
            sibling = sibling.nextSibling
            continue
        }

        let instructorName = sibling.nodeValue
        if (!instructorNames.has(sibling)) {
            getInstructorRating(sibling.nodeValue, "University Of Illinois at Urbana").then((response) => {
                if (response.ratingStats) {
                    instructorNames.set(sibling, response.ratingStats)
                    newDiv.innerHTML += `<div style='display:flex;gap:4px;'><a target="_blank" rel="noopener noreferrer" style='display:flex;' href='https://www.ratemyprofessors.com/professor/${response.ratingStats.legacyId}'>${instructorName}</a><h7 style='padding-left:8px;color:blue;font-weight:500;'>Rating:</h7><h7>${response.ratingStats.avgRating}/5</h7></div>`
                    instructorDiv.innerHTML = newDiv.innerHTML
                } else {
                    instructorNames.set(sibling, null)
                    newDiv.innerHTML += `<div style="display:flex;gap:4px;"><a target="_blank" rel="noopener noreferrer" style='display:flex;' href='https://www.ratemyprofessors.com/search/professors/1112?q=${instructorName}'>${instructorName}</a><h7 style='padding-left:8px;color:blue;font-weight:500;'>Rating:</h7><h7>N/A</h7></div>`
                    instructorDiv.innerHTML = newDiv.innerHTML
                }});
        } else if (instructorNames.has(sibling) && instructorNames.get(sibling) !== null) {
            instructorDiv.after(instructorNames.get(sibling).rating)
        } else {
            instructorDiv.after(" No Ratings Yet")
        };
        sibling = sibling.nextSibling
    }
}  
