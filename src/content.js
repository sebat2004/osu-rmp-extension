ratings = require('@mtucourses/rate-my-professors').default;

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

// Called with any change to DOM
var observer = new MutationObserver(function(mutations, observer) {
    const instructorDiv = document.querySelector("div.instructor-detail");
    mutations.forEach(function(mutation) {
        if (mutation.target.className !== "instructor-detail" && instructorDiv) {
            let instructorId = getInstructorId(instructorDiv.innerHTML);
            let rating = getInstructorRating(instructorId);
            instructorDiv.innerHTML = instructorDiv.innerHTML + "<br>" + rating;
            console.log("Rating change successful")
        }
    });
});

observer.observe(document, {
    subtree: true,
    attributes: true,
    childList: true
});

const getInstructorId = async (instructorName) => {
    let instructorId = await ratings.searchTeacher(instructorName);
    console.log(instructorId);
    return instructorId;
}

const getInstructorRating = async (instructorId) => {
    let rating = await ratings.getRating(instructorId);
    console.log(rating);
    return rating;
}
