import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Pencil, Search, Trash2, X } from 'lucide-react';
import { Pagination } from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { ConfirmDialog } from '@/components/ConfirmDialog';


const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Product',
    href: '/products',
  },
];




export default function Index({ products, filters, flash }) {
  console.log(products);
  const [showConfirm, setShowConfirm] = useState(false);
  const [productid, setProductId] = useState(false);

  const { data, setData } = useForm({
    search: filters?.search || ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value);
    setData('search', value);
    const queryString = value ? { search: value } : {};
    router.get(route('products.index'), queryString, {
      preserveState: true,
      preserveScroll: true,
    })

  }

  const handleReset = () => {
    setData('search', '');
    router.get(route('products.index'), {}, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  useEffect(() => {
    if (flash.message.success) {
      toast.success(flash.message.success);
    }
    if (flash.message.error) {
      toast.error(flash.message.error);
    }
  }, [flash]);


  const handleConfirm = () => {
    router.delete(route('products.destroy', productid), {
      preserveScroll: true
    });
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Product" />
      <ToastContainer />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className='flex items-center justify-between'>
          <Input type='text' value={data.search} onChange={handleChange} className='h-10 w-1/3' placeholder='Search Product ...' name='search' />
          <Button onClick={handleReset} className='h-10 cursor-pointer bg-red-600 ml-2'>
            <X size={20} />
          </Button>

          <div className='ml-auto'>
            <Link href={route('products.create')} method="get" className="mt-2 w-fit bg-indigo-800 px-4 py-2 rounded-lg text-white text-md cursor-pointer" as="button">Create Product</Link>
          </div>


        </div>


        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                  Services
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
              {products.data && products.data.map((product, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4">
                    {product.id}
                  </td>
                  <td className="px-6 py-2">
                    {product.name}
                  </td>
                  <td className="px-6 py-2">{product.price}</td>
                  <td className="px-6 py-2">{product.description}</td>
                  <td className="px-6 py-2">{product.services.map((service) => service.name).join(', ')}</td>
                  <td className="px-6 py-2"><img src={product.featured_image} /></td>
                  <td className="px-6 py-2">{product.created_at}</td>
                  <td className="px-6 py-2">
                    <Link as="button" className='cursor-pointer rounded-lg bg-green-600 hover:bg-green-800 p-2 text-white' href={route('products.edit', product.id)}><Pencil size={20} /></Link>
                    <Button className='cursor-pointer rounded-lg bg-red-600 hover:bg-red-800 p-1 text-white ml-2' onClick={() => {
                      setShowConfirm(true);setProductId(product.id);
                    }} ><Trash2 size={20} /></Button>
                  </td>
                </tr>
              ))}

            </tbody>

          </table>
        </div>
        <Pagination items={products} />
        <ConfirmDialog
          message="Are you sure you want to delete this product?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          isOpen={showConfirm}
          onClose={() => setShowConfirm(false)}
        />
      </div>
    </AppLayout>
  );
}
