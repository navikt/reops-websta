import {
  MenuHamburgerIcon,
  PlusIcon
} from "@navikt/aksel-icons";
import { Button, Dropdown, Link } from "@navikt/ds-react";
import { useEffect, useState } from "react";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  
  const linkButton =
    "flex no-underline items-center bg-transparent hover:underline hover:bg-transparent navds-button  navds-button--medium  text-white hover:text-white";
  return (
    <header className="flex py-1 z-10 items-center  max-w-[80rem] m-auto justify-between">
      <div className="flex items-stretch logo">
        <Link className={linkButton} href="/">
          <span className="text-2xl whitespace-nowrap">
            Innblikk
          </span>
        </Link>
      </div>
    {/*  {isMobile ? (
        <Dropdown>
          <Button as={Dropdown.Toggle} className={linkButton}>
            <MenuHamburgerIcon title="meny" fontSize="1.5rem" />
          </Button>
          <Dropdown.Menu className="w-auto">
            <Dropdown.Menu.List>
              <Dropdown.Menu.List.Item
                as={Link}
                href="https://forms.office.com/r/UyFMJsLfKM?lang=nb-NO"
                className="no-underline"
              >
                <PlusIcon aria-hidden fontSize="1.5rem" />
                <span className="whitespace-nowrap">Legg til ny snarvei</span>
              </Dropdown.Menu.List.Item>
            </Dropdown.Menu.List>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center w-full"></div>
          <div className="flex flex-grow logo">
            <Link
              href="https://forms.office.com/r/UyFMJsLfKM?lang=nb-NO"
              className={linkButton}
            >
              <PlusIcon aria-hidden fontSize="1.5rem" />
              <span className="whitespace-nowrap">Legg til ny snarvei</span>
            </Link>
          </div>
        </div>
      )}*/}
    </header>
  );
}
