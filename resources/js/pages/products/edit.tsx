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
        title: 'Update Product',
        href: '/products',
    },
];

type ProductForm = {
    name: string;
    description: string;
    featuredimage: string;
    price: number;
};

export default function Edit({product}) {
    
    const { data, setData, put,post, processing, errors, reset } = useForm<Required<ProductForm>>({
                name: product.name,
                description: product.description,
                featuredimage: null as File | null,
                price: product.price,
                _method: 'PUT',
            });
    const submit: FormEventHandler = (e) => {
            e.preventDefault();
            console.log(data.name);
            post(route('products.update', product.id));
        };

    const HandleFIleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files);
        if(e.target.files && e.target.files.length>0){
           setData('featuredimage', e.target.files[0]); 
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Update Product" />
            <div className="flex h-full items-center flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <form className="flex flex-col gap-6 shadow-md sm:rounded-lg p-4 w-1/2" onSubmit={submit}>
                <h1 className='!text-left items-start font-extrabold'>Edit Product</h1>
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
                            tabIndex={2}
                            autoComplete="price"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            disabled={processing}
                            placeholder="price"
                        />
                        <InputError message={errors.price} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <textarea className='border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
                            id="description"
                            required
                            autoFocus
                            tabIndex={3}
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
                            autoFocus
                            tabIndex={4}
                            disabled={processing}
                             onChange={(e)=>{HandleFIleUpload(e)}}
                            
                        />
                        <InputError message={errors.featuredimage} className="mt-2" />
                        <img src={`/${product.featured_image}`} />
                    </div>
                    <Button type="submit" className="mt-2 w-fit cursor-pointer" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Update Product
                    </Button>
                </div>
                </form>
            </div>
        </AppLayout>
    );
}
