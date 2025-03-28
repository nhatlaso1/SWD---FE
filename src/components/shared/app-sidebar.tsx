'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from '@/components/ui/sidebar';
import { navItems } from '@/constants/data';
import {
  ChevronRight,
  ChevronsUpDown,
  GalleryVerticalEnd,
  LogOut
} from 'lucide-react';
import { usePathname } from '@/routes/hooks';
import { useAuth } from '@/routes/hooks/use.auth';
import { Icons } from '../ui/icons';
// import { useGetInfoUser } from '@/queries/auth.query';
// import { setInfoUser } from '@/redux/auth.slice';
// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
import __helpers from '@/helpers';
import { useEffect, useState } from 'react';

export const company = {
  name: 'Inventory',
  logo: GalleryVerticalEnd,
  plan: 'contact@inventory'
};

export default function AppSidebar() {
  const { data: session } = useAuth();
  const pathname = usePathname();
  // const { data: dataInfoUser } = useGetInfoUser();
  // const dispatch = useDispatch();
  const [infoUser, setInfoUser] = useState<any>(null);

  useEffect(() => {
    const token = __helpers.cookie_get('AT');
    if (!token) {
      window.location.href = '/login';
    } else {
      const info = __helpers.decodeToken(token);
      console.log(info);
      setInfoUser(info);
    }
  }, []);
  const handleLogout = () => {
    __helpers.cookie_delete('AT');
    __helpers.localStorage_delete('role');
    window.location.href = '/login';
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex gap-2 py-2 text-sidebar-accent-foreground">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <company.logo className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{company.name}</span>
            <span className="truncate text-xs">{company.plan}</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup>
          {navItems.map((parent, index) => (
            <div key={index}>
              <SidebarGroupLabel>{parent.label}</SidebarGroupLabel>
              <SidebarMenu>
                {parent?.detail.map((item) => {
                  const Icon = item.icon ? Icons[item.icon] : Icons.dashboard;
                  return item?.items && item?.items?.length > 0 ? (
                    <Collapsible
                      key={item.title}
                      asChild
                      defaultOpen={item.isActive}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={item.title}
                            isActive={pathname === item.url}
                          >
                            {item.icon && <Icon />}

                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname === subItem.url}
                                >
                                  <a href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        isActive={pathname === item.url}
                      >
                        <a href={item.url}>
                          <Icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </div>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={
                        session?.user?.image ||
                        'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
                      }
                      alt={session?.user?.name || ''}
                    />
                    <AvatarFallback className="rounded-lg">
                      {session?.user?.name?.slice(0, 2)?.toUpperCase() || 'CN'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {infoUser?.username || 'user'}
                    </span>
                    <span className="truncate text-xs">
                      {`${infoUser?.username}@inventory.com` ||
                        'user@inventory.com'}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                {/* <DropdownMenuGroup>
                  <DropdownMenuItem className="gap-2">
                    <BadgeCheck size={17} />
                    Tài khoản của tôi
                  </DropdownMenuItem>
                </DropdownMenuGroup> */}
                {/* <DropdownMenuSeparator /> */}
                <DropdownMenuItem
                  onClick={() => handleLogout()}
                  className="gap-2"
                >
                  <LogOut size={17} />
                  Thoát
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
