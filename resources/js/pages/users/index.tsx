import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Pencil, Search, Trash2, X } from 'lucide-react';
import { Pagination } from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Users',
    href: '/users',
  },
];




export default function Index({ users, filters }) {
  console.log(users);
  const { data, setData } = useForm({
    search: filters?.search || ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value);
    setData('search', value);
    const queryString = value ? { search: value } : {};
    router.get(route('users.index'), queryString, {
      preserveState: true,
      preserveScroll: true,
    })

  }

  const handleReset = () => {
    setData('search', '');
    router.get(route('users.index'), {}, {
      preserveState: true,
      preserveScroll: true,
    })
  }


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Users" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className='flex items-center justify-between'>
          <Input type='text' value={data.search} onChange={handleChange} className='h-10 w-1/2' placeholder='Search user ...' name='search' />
          <Button onClick={handleReset} className='h-10 cursor-pointer bg-red-600 ml-2'>
            <X size={20} />
          </Button>

          <div className='ml-auto'>
            <Link href={route('users.create')} method="get" className="mt-2 w-fit bg-indigo-800 px-4 py-2 rounded-lg text-white text-md cursor-pointer" as="button">Create User</Link>
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
                  Email
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
              {users.data && users.data.map((user, index) => (
                <tr key={index} className="border-b dark:border-neutral-600">
                  <td className="px-6 py-4">
                    {index+1}
                  </td>
                  <td className="px-6 py-4">
                    {user.name}
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.created_at}</td>
                  <td className="px-6 py-4">
                    <Link as="button" className='cursor-pointer rounded-lg bg-green-600 p-2 text-white mt-1' href={route('users.edit', user.id)}><Pencil size={20} /></Link>
                    <Button className='cursor-pointer rounded-lg bg-red-600 p-1 text-white ml-2' onClick={() => {
                      if (confirm('Are you sure want to delete this user?')) {
                        router.delete(route('users.destroy', user.id), {
                          preserveScroll: true
                        });
                      }
                    }} ><Trash2 size={18} /></Button>
                  </td>
                </tr>
              ))}

            </tbody>

          </table>
        </div>
        <Pagination items={users} />

      </div>
    </AppLayout>
  );
}
