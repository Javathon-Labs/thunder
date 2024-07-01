import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

export const NavbarCustom = () => {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <p className="font-bold text-2xl text-inherit">Safekeeper</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
