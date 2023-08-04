MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

// Called with any change to DOM
var observer = new MutationObserver(function(mutations, observer) {
    const instructorDiv = document.querySelector("div.instructor-detail");
    let changedDiv = false;
    if (instructorDiv && !changedDiv) {
        changedDiv = true;
        const instructorName = instructorDiv.innerHTML;
        getInstructorRating(instructorName).then((response) => {
            if (response && !instructorDiv.innerHTML.includes("<br>")) {
                instructorDiv.innerHTML = instructorDiv.innerHTML + "<br>" + response.ratingStats.avgRating;
                console.log("Rating change successful")
            } else {
                console.log("Rating change unsuccessful");
            }
        });
    }
});

observer.observe(document, {
    subtree: true,
    attributes: true,
    childList: false
});

const getInstructorRating = async (instructorName) => {
    const rating = await chrome.runtime.sendMessage({
        instructorName: instructorName,
    }).then((rating) => {
        return rating;
    });
    return rating;
}
