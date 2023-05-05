const { default: axios } = require("axios");

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default fetcher;
