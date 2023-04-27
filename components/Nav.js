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
        <Link
          href={"/"}
          className={pathname === "/" ? activeLink : inactiveLink}
        >
          <DashboardSVG />
          Dashboard
        </Link>
        <Link
          href={"/products"}
          className={pathname.includes("/products") ? activeLink : inactiveLink}
        >
          <ProductsSVG />
          Products
        </Link>
        <Link
          href={"/orders"}
          className={pathname.includes("/orders") ? activeLink : inactiveLink}
        >
          <OrdersSVG />
          Orders
        </Link>
        <Link
          href={"/settings"}
          className={pathname.includes("/settings") ? activeLink : inactiveLink}
        >
          <SettingsSVG />
          Settings
        </Link>
      </nav>
    </aside>
  );
};

export default Nav;
