"use client";

import React from 'react'
import SimpleSectionLayout from "@/components/SimpleSectionLayout";
import MockInstagramPost from "@/components/MockInstagramPost";
import ContactForm from "@/components/ContactForm";

const mockUsers = [
    "cool_person",
    "user123",
    "vibes_only",
    "pixel_stack",
    "cloud_jumper",
    "no_chill_99",
    "soft_focus",
    "zero_context",
    "chillwavez",
    "zoom_zoom",
    "plainbagel",
    "not_a_bot",
    "sleepyfox_",
    "404_found",
    "justscrollin",
    "driftwood88",
    "cheesebored",
    "quietpixels",
    "clean_lines",
];

const mockComments = [
    "🔥🔥🔥 this is insane!",
    "How did you even build this?? So clean 😍",
    "Literally perfection 👏",
    "You’re on another level with this UI",
    "Teach me your ways 😭",
    "This needs to go viral fr",
    "Bro cooked with this one 🧑‍🍳",
    "I love the attention to detail here ✨",
    "Instagram dev team taking notes 📓",
    "This is why you’re the GOAT 🐐",
    "That micro-interaction on the heart icon is *chef's kiss*.",
    "Love the responsiveness. Everything just feels right.",
    "Subtle transitions and color choices are 💯",
    "Impressive — definitely bookmarking this for reference.",
    "Sleek, modern, and highly polished. Well done!",
    "Clean code meets clean design 👌",
    "The kind of portfolio that makes recruiters pause."
];

const ContactSection = () => {
    return (
        <SimpleSectionLayout sectionId={"contact"} divClassName="gap-10 lg:gap-0">
            <div className="flex flex-1 flex-col gap-2">
                <h1>Contact</h1>
                <p>Let&#39;s Work Together</p>
                <p className="italic text-muted-foreground text-sm sm:text-base mb-4">
                    Reach out for collaborations, freelance opportunities, or just to say hi!
                </p>
                <MockInstagramPost
                    profileImageSrc={"/images/headshot.png"}
                    mainImageSrc={"/images/mock-post-image.png"}
                    username={"jvallejoromero"}
                    location={"California, USA"}
                    caption={"#React #Nextjs #TypeScript"}
                    mockUsers={mockUsers}
                    mockComments={mockComments}
                    className={"shadow-md shadow-neutral-300/10"}
                />
            </div>
            <div className="flex flex-1 items-center justify-center">
                <ContactForm />
            </div>
        </SimpleSectionLayout>
    );
}

export default ContactSection;