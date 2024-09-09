// static data for Sidebar navigation 

import { LayoutDashboard, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";

export const sidebarLinks = [
    {
        id: 1,
        name:'Dashboard',
        icon:LayoutDashboard,
        route:'/dashboard'
    },
    {
        id: 2,
        name:'Budgets',
        icon:PiggyBank,
        route:'/dashboard/budgets'
    },
    {
        id: 3,
        name:'Expenses',
        icon:ReceiptText,
        route:'/dashboard/expenses'
    },
    {
        id: 4,
        name:'Upgrade',
        icon:ShieldCheck,
        route:'/dashboard/upgrade'
    },
   ]