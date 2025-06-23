import GradientBackground from '@/components/GradientBackground';
import GenericButton from '@/components/GenericButton';
import Link from 'next/link'
import {
    CopyrightInformation,
    GeneralInformation,
    GenericFooter, GenericFooterLayout,
    ResumeCTA,
    SocialLinks
} from "@/components/FooterComponents";
import React from "react";

export default function NotFound() {
    return (
        <div>
            <GradientBackground>
                <div className="flex flex-col justify-center items-center z-10">
                    <h1 className="text-5xl font-bold mb-3">404</h1>
                    <p className="text-xs xs:text-base md:text-lg text-muted-foreground mb-6">
                        We can’t find the page you’re looking for.
                    </p>
                    <Link
                        href="/"
                        className="flex items-center"
                    >
                        <GenericButton
                            label="Back to home"
                            className="px-6 py-2"
                        />
                    </Link>
                </div>
            </GradientBackground>

            <GenericFooter>
                <GenericFooterLayout>
                    <GeneralInformation />
                    <div className="hidden lg:flex" aria-hidden={true} ></div>
                    <ResumeCTA />
                    <SocialLinks />
                </GenericFooterLayout>

                <CopyrightInformation />
            </GenericFooter>
        </div>
    );
}
