import React from "react";
import { Button, Navbar, Sidebar, Card } from "flowbite-react";
import { Outlet, Link } from "react-router-dom";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";

const AdminLayout = () => {
  return (
    <>
      <header>
        <Navbar fluid rounded>
          <Navbar.Brand href="https://flowbite-react.com">
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Pagina de Admin
            </span>
          </Navbar.Brand>
          <Navbar.Collapse>
            <Navbar.Link href="#" active>
              Home
            </Navbar.Link>
            <Navbar.Link href="#">About</Navbar.Link>
            <Navbar.Link href="#">Services</Navbar.Link>
            <Navbar.Link href="#">Pricing</Navbar.Link>
            <Navbar.Link href="#">Contact</Navbar.Link>
          </Navbar.Collapse>
          <div className="flex md:order-2">
            <Button>Get started</Button>
            <Navbar.Toggle />
          </div>
        </Navbar>
      </header>
      <div className="flex">
        <aside>
          <Sidebar aria-label="Default sidebar example">
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item href="#" icon={HiChartPie}>
                  Dashboard
                </Sidebar.Item>
                <Sidebar.Item
                  href="#"
                  icon={HiViewBoards}
                  label="Pro"
                  labelColor="dark"
                >
                  Kanban
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiInbox} label="5">
                  Inbox
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiUser}>
                  Users
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiShoppingBag}>
                  Products
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiArrowSmRight}>
                  Sign In
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiTable}>
                  Sign Up
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </aside>
        <main className="w-full">
          <section className="px-4 pt-2 pb-8">
            <Outlet />
          </section>
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
