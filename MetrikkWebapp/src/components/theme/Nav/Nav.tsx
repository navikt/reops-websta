import React from 'react';
import { NavLink } from 'react-router-dom';
import { Tabs } from '@navikt/ds-react';

function Nav() {
  return (
    <nav className="siteheader simple h-20 border-b border-gray-300 flex items-center">
      <div className="ml-4">
        <div className="flex items-center">
          <a href="." className="font-bold text-xl mr-4">
            Webstapad
          </a>
          <Tabs defaultValue="/">
            <Tabs.List className="flex gap-4">
              <NavLink to="/amplitude" className="tab-link">
                <Tabs.Tab value="amplitude" label="Amplitude" />
              </NavLink>
              <NavLink to="/siteimprove" className="tab-link">
                <Tabs.Tab value="siteimprove" label="Siteimprove" />
              </NavLink>
            </Tabs.List>
          </Tabs>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
