const { default: axios } = require("axios");

const fetcher = (url) => axios.get(url).then((res) => res.data);

const sendPOSTRequest = async (url, data) => {
  try {
    const result = await axios.post(url, data);
    return result.data;
  } catch (error) {
    console.log(error.message);
  }
};

const sendPUTRequest = async (url, { arg }) => {
  try {
    const result = await axios.put(url, arg);
    return result.data;
  } catch (error) {
    console.log(error.message);
  }
};

export { fetcher, sendPOSTRequest, sendPUTRequest };
