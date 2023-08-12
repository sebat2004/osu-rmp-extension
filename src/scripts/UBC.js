import { getInstructorRating } from "../utils.js";

let instructorDiv;
let instructorName;

// Finds instructor name
for (const a of document.querySelectorAll("a")) {
    if (a.getAttribute("href") && a.getAttribute("href").includes("ubcid")) {
        instructorDiv = a.parentElement;
        instructorName = a.parentElement.textContent;
    }
}

getInstructorRating(instructorName, "University of British Columbia").then((response) => {
    if (response.ratingStats && !instructorDiv.innerHTML.includes("RMP")) {
        instructorDiv.innerHTML += `<a target="_blank" rel="noopener noreferrer" style='padding-left:5px;text-decoration:none;' href='https://www.ratemyprofessors.com/professor/${response.ratingStats.legacyId}'>(Link to RMP page)</a>` + `<div style='display:flex;gap:3px;'><h5 style='color:blue;font-weight:500;'>RMP Rating: </h5><h5>${response.ratingStats.avgRating}/5</h5></div>`;
    } else if (!instructorDiv.innerHTML.includes("RMP")) {
        instructorDiv.innerHTML += `<a target="_blank" rel="noopener noreferrer" style='padding-left:5px;text-decoration:none;' href='https://www.ratemyprofessors.com/search/professors/1413?q=${instructorName}'>(Link to RMP search results)</a>` + "<div style='display:flex;gap:4px;'><h5 style='color:blue;font-weight:500;'>RMP Rating: </h5><h5>No Ratings Yet</h5></div>";
    }
});