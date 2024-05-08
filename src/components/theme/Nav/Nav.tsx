import React from 'react';
import { NavLink } from 'react-router-dom';
import { Tabs } from '@navikt/ds-react';

function Nav() {
  return (
    <nav className="flex py-1 z-10 items-center md:w-5/6 max-w-[80rem] my-3 mx-auto justify-between">
      <div className="flex items-stretch">
          <a href="." className="font-bold text-2xl mr-4">
            Websta
          </a>
        {/*  <Tabs defaultValue="/" >
            <Tabs.List className="flex gap-4">
              <NavLink
                to="/amplitude"
                className="tab-link"
              >
                <Tabs.Tab value="amplitude" label="Amplitude" />
              </NavLink>
              <NavLink
                to="/siteimprove"
                className="tab-link"
              >
                <Tabs.Tab value="siteimprove" label="Siteimprove" />
              </NavLink>
            </Tabs.List>
          </Tabs>*/}
      </div>
    </nav>
  );
}

export default Nav;
