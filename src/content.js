MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

// Callback function executes with any change to DOM
var observer = new MutationObserver(function() {
    const instructorDiv = document.querySelector("div.instructor-detail");
    let changedDiv = false;
    if (instructorDiv && !changedDiv) {
        changedDiv = true;
        const instructorName = instructorDiv.innerHTML;
        getInstructorRating(instructorName).then((response) => {
            // Prevents multiple ratings from being added
            if (response.ratingStats && !instructorDiv.innerHTML.includes("<br>")) {
                instructorDiv.innerHTML = `${instructorName} <a target="_blank" rel="noopener noreferrer" style='text-decoration:none;' href='https://www.ratemyprofessors.com/professor/${response.ratingStats.legacyId}'>(Link to RMP page)</a>` + `<div style='display:flex;gap:3px;'><h4 style='color:blue;font-weight:500;'>Rate My Professors Rating: </h4><h4>${response.ratingStats.avgRating}/5</h4></div>`;
            } else if (!instructorDiv.innerHTML.includes("<br>")) {
                instructorDiv.innerHTML = `${instructorName} <a target="_blank" rel="noopener noreferrer" style='text-decoration:none;' href='https://www.ratemyprofessors.com/search/professors/742?q=${instructorName}'>(Link to RMP search results)</a>` + "<div style='display:flex;gap:4px;'><h4 style='color:blue;font-weight:500;'>Rate My Professor Rating: </h4><h4>No Ratings Yet</h4></div>";
            }
        });
    }
});

// Start observing DOM
observer.observe(document, {
    subtree: true,
    attributes: true
});

// Communicates with background.js to get instructor rating from Rate My Professors
const getInstructorRating = async (instructorName) => {
    const rating = await chrome.runtime.sendMessage({
        instructorName: instructorName,
    }).then((rating) => {
        return rating;
    });
    return rating;
}
