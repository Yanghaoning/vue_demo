import {post} from "../utils/http";

export function getList(data) {
    return post(
        '/api/call',
        {
            fn:'lists',
            module: 'Player',
            data
    })
}