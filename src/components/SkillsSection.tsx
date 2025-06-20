"use client";

import SimpleSectionLayout from "@/components/SimpleSectionLayout";
import { Variants, motion } from "framer-motion";

const frontendSkills = [
    "React", "React Native", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS",
    "HTML", "CSS", "Vite"
];

const backendSkills = [
    "Node.js", "Express", "Java", "REST APIs", "SQLite", "Firebase", "Google APIs",
];

const generalSkills = [
    "Version Control (Git)", "Object Oriented Programming", "Agile workflow", "Remote Development (SSH)",
    "Data Structures", "Algorithms", "Terminal & CLI Proficiency", "Self-motivated", "Quick learner",
    "Strong Communication"
];

const languageSkills = ["English", "Spanish", "Italian", "French"];

const toolsSkills = [
    "VS Code", "WebStorm", "PyCharm", "Eclipse", "SSH", "CLI (Bash)", "GitHub", "Vercel", "Raspberry Pi"
];

const learningSkills = [
    "Optimizing Performance", "DevOps", "AWS", "Database Optimization", "AI Training", "Embedded Systems"
];

const fadeInVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut",
        },
    },
};

type SkillGroupProps = {
    title: string,
    skills: string[],
}

const SkillGroup = ({ title, skills }: SkillGroupProps) => (
    <motion.div
        className="pt-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInVariants}
    >
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        <div className="flex flex-wrap gap-2 min-w-0">
            {skills.map((skill, index) => (
                <SkillItem key={index} skill={skill} />
            ))}
        </div>
    </motion.div>
);

const SkillItem = ({ skill }: {skill: string}) => {
    return (
        <span className="px-2 sm:px-3 rounded-full text-xs xs:text-sm font-medium
            bg-neutral-200 text-neutral-500 dark:text-neutral-200
            dark:bg-gradient-to-br dark:from-zinc-900 dark:to-neutral-800
            border border-white/10 shadow-inner shadow-white/5
            backdrop-blur-sm transition-transform hover:scale-105">
            {skill}
        </span>
    );
}

const SkillsSection = () => {
    return (
        <SimpleSectionLayout sectionId="skills">
            <div className="flex flex-col gap-2 w-full">
                <h1>Skills</h1>
                <p>Always learning, always building.</p>
                <p className="italic text-muted-foreground text-sm sm:text-base mb-4">
                    A curated list of tools I work with daily — and the ones I’m currently diving into.
                </p>

                <SkillGroup title="💻 On the frontend" skills={frontendSkills} />
                <SkillGroup title="🛠️ On the backend" skills={backendSkills} />
                <SkillGroup title="🧠 In general" skills={generalSkills} />
                <SkillGroup title="🧰 Tools and Services" skills={toolsSkills} />
                <SkillGroup title="🌍 Languages" skills={languageSkills} />
                <SkillGroup title="🚧 Currently Exploring" skills={learningSkills} />
            </div>
        </SimpleSectionLayout>
    );
}

export default SkillsSection;