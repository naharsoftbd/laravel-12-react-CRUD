import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { NavItemWithSubmenu, type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, ShoppingBasket, Users, Notebook } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItemWithSubmenu [] = [
    {
        title: 'Dashboard',
        icon: LayoutGrid,
        href: '/dashboard',
    },
    {
        title: 'Product',
        icon: ShoppingBasket,
        submenu:[
            {
                title: 'Products',
                href: '/products',
                icon: LayoutGrid, 
            },
            {
                title: 'Create Product',
                href: '/products/create',
                icon: LayoutGrid, 
            },
        ]
            
    },
    {
        title: 'Users',
        href: '/users',
        icon: Users,
    },
    {
        title: 'Roles',
        href: '/roles',
        icon: Notebook,
    },
];

const footerNavItems: NavItem[] = [
    
    
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
