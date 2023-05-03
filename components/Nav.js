import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  DashboardSVG,
  EcommerceAdminSVG,
  OrdersSVG,
  ProductsSVG,
  SettingsSVG,
  CategoriesSVG,
  LogoutSVG,
} from "./Icons";
import { signOut } from "next-auth/react";

const navLinks = [
  { name: "Dashboard", path: "/", Component: DashboardSVG },
  { name: "Products", path: "/products", Component: ProductsSVG },
  { name: "Categories", path: "/categories", Component: CategoriesSVG },
  { name: "Orders", path: "/orders", Component: OrdersSVG },
  { name: "Settings", path: "/settings", Component: SettingsSVG },
];

const Nav = () => {
  const router = useRouter();
  const { pathname } = router;

  const inactiveLink = "flex gap-1 p-1";
  const activeLink = inactiveLink + " bg-white text-blue-900 rounded-l-lg";

  return (
    <aside className="text-white p-4 pr-0">
      <Link href={"/"} className="flex gap-1 mb-4 mr-5">
        <EcommerceAdminSVG />
        <span>Ecommerce Admin</span>
      </Link>
      <nav className="flex flex-col gap-3">
        {navLinks.map(({ name, path, Component }) => {
          return (
            <Link
              key={name}
              href={path}
              className={pathname === path ? activeLink : inactiveLink}
            >
              <Component />
              {name}
            </Link>
          );
        })}
        <button
          type="button"
          className={inactiveLink}
          onClick={() => {
            signOut();
          }}
        >
          <LogoutSVG />
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Nav;
