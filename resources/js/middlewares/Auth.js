import { get } from "../helpers";

export default function auth({ next, router }) {
    if (!get('access_token')) {
        return router.push({path: '/login'});
    }

    return next();
}
