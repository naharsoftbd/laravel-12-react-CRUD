
import { usePage } from '@inertiajs/react';


export function can(permission: string): boolean{
    let page = usePage();
        //const auth = page.props.auth;
    const {auth} = page.props as {
        auth: {
            permissions: string[]
        };
    };

    return auth.permissions.includes(permission);
}