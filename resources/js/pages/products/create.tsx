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
import { useState } from "react";


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Product',
        href: '/products',
    },
];

type ProductForm = {
    name: string;
    description: string;
    featuredimage: string;
    price: string;
};

export default function Create() {
    const [serviceList, setServiceList] = useState([{ service: "" }]);
    const { data, setData, post, processing, errors, reset } = useForm<Required<ProductForm>>({
        name: '',
        description: '',
        featuredimage: null as File | null,
        price: '',
        services: serviceList.map(field => field.service)
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('products.store'));
    };

    const HandleFIleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setData('featuredimage', e.target.files[0]);
        }
    }


    const handleServiceChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...serviceList];
        list[index][name] = value;
        setServiceList(list);
        setData('services', serviceList.map(field => field.service));
    };

    const handleServiceRemove = (index) => {
        const list = [...serviceList];
        list.splice(index, 1);
        setServiceList(list);
    };

    const handleServiceAdd = () => {
        setServiceList([...serviceList, { service: "" }]);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Product" />
            <div className="flex h-full items-center flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <form className="flex flex-col gap-6 shadow-md sm:rounded-lg p-4 w-full sm:w-2/3" onSubmit={submit}>
                    <h1 className='!text-left items-start font-extrabold'>Add New Product</h1>
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
                            <Label htmlFor="price">Price</Label>
                            <Input
                                id="price"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="price"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                disabled={processing}
                                placeholder="Price"
                            />
                            <InputError message={errors.price} className="mt-2" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <textarea className='border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
                                id="description"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                disabled={processing}
                                placeholder="Description"
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="featuredimage">Featured Image</Label>
                            <Input
                                id="featuredimage"
                                type="file"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="featuredimage"
                                disabled={processing}
                                onChange={HandleFIleUpload}

                            />
                            <InputError message={errors.featuredimage} className="mt-2" />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="service">Service(s)</label>
                            {serviceList.map((singleService, index) => (
                                <div key={index} className="flex justify-start items-start gap-x-4">
                                    <div className="first-division w-full">
                                        <Input
                                            name="service"
                                            type="text"
                                            id="service"
                                            value={singleService.service}
                                            onChange={(e) => handleServiceChange(e, index)}
                                            required
                                        />
                                        {serviceList.length - 1 === index && serviceList.length < 4 && (
                                            <Button
                                                type="button"
                                                onClick={handleServiceAdd}
                                                className="mt-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                            >
                                                <span>Add a Service</span>
                                            </Button>
                                        )}
                                        <InputError message={errors.services} className="mt-2" />
                                    </div>
                                    <div className="second-division">
                                        {serviceList.length !== 1 && (
                                            <Button 
                                                type="button"
                                                onClick={() => handleServiceRemove(index)}
                                                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                            >
                                                <span>Remove</span>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button type="submit" className="mt-2 w-fit" tabIndex={5} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Create Product
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
