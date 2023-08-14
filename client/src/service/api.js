/*axios are used for calling the api */
import axios from "axios";
import {
  API_NOTIFICATION_MESSAGES,
  SERVICE_URLS,
} from "../constants/config.js";

const API_URL = "https://localhost:8000";
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000 /*10s delay */,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return processResponse(response);
  },
  function (error) {
    return Promise.reject(processError(error));
  }
);

/*If success -> return [isSucess : true,data : object]
if fail -> return [isFailure : ture, status : string, msg : string,code :int] */
const processResponse = (response) => {
  if (response?.status == 200) {
    return { isSucess: true, data: response.data };
  } else {
    return {
      isFailure: true,
      status: response.status,
      msg: response?.msg,
      code: response?.code,
    };
  }
};

const processError = (error) => {
  if (error.response) {
    /*Request made and server responded with a status > 200*/
    console.log("Error in Response", error.toJSON());
    return {
      isError: true,
      masg: API_NOTIFICATION_MESSAGES.requestFailure,
      code: error.response.status,
    };
  } else if (error.request) {
    /*Request made but no reponse received from server */
    console.log("Error in Request", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.requestFailure,
      code: "",
    };
  } else {
    /*something happened in setting up request that triggers a error*/
    console.log("Error in Network", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.networkError,
      code: "",
    };
  }
};

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (body, showUploadProgress, showDownloadProgress) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: body,
      responseType: value.responseType,
      onUploadProgress: function (progressEvent) {
        if (showUploadProgress) {
          let percentageCompleted =
            Math.round(progressEvent.loaded * 100) / progressEvent.total;
          showUploadProgress(percentageCompleted);
        }
      },
      onDownloadProgress: function (progressEvent) {
        if (showDownloadProgress) {
          let percentageCompleted =
            Math.round(progressEvent.loaded * 100) / progressEvent.total;
          showDownloadProgress(percentageCompleted);
        }
      },
    });
}

export default { API };
