import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { Pagination } from '@/components/ui/pagination';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Product',
        href: '/products',
    },
];


export default function Index({ products }) {
    console.log(products);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className='ml-auto'>
                    <Link href={route('products.create')} method="get" className="mt-2 w-fit bg-indigo-800 px-4 py-2 rounded-lg text-white text-md cursor-pointer" as="button">Create Product</Link>
                </div>
                
  <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">         
  <table className="min-w-full text-left text-sm whitespace-nowrap">

    <thead className="uppercase tracking-wider border-b-2 dark:border-neutral-600">
      <tr>
        <th scope="col" className="px-6 py-4">
          #
        </th>
        <th scope="col" className="px-6 py-4">
          Product
        </th>
        <th scope="col" className="px-6 py-4">
          Price
        </th>
        <th scope="col" className="px-6 py-4">
          Description
        </th>
        <th scope="col" className="px-6 py-4">
          Featured Image
        </th>
        <th scope="col" className="px-6 py-4">
          Created At
        </th>

        <th scope="col" className="px-6 py-4">
          Action
        </th>
      </tr>
    </thead>

    <tbody>
    { products.data && products.data.map( (product, index) => (
      <tr key={index} className="border-b dark:border-neutral-600">
        <td className="px-6 py-4">
          {index+1}
        </td>
        <td className="px-6 py-4">
          {product.name}
        </td>
        <td className="px-6 py-4">{product.price}</td>
        <td className="px-6 py-4">{product.description}</td>
        <td className="px-6 py-4"><img src={product.featured_image} /></td>
        <td className="px-6 py-4">{product.created_at}</td>
        <td className="px-6 py-4">
            <Link as="button" className='cursor-pointer rounded-lg bg-green-600 p-1 text-white' href={route('products.edit',product.id)}><Pencil size={20}/></Link>
            <Button  className='cursor-pointer rounded-lg bg-red-600 p-1 text-white' onClick={()=>{
                if(confirm('Are you sure want to delete this product?')){
                   router.delete(route('products.destroy', product.id),{
                    preserveScroll:true
                   }); 
                }
            }} ><Trash2 size={20}/></Button>
        </td>
      </tr>
    ))}

    </tbody>

  </table>
  </div>
  <Pagination products={products}/>

            </div>
        </AppLayout>
    );
}
