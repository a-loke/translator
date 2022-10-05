export const translate = async (text, from, to) => {
    const axios = require("axios");

    const options = {
        method: "GET",
        url: "https://nlp-translation.p.rapidapi.com/v1/translate",
        params: { text: text, to: to, from: from },
        headers: {
            "X-RapidAPI-Key":
                "e5ce2c2453msh06f7ac4a534b119p12eb13jsn68a4bd7a3db0",
            "X-RapidAPI-Host": "nlp-translation.p.rapidapi.com",
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
