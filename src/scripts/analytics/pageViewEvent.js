import analytics from "./analytics";

const pageViewEvent = (request, sender, sendResponse) => {
    analytics.fireEvent("injection", {
        school_title: request.school_title,
    });
    sendResponse({ status: "success" });
}

export default pageViewEvent;