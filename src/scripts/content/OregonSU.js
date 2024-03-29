import { getInstructorRating } from "../../utils.js";

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

const getRmpLink = (instructorName, legacyId, noRatings) => {
    const rmpLink = document.createElement("a");
    rmpLink.target = "_blank";
    rmpLink.rel = "noopener noreferrer";
    rmpLink.style = "text-decoration:none;";
    rmpLink.href = `https://www.ratemyprofessors.com/professor/${legacyId}`;
    rmpLink.onclick = () => {chrome.runtime.sendMessage({action: "rmpClickedEvent", 
                            instructor: instructorName.replace("<br>", ""), 
                            school: "OregonSU"})};
    rmpLink.innerHTML = ` (Link to RMP page)`;
    return rmpLink;
}

const getRatingDiv = (avgRating) => {
    const ratingDiv = document.createElement("div");
    ratingDiv.style = "display:flex;gap:4px;";
    const ratingHeader = document.createElement("h5");
    ratingHeader.style = "color:blue;font-weight:500;";
    ratingHeader.innerHTML = "Rate My Professors Rating:";
    const rating = document.createElement("h5");
    rating.innerHTML = `${avgRating}/5`;
    ratingDiv.appendChild(ratingHeader);
    ratingDiv.appendChild(rating);
    return ratingDiv;
}

// Callback function executes with any change to DOM
var observer = new MutationObserver(function(mutations){
    const instructorDiv = document.querySelector("div.instructor-detail");
    let changedDiv = false;
    mutations.forEach(function(mutation) {
        if (instructorDiv && !changedDiv) {
            changedDiv = true;
            const instructorName = instructorDiv.innerHTML;
            getInstructorRating(instructorName, "U2Nob29sLTc0Mg==").then((response) => {
                // Prevents multiple ratings from being added
                if ((response.ratingStats && response.ratingStats.avgRating !== 0) && !instructorDiv.innerHTML.includes("</a>")) {
                    const rmpLink = getRmpLink(instructorName, response.ratingStats.legacyId, false);
                    instructorDiv.appendChild(rmpLink);

                    const ratingDiv = getRatingDiv(response.ratingStats.avgRating);
                    instructorDiv.appendChild(ratingDiv);
                    
                    chrome.runtime.sendMessage({action: "pageViewEvent",
                        instructor: instructorName.replace("<br>", ""), 
                        school: "OregonSU", noRatings: false});
                } else if ((response.ratingStats && response.ratingStats.avgRating === 0) && !instructorDiv.innerHTML.includes("</a>")) {
                    const rmpLink = getRmpLink(instructorName, response.ratingStats.legacyId, true);
                    instructorDiv.appendChild(rmpLink);

                    const ratingDiv = getRatingDiv("N/A");
                    instructorDiv.appendChild(ratingDiv);

                    chrome.runtime.sendMessage({action: "pageViewEvent",
                        instructor: instructorName.replace("<br>", ""), 
                        school: "OregonSU", noRatings: true});
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
