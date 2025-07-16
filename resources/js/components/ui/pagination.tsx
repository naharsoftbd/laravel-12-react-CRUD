import { Link } from '@inertiajs/react';

export const Pagination = ({ products }) => {
    return (
        <div className='flex item-center justify-between'>
            <p> Showing <strong>{products.from}</strong> to <strong>{products.to}</strong> from total<strong>{products.total}</strong> entries</p>
            <div className='flex gap-2'>
                {products.links.map((link, index) => (
                    <Link
                        className={`px-3 py-2 border rounded ${link.active ? 'bg-black text-white' : ''}`}
                        href={link.url || '#'}
                        key={index}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />

                ))}
            </div>


        </div>
    )
}