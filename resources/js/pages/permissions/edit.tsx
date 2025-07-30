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
        title: 'Edit Permission',
        href: '/roles',
    },
];

type PermissionForm = {
    name: string;
};

export default function Edit({ permission }) {
    
    const { data, setData, put, post, processing, errors, reset } = useForm<Required<PermissionForm>>({
        name: permission.name,
        _method: 'PUT',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('permissions.update', permission.id));
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Permission" />
            <div className="flex h-full items-center flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <form className="flex flex-col gap-6 w-full  sm:w-2/3 shadow-md sm:rounded-lg p-4" onSubmit={submit}>
                <h1 className='!text-left items-start font-extrabold'>Edit Permission</h1>
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
                        <Button type="submit" className="mt-2 w-fit cursor-pointer" tabIndex={5} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Update Permission
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
