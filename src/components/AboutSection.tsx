import React from "react";
import CountUp from "@/blocks/TextAnimations/CountUp/CountUp";
import RotatingText from "@/blocks/TextAnimations/RotatingText/RotatingText";

const StatCard = ({label, value}: {label: string, value: number}) => {
    return (
        <div className="flex-1 max-h-[120px] min-w-[100px] p-3 sm:p-4 rounded-lg border-gray-50 border-1 dark:border-none bg-white shadow-lg hover:shadow-xl dark:bg-neutral-900 dark:shadow-white dark:shadow dark:hover:shadow-md transition text-center">
            <CountUp from={0} to={value} suffix="+" duration={2} className="text-3xl font-bold count-up-text" />
            <div className="mt-1">{label}</div>
        </div>
    );
}

const TimelineItem = ({index, date, title}: {index: number, date: string, title: string}) => {
    return (
        <li key={index} className="mb-8 ml-6">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold">
                {index + 1}
            </span>
            <time className="text-sm font-medium text-gray-500">{date}</time>
            <h4 className="text-lg font-semibold">{title}</h4>
        </li>
    );
}

const AboutSection = () => {
    return (
        <section id="about" className="relative flex flex-col items-start justify-start m-10">
            <div className="flex flex-col lg:flex-row w-full gap-12 lg:gap-0">

                {/* About Me */}
                <div className="flex flex-1 flex-col gap-2">
                    {/* Introduction */}
                    <h1>About Me</h1>
                    <p>
                        I’m a recent Computer Science graduate with strong Java-based OOP fundamentals and hands-on experience building performant, scalable React applications.
                    </p>
                    <p>
                        I thrive on adopting new technologies and frameworks—driven by rapid learning demonstrated through international study in France and self-led projects.
                    </p>

                    {/* Stats */}
                    <div className="flex flex-1 py-10 justify-center lg:justify-start">
                        <div className="flex flex-wrap gap-4 mt-6">
                            {[
                                { label: 'Projects', value: 10 },
                                { label: 'Years Coding', value: 10 },
                                { label: 'Languages Spoken', value: 4 },
                            ].map(({ label, value }, index) => (
                                <StatCard key={index} label={label} value={value} />
                            ))}
                        </div>
                    </div>

                    {/* Animated Text */}
                    <div className="mt-5 flex flex-wrap items-center text-base xs:text-2xl md:text-3xl w-full font-semibold justify-center lg:justify-start">
                        <div className="relative flex h-8 xs:h-10 gap-3">
                            <span>I love</span>
                            <RotatingText
                                texts={["innovating", "programming", "learning", "exploring", "experimenting", "travelling", "collaborating"]}
                                mainClassName="px-2 sm:px-2 md:px-3 bg-blue-600 overflow-hidden justify-center rounded-lg text-white"
                                staggerFrom={"last"}
                                staggerDuration={0.025}
                                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                rotationInterval={2000}
                            />
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="flex flex-1 justify-center">
                    <ul className="relative border-l border-gray-300 pl-4 sm:pl-6">
                        {[
                            { date: '2015', title: 'Started learning Java' },
                            { date: '2019', title: 'Started pursing a B.S. in Computer Science' },
                            { date: '2023–24', title: 'Studied abroad in France' },
                            { date: '2025', title: 'Graduated @ CSU Stanislaus' },
                            { date: '2025', title: 'Launched portfolio' },
                        ].map(({ date, title }, i) => (
                            <TimelineItem key={i} index={i} date={date} title={title} />
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;