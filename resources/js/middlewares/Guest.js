import { get } from "../helpers";

export default function guest({ next, router }) {
    if (get('access_token')) {
        return router.push({path: '/'});
    }

    return next();
}
