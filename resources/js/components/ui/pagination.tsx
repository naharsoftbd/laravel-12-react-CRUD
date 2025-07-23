import { Link } from '@inertiajs/react';

export const Pagination = ({ items }) => {
    return (
        <div className='flex item-center justify-between'>
            <p> Showing <strong>{items.from} </strong> to <strong>{items.to}</strong> from total <strong> {items.total}</strong> entries</p>
            <div className='flex gap-1'>
                {items.links.map((link, index) => (
                    <Link
                        className={`px-2 py-1 border rounded ${link.active ? 'bg-black text-white' : ''}`}
                        href={link.url || '#'}
                        key={index}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />

                ))}
            </div>


        </div>
    )
}