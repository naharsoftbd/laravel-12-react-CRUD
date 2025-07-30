import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { NavItemWithSubmenu, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, ShoppingBasket, Users, Notebook,
    UserRound,
    TrendingUp,
    HandHelping,
    TrendingUpDown,
    Printer,
    ListTodo,
    ShieldCheck
 } from 'lucide-react';
import AppLogo from './app-logo';
import { can } from '@/lib/can';

const mainNavItems: NavItemWithSubmenu [] = [
    {
        title: 'Dashboard',
        icon: LayoutGrid,
        href: '/dashboard',
    },
    {
        title: 'Customers',
        icon: UserRound,
        href: '/customers',
        
    },
    {
        title: 'Sales',
        icon: TrendingUp,
        submenu:[
            {
                title: 'Proposals',
                href: '/proposals',
                icon: HandHelping, 
            },
            {
                title: 'Estimates',
                href: '/estimates',
                icon: TrendingUpDown, 
            },
            {
                title: 'Invoices',
                href: '/invoices',
                icon: Printer, 
            },
            {
                title: 'Items',
                href: '/items',
                icon: ListTodo, 
            },
        ]
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
        permission: 'users.menu'
    },
    {
        title: 'Roles',
        href: '/roles',
        icon: Notebook,
        permission: 'roles.menu'
    },
    {
        title: 'Permissions',
        href: '/permissions',
        icon: ShieldCheck,
        permission: 'permissions.menu'
    },
];

const footerNavItems: NavItem[] = [
    
    
];

export function AppSidebar() {
    const { props } = usePage();
    const auth = props.auth || {};
    const permissions = auth.permissions;
    const filterdNavItems = mainNavItems.filter((item)=> !item.permission || permissions.includes(item.permission))

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
                <NavMain items={filterdNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
