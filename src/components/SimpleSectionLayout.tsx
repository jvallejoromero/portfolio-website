import React from 'react'

type SimpleSectionLayoutProps = {
    sectionId: string,
    children?: React.ReactNode,
    className?: string,
    divClassName?: string,
}

const SimpleSectionLayout = ({ sectionId, children, className = "", divClassName="" }: SimpleSectionLayoutProps) => {
    return (
        <section id={sectionId} className={`relative flex flex-col items-start justify-start ml-10 mr-10 mt-15 ${className}`}>
            <div className={`flex flex-col lg:flex-row w-full ${divClassName}`}>
                {children}
            </div>
        </section>
    );
}

export default SimpleSectionLayout;