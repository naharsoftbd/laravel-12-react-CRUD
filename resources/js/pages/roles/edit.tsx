import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import { LoaderCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit role',
        href: '/roles',
    },
];

type RoleForm = {
    name: string;
    permissions: []
};

export default function Edit({ role, rolePermissions, permissions }) {
    
    const { data, setData, put, post, processing, errors, reset } = useForm<Required<RoleForm>>({
        name: role.name,
        permissions: rolePermissions || [],
        _method: 'PUT',
    });

    const handelCheckBoxChange = (permissionName, checked) => {
        if(checked){
            setData('permissions',[...data.permissions, permissionName]);
        }else{
            setData('permissions',data.permissions.filter(name => name != permissionName));
        }

    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data.name);
        post(route('roles.update', role.id));
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Role" />
            <div className="flex h-full items-center flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <form className="flex flex-col gap-6 w-1/2 shadow-md sm:rounded-lg p-4" onSubmit={submit}>
                <h1 className='!text-left items-start font-extrabold'>Edit Role</h1>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                                placeholder="Name"
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="permissions">Parmisstions</Label>
                            {permissions.map((permission) =>
                                <label key={1} className='flex items-center space-x-2'>
                                    <Input
                                        id="permissions"
                                        type="checkbox"
                                        checked={data.permissions.includes(permission)}
                                        value={permission}
                                        onChange={(e) => handelCheckBoxChange(permission, e.target.checked)}
                                        className='form-checkbox h-5 w-5 text-blue-600 focus:ring-2'
                                    />
                                    <span className='text-gray-800 capitalize'>{permission}</span>
                                </label>
                            )}
                            <InputError message={errors.permissions} className="mt-2" />
                        </div>
                        <Button type="submit" className="mt-2 w-fit cursor-pointer" tabIndex={5} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Update Role
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
