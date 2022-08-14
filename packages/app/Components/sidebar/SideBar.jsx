import React, { useState } from "react";
import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import About from "./About";
import Features from "./Features";
import "bootstrap-icons/font/bootstrap-icons.css";

const SideBar = (args) => {
  const [open, setOpen] = useState();
  const toggle = () => setOpen(!open);

  return (
    <div className="my-navbar d-lg-none btn-lg">
      <a className="btn btn-primary" href="#">
        <i class="bi bi-chevron-bar-up "></i>
      </a>

      <Button
        onClick={() => {
          setOpen(true);
        }}
        className="toggle bg-primary text-white btn-lg"
      >
        <i class="bi bi-list"></i>
      </Button>
      <Offcanvas direction="end" {...args} isOpen={open} toggle={toggle}>
        <OffcanvasHeader toggle={toggle}></OffcanvasHeader>
        <OffcanvasBody>
          <Features />
          <About />
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
};

SideBar.args = {
  backdrop: true,
  fade: true,
  scrollable: false,
};

export default SideBar;
