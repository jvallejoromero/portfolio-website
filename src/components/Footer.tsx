"use client";

import React from 'react'
import {
    CopyrightInformation,
    GeneralInformation,
    GenericFooter,
    GenericFooterLayout,
    NavigationLinks,
    ResumeCTA,
    SocialLinks
} from './FooterComponents';

const Footer = () => {
    return (
        <GenericFooter>
            <GenericFooterLayout>
                <GeneralInformation />
                <ResumeCTA />
                <SocialLinks />
                <div className="lg:hidden" aria-hidden={true}></div>
                <NavigationLinks />
            </GenericFooterLayout>

            <CopyrightInformation />
        </GenericFooter>
    );
}

export default Footer;