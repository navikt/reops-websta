import React from 'react';
import { NavLink } from 'react-router-dom';
import { Tabs } from '@navikt/ds-react';

function Nav() {
  return (
    <nav
      className="siteheader simple"
      style={{ height: '80px', borderBottom: '1px solid #ccc' }}
    >
      <div className="stickyPlaceholder__QO79_">
        <div className="stickyContainer__EulYb ">
          <div className="simpleHeader__Z9PQc">
            <div className="content__EtlfN">
              <a
                href="."
                style={{ fontWeight: '800', fontSize: '1.7rem' }}
                className="felgen-logo navLogoLenke__JU8Z4 navLogoLenke lenkeMedSporing__hcOG_"
              >
                Demo Websta
              </a>
              <Tabs defaultValue="/" fill>
                <Tabs.List>
                  <Tabs.Tab
                    as={NavLink}
                    to="/amplitude"
                    value="amplitude"
                    label="Amplitude"
                  />
                  <Tabs.Tab
                    as={NavLink}
                    to="/siteimprove"
                    value="siteimprove"
                    label="Siteimprove"
                  />
                </Tabs.List>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
