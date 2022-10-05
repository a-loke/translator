import { API_KEY, URL, API_HOST } from "@variable";

export const translate = async (text, from, to) => {
    const axios = require("axios");
    const options = {
        method: "GET",
        url: `${URL}`,
        params: { text: text, to: to, from: from },
        headers: {
            "X-RapidAPI-Key": `${API_KEY}`,
            "X-RapidAPI-Host": `${API_HOST}`,
        },
    };

    const response = await axios.request(options).catch(function (error) {
        console.error(error);
    });

    if (response.status !== 200) {
        throw new Error(
            "Translation call Failed with status code: " + response.status
        );
    }

    return response.data;
};
