import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  DashboardSVG,
  EcommerceAdminSVG,
  OrdersSVG,
  ProductsSVG,
  SettingsSVG,
} from "./Icons";

const navLinks = [
  { name: "Dashboard", path: "/", component: DashboardSVG },
  { name: "Products", path: "/products", component: ProductsSVG },
  { name: "Orders", path: "/orders", component: OrdersSVG },
  { name: "Settings", path: "/settings", component: SettingsSVG },
];

const Nav = () => {
  const router = useRouter();
  const { pathname } = router;

  const inactiveLink = "flex gap-1  p-1";
  const activeLink = inactiveLink + " bg-white text-blue-900 rounded-l-lg";

  return (
    <aside className="text-white p-4 pr-0">
      <Link href={"/"} className="flex gap-1 mb-4 mr-5">
        <EcommerceAdminSVG />
        <span>Ecommerce Admin</span>
      </Link>
      <nav className="flex flex-col gap-3">
        {navLinks.map(({ name, path, component }) => {
          return (
            <Link
              href={path}
              className={pathname === path ? activeLink : inactiveLink}
            >
              {component}
              {name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Nav;
