"use client";

import React, {useState} from "react";
import {BentoGrid, BentoGridItem} from "@/components/ui/bento-grid";
import Image from "next/image";
import {Bot, Puzzle} from "lucide-react";
import DecryptedText from "@/blocks/TextAnimations/DecryptedText/DecryptedText";
import TextCursor from "@/blocks/TextAnimations/TextCursor/TextCursor";

type HeaderSkeletonProps = {
    children?: React.ReactNode;
};

const HeaderSkeleton = ({ children }: HeaderSkeletonProps) => (
    <div className="relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
        {children}
    </div>
);

const ForkedHeader = () => {
    return (
        <HeaderSkeleton>
            <Image
                src="/images/projects/forked-home.png"
                alt="Image of a place description taken from the Forked app."
                fill
                className="object-cover"
            />
        </HeaderSkeleton>
    );
}

const FragmentationHeader = () => {
    return (
        <HeaderSkeleton>
            <Image
                src="/images/projects/fragmentation-home.png"
                alt="Image of a fragmentation analysis taken from my fragmentation visualizer."
                fill
                className="object-cover"
            />
        </HeaderSkeleton>
    );
}

const AIRobotHeader = () => {
    return (
        <HeaderSkeleton>
            <Image
                src="/images/projects/ai-robot.png"
                alt="Image of the AI robot."
                fill
                className="object-cover"
            />
        </HeaderSkeleton>
    );
}

const ExploraHeader = () => {
    return (
        <HeaderSkeleton>
            <Image
                src="/images/projects/explora-home.png"
                alt="Image of the Explora homepage."
                fill
                className="object-cover"
            />
        </HeaderSkeleton>
    );
}

const items = [
    {
        title: "Forked (Mobile Application)",
        description: "Location-based discovery app that displays nearby restaurants and attractions.",
        fullDescription: "A location-based mobile app for discovering nearby restaurants and attractions, designed to make planning outings easier—whether alone or with friends. Uses Tinder style swiping mechanics to get straight into discovering new things.",
        technologies: "React Native, Expo Go, Google Places API, Firebase, TailwindCSS, TypeScript",
        status: "Active development - release expected end of 2025",
        header: <ForkedHeader />,
        icon: <Image src="/images/forked-icon-48x48.png" alt="Forked logo" width={24} height={24} />,
        previewVideo: "/images/projects/forked-demo.mp4",
    },
    {
        title: "Fragmentation Visualizer",
        description: "Interactive tool to visualize memory fragmentation in real time for analysis and debugging.",
        fullDescription: "Developed a C program to simulate and visualize memory fragmentation for an operating systems course",
        technologies: "C, Linux/Ubuntu, React, Node.js",
        status: "Completed",
        header: <FragmentationHeader />,
        icon: <Puzzle className="h-4 w-4 text-neutral-500" />,
        previewVideo: "/images/projects/fragmentation-demo.mp4",
    },
    {
        title: "AI Robot",
        description: "Semi-autonomous robot that uses computer vision to detect and classify objects, with responsive pathfinding and motion control",
        fullDescription: "Created a semi-autonomous robot that uses computer vision to detect and classify objects, includes responsive pathfinding. Trained a small AI model from scratch for use in this project.",
        technologies: "React, Next.js, Python, Kaggle, Google Colab",
        status: "Completed",
        header: <AIRobotHeader />,
        icon: <Bot className="h-4 w-4 text-neutral-500" />,
        previewVideo: "images/projects/robot-demo.mp4",
    },
    {
        title: "Explora",
        description: "Web-based dashboard for rendering real-time, interactive maps of Minecraft server worlds using dynamic world data.",
        fullDescription: "Web-based dashboard for rendering real-time, interactive maps of Minecraft server worlds. Composed of a Java (Spigot) plugin, a Node.js backend and a React frontend.",
        technologies: "Java, Spigot, Node.js, React, Vite, TypeScript, JavaScript",
        status: "Active development - preparing beta release",
        header: <ExploraHeader />,
        icon: <Image src="/images/explora-icon.png" alt="Explora logo" width={24} height={24} />,
        previewVideo: "/images/projects/explora-demo.mp4",
    },
];


const ProjectsSection = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section id="projects" className="relative flex flex-col items-start justify-start ml-10 mr-10 mt-15">
            <div className="flex flex-col lg:flex-row w-full">

                {/* Projects Grid */}
                <div className="flex flex-col content-start justify-start items-start gap-2 w-full">
                    <h1>Projects</h1>
                    <p>
                        Explore my latest work.
                    </p>
                    <BentoGrid className="mt-5 self-start">
                        {items.map((item, i) => (
                            <BentoGridItem
                                key={i}
                                title={item.title}
                                description={item.description}
                                header={item.header}
                                icon={item.icon}
                                className={i === 3 || i === 6 ? "md:col-span-3" : ""}
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={() => console.log("Clicked", item.title)} //TODO: redirect to more detailed pages
                            />
                        ))}
                    </BentoGrid>
                </div>

                {/* Projects Preview */}
                <div className="w-full hidden xl:flex">
                    <div className="flex flex-1 min-h-[calc(100%)] justify-center items-center">
                        {hoveredIndex !== null ? (
                            <div className="flex flex-1 flex-col h-full justify-end items-center p-10 gap-5">
                                {items[hoveredIndex].previewVideo && (
                                    <video
                                        key={items[hoveredIndex].previewVideo}
                                        className="h-auto max-h-80 rounded-xl shadow-2xl dark:shadow-none mb-2"
                                        src={items[hoveredIndex].previewVideo}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    />
                                )}

                                <div className="flex flex-col gap-0.5 rounded-2xl bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900/70 dark:to-neutral-800/60 p-6 backdrop-blur-sm shadow-xl dark:shadow-lg border border-neutral-200/50 dark:border-white/10 max-w-2xl">
                                    <DecryptedText
                                        text={`${hoveredIndex + 1}. ${items[hoveredIndex].title}`}
                                        animateOn="view"
                                        revealDirection="center"
                                        speed={100}
                                        className="text-lg font-semibold"
                                        encryptedClassName="font-mono text-xs"
                                    />
                                    <DecryptedText
                                        text={items[hoveredIndex].fullDescription}
                                        animateOn="view"
                                        revealDirection="center"
                                        speed={100}
                                        className="text-sm text-black dark:text-neutral-300"
                                        encryptedClassName="font-mono text-xs"
                                    />
                                    <p className="text-xs text-black dark:text-neutral-500">Technologies: {items[hoveredIndex].technologies}</p>
                                    <p className="text-xs text-black dark:text-neutral-500">Status: {items[hoveredIndex].status}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="relative flex items-center justify-center w-full h-full">
                                <TextCursor
                                    text="👆"
                                    delay={0.01}
                                    spacing={60}
                                    followMouseDirection={true}
                                    randomFloat={true}
                                    exitDuration={0.3}
                                    removalInterval={20}
                                    maxPoints={10}
                                />
                                <div className="absolute text-neutral-800 dark:text-neutral-400 italic animate-bounce">Hover a project to preview details</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProjectsSection;