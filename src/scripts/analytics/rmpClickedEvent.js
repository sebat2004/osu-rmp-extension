import analytics from "./analytics";

const rmpClickedEvent = (request, sender, sendResponse) => {
    analytics.fireEvent("rmp_click", {
        instructor: request.instructor,
        school: request.school
    });
    sendResponse({ status: "success" });
}

export default rmpClickedEvent;