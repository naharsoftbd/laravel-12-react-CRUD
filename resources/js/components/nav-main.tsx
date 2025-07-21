import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from '@/components/ui/sidebar';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { type NavItem, NavItemWithSubmenu } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItemWithSubmenu[] }) {
    const page = usePage();
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                
                    {items.map((item) => (
                        <Collapsible defaultOpen={page.url.startsWith(item.href) ? true:false} className="group/collapsible">
                        <SidebarMenuItem key={item.title}>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton asChild isActive={page.url.startsWith(item.href)} tooltip={{ children: item.title }}>
                                    {item.href ? (
                                     <Link href={item.href} prefetch>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                    ):(
                                        <div className='cursor-pointer'>
                                          {item.icon && <item.icon />}
                                          <span>{item.title}</span>  
                                        </div>
                                    )}
                                    
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                            { item.submenu && (
                                <SidebarMenuSub>
                                    {item.submenu.map((subitem) => 
                                    <SidebarMenuSubItem key={subitem.title}>
                                        <SidebarMenuSubButton asChild isActive={page.url.startsWith(subitem.href)}>
                                        <Link href={subitem.href} prefetch>
                                        {subitem.icon && <subitem.icon />}
                                        <span>{subitem.title}</span>
                                    </Link>
                                    </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                    )}
                                </SidebarMenuSub>
                                )}
                            </CollapsibleContent>
                            
                        </SidebarMenuItem>
                        </Collapsible>
                    ))}
                
            </SidebarMenu>
        </SidebarGroup>
    );
}
