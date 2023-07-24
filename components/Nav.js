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

const Nav = ({ show }) => {
  const router = useRouter();
  const { pathname } = router;

  const inactiveLink = "flex gap-1 p-1";
  const activeLink = inactiveLink + " bg-heghlight text-primary rounded-sm";

  const inactiveIcon = "w-6 h-6";
  const activeIcon = inactiveIcon + " text-primary";

  return (
    <aside
      className={
        (show ? "left-0" : "-left-full") +
        " top-0 text-gray-500 p-4 fixed w-full bg-bgGray h-full md:static md:w-auto transition-all"
      }
    >
      <Link href={"/"} className="flex gap-1 mb-4 mr-5">
        <EcommerceAdminSVG styles={""} />
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
              <Component
                styles={pathname === path ? activeIcon : inactiveIcon}
              />
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
