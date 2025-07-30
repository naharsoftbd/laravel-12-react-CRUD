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
        title: 'Create Permission',
        href: '/permissions',
    },
];

type PermissionForm = {
    name: string;
};

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<PermissionForm>>({
        name: '',
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('permissions.store'), {
            onFinish: () => reset('name'),
        });
    };




    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Permission" />
            <div className="flex items-center h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                
                <form className="flex flex-col w-full  sm:w-2/3 gap-6 shadow-md sm:rounded-lg p-4" onSubmit={submit}>
                <h1 className='!text-left items-start font-extrabold'>Add New Permission</h1>
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

                        <Button type="submit" className="mt-2 w-fit" tabIndex={5} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Create Permission
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
