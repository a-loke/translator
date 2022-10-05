export const translate = async (text, from, to) => {
    const axios = require("axios");

    const options = {
        method: "GET",
        url: "https://nlp-translation.p.rapidapi.com/v1/translate",
        params: { text: text, to: to, from: from },
        headers: {
            "X-RapidAPI-Key":
                "7fb15711b0mshdcf75f9ebce235ep112814jsne23cb9110ba4",
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
