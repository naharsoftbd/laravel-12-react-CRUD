import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Pencil, Search, Trash2, X } from 'lucide-react';
import { Pagination } from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { can } from '@/lib/can';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Roles',
    href: '/roles',
  },
];




export default function Index({ roles, filters, flash }) {
  console.log(roles);
  const { data, setData } = useForm({
    search: filters?.search || ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value);
    setData('search', value);
    const queryString = value ? { search: value } : {};
    router.get(route('roles.index'), queryString, {
      preserveState: true,
      preserveScroll: true,
    })

  }

  const handleReset = () => {
    setData('search', '');
    router.get(route('roles.index'), {}, {
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


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Roles" />
      <ToastContainer />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className='flex items-center justify-between'>
          <Input type='text' value={data.search} onChange={handleChange} className='h-10 w-1/3' placeholder='Search Role ...' name='search' />
          <Button onClick={handleReset} className='h-10 cursor-pointer bg-red-600 ml-2'>
            <X size={20} />
          </Button>

          <div className='ml-auto'>
            {can('Create') &&
              <Link href={route('roles.create')} method="get" className="mt-2 w-fit bg-indigo-800 px-4 py-2 rounded-lg text-white text-md cursor-pointer" as="button">Create Role</Link>
            }
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
                  Name
                </th>
                <th scope="col" className="px-6 py-4">
                  Permissions
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
              {roles.data && roles.data.map((role, index) => (
                <tr key={index} className="border-b dark:border-neutral-600">
                  <td className="px-6 py-2">
                    {role.id}
                  </td>
                  <td className="px-6 py-2">
                    {role.name}
                  </td>
                  <td className="px-6 py-2">
                    {role.permissions.map((permission) =>
                      <span className='mr-1 bg-green-100 text-green-800 text-xs font-medium'>
                        {permission.name}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-2">{role.created_at}</td>
                  <td className="px-6 py-2">
                    {can('Edit') &&
                    <Link as="button" className='cursor-pointer rounded-lg bg-green-600 p-2 text-white mt-1' href={route('roles.edit', role.id)}><Pencil size={20} /></Link>
                    }
                    {can('Delete') &&
                    <Button className='cursor-pointer rounded-lg bg-red-600 p-1 text-white ml-2' onClick={() => {
                      if (confirm('Are you sure want to delete this user?')) {
                        router.delete(route('roles.destroy', role.id), {
                          preserveScroll: true
                        });
                      }
                    }} ><Trash2 size={18} /></Button>
                  }
                  </td>
                </tr>
              ))}

            </tbody>

          </table>
        </div>
        <Pagination items={roles} />

      </div>
    </AppLayout>
  );
}
