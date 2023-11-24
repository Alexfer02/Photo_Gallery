"use strict";

import { BASE_URL, requestOptions } from './common.js';

const commentswithusersAPI = {

    getByPhotoId: async function(photoId) {
        let response = await axios.get(
            `${BASE_URL}/commentswithusers?photoId=${photoId}`,
            requestOptions
        );
        return response.data;
    },
};

export { commentswithusersAPI };