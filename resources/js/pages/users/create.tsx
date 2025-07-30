import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import { LoaderCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create User',
        href: '/user/create',
    },
];

type UserForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Create({ roles }) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<UserForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        roles: ''
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('users.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const handelCheckBoxChange = (rolenName, checked) => {
        if(checked){
            setData('roles',[...data.roles, rolenName]);
        }else{
            setData('roles',data.roles.filter(name => name != rolenName));
        }

    }



    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create User" />
            <div className="flex h-full items-center flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <form className="flex flex-col gap-6 shadow-md sm:rounded-lg p-4 w-full sm:w-2/3" onSubmit={submit}>
                    <h1 className='!text-left items-start font-extrabold'>Add New User</h1>
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
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                                placeholder="email"
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                                placeholder="password"
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">Confirm password</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                required
                                tabIndex={4}
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                disabled={processing}
                                placeholder="Confirm password"
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="roles">Roles</Label>
                            {roles.map((role) =>
                                <label key={1} className='flex items-center space-x-2'>
                                    <Input
                                        id="permissions"
                                        type="checkbox"
                                        value={role}
                                        onChange={(e) => handelCheckBoxChange(role, e.target.checked)}
                                        className='form-checkbox h-5 w-5 text-blue-600 focus:ring-2'
                                    />
                                    <span className='text-gray-800 capitalize'>{role}</span>
                                </label>
                            )}
                            <InputError message={errors.roles} className="mt-2" />
                        </div>


                        <Button type="submit" className="mt-2 w-fit" tabIndex={5} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Create User
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
