import { getInstructorRating } from "../utils.js";

// Map of instructor names to their rating stats, to reduce API calls
let instructorNames = new Map()

// Finds instructor name
for (const instructorRow of document.querySelectorAll("td.instructor")) {
    instructorDiv = instructorRow.firstElementChild

    let sibling = instructorDiv.firstChild
    while (sibling) {
        if (sibling.nodeName !== "#text") {
            sibling = sibling.nextSibling
            continue
        }
        if (!instructorNames.has(sibling)) {
            let newDiv = instructorDiv;
            getInstructorRating(sibling.nodeValue, "University Of Illinois at Urbana").then((response) => {
                if (response.ratingStats) {
                    instructorNames.set(sibling, response.ratingStats)
                    newDiv.after(` ${response.ratingStats.avgRating}/5`)
                } else {
                    instructorNames.set(sibling, null)
                    newDiv.after(" No Ratings Yet")
                }});
        } else if (instructorNames.has(sibling) && instructorNames.get(sibling) !== null) {
            instructorDiv.after(instructorNames.get(sibling).rating)
        } else {
            instructorDiv.after(" No Ratings Yet")
        };
        sibling = sibling.nextSibling
    }
}  
