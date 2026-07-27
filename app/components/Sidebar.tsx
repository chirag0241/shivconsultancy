"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "🏠",
  },
  {
    label: "Leads",
    href: "/dashboard/leads",
    icon: "👥",
  },
  {
    label: "Follow-ups",
    href: "/dashboard/follow-ups",
    icon: "📅",
  },
  {
    label: "Policies",
    href: "/dashboard/policies",
    icon: "📄",
  },
  {
    label: "Reports",
    href: "/dashboard/reports",
    icon: "📊",
  },
  {
    label: "Employees",
    href: "/dashboard/employees",
    icon: "👨‍💼",
  },
  {
    label: "WhatsApp",
    href: "/dashboard/whatsapp",
    icon: "💬",
  },
  {
    label: "Bulk Upload",
    href: "/dashboard/bulk-upload",
    icon: "📤",
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: "⚙️",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-72 shrink-0 bg-slate-950 text-white lg:flex lg:flex-col">
      <div className="border-b border-slate-800 px-6 py-7">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold shadow-lg shadow-blue-900/40">
            SC
          </div>

          <div>
            <h1 className="text-xl font-bold">
              Shiv Consultancy
            </h1>

            <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-blue-400">
              Insurance CRM
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          Main Menu
        </p>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" &&
                pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-950/30"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-lg transition ${
                    isActive
                      ? "bg-white/15"
                      : "bg-slate-900 group-hover:bg-slate-700"
                  }`}
                >
                  {item.icon}
                </span>

                <span>{item.label}</span>

                {isActive && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-white" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-800 p-4">
        <div className="rounded-xl bg-slate-900 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 font-bold">
              ✓
            </div>

            <div>
              <p className="text-sm font-semibold">
                Secure CRM
              </p>

              <p className="text-xs text-slate-400">
                System is connected
              </p>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-slate-600">
          © 2026 Shiv Consultancy
        </p>
      </div>
    </aside>
  );
}