//api notification messages
export const API_NOTIFICATION_MESSAGES = {
  loading: {
    title: "Loading...",
    message: "Data is being loaded, Please wait",
  },
  success: {
    title: "success",
    message: "Data sucessfully loaded",
  },
  responseFailure: {
    title: "Error",
    message: "An error occured while fetching from server",
  },
  requestFailure: {
    tilte: "Error",
    message: "An error occured while parsing request data",
  },
  networkError: {
    title: "Error",
    message:
      "Unable to connect with the server.Please check interent connectivity and try again later",
  },
};

//Api Service call
export const SERVICE_URLS = {
  userSignup: { url: "/sigup", method: "POST" },
};
