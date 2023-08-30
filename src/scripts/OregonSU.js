import { getInstructorRating } from "../utils.js";

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

// Callback function executes with any change to DOM
var observer = new MutationObserver(function(mutations){
    const instructorDiv = document.querySelector("div.instructor-detail");
    let changedDiv = false;
    mutations.forEach(function(mutation) {
        if (instructorDiv && !changedDiv) {
            changedDiv = true;
            const instructorName = instructorDiv.innerHTML;
            getInstructorRating(instructorName, "Oregon State University").then((response) => {
                // Prevents multiple ratings from being added
                if (response.ratingStats && !instructorDiv.innerHTML.includes("</a>")) {
                    instructorDiv.innerHTML = `${instructorName} <a target="_blank" rel="noopener noreferrer" style='text-decoration:none;' href='https://www.ratemyprofessors.com/professor/${response.ratingStats.legacyId}'>(Link to RMP page)</a>` + `<div style='display:flex;gap:3px;'><h5 style='color:blue;font-weight:500;'>Rate My Professors Rating: </h5><h5>${response.ratingStats.avgRating}/5</h5></div>`;
                } else if (!instructorDiv.innerHTML.includes("</a>")) {
                    instructorDiv.innerHTML = `${instructorName} <a target="_blank" rel="noopener noreferrer" style='text-decoration:none;' href='https://www.ratemyprofessors.com/search/professors/742?q=${instructorName}'>(Link to RMP search results)</a>` + "<div style='display:flex;gap:4px;'><h5 style='color:blue;font-weight:500;'>Rate My Professor Rating: </h5><h5>No Ratings Yet</h5></div>";
                }
            });
        }
    });
});

// Start observing DOM
observer.observe(document, {
    subtree: true,
    attributes: true
});