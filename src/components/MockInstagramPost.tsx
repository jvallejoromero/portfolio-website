"use client";

import {MoreHorizontal, Heart, MessageCircle, Send, Bookmark, LucideIcon} from "lucide-react";
import Image from "next/image";
import React, {JSX, useEffect, useRef, useState, useTransition} from "react";
import { motion } from "framer-motion";
import { useClickOutside } from "@/hooks/MouseClickHook";

type MockInstagramPostProps = {
    profileImageSrc: string,
    mainImageSrc: string,
    username: string,
    location: string,
    caption: string,
    className?: string,
    mockUsers?: string[],
    mockComments?: string[],
}

const createHashtags = (input: string): (string | JSX.Element)[] => {
    const searchUrl = `https://www.google.com/search?q=`;
    return input.split(" ").map((word, index) => {
        const startsWithHashtag = word.startsWith("#");

        if (startsWithHashtag) {
            return (
                <a
                    key={index}
                    href={`${searchUrl}${word.slice(1)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8593fe] cursor-pointer"
                >
                    {word + " "}
                </a>
            );
        }
        return word + " ";
    });
}

const MockInstagramPost = ({ profileImageSrc, mainImageSrc, username="username", location="somewhere", caption, className="", mockUsers=["user123"], mockComments=["This is amazing!"]}: MockInstagramPostProps) => {
    const [isSaved, setIsSaved] = useState<boolean>(false);

    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [likes, setLikes] = useState<number>(0);

    const [isTypingComment, setIsTypingComment] = useState<boolean>(false);
    const [isCommented, setIsCommented] = useState<boolean>(false);
    const [commentCount, setCommentCount] = useState<number>(0);
    const [displayedComment, setDisplayedComment] = useState<string>("");
    const [, startTransition] = useTransition();

    const [mockUser, setMockUser] = useState<string>("");

    const [isAnimatingHeart, setIsAnimatingHeart] = useState<boolean>(false);
    const [tapCoords, setTapCoords] = useState<{ x: number; y: number } | null>(null);

    const mainImageRef = useRef<HTMLDivElement>(null);
    const animationTimeoutRef = useRef<NodeJS.Timeout>(null);

    const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState<boolean>(false);
    const optionsMenuButtonRef = useRef<HTMLDivElement>(null);
    const optionsMenuRef = useRef<HTMLDivElement>(null);

    useClickOutside([optionsMenuButtonRef, optionsMenuRef], () => setIsOptionsMenuOpen(false));

    type AnimatedIconProps = {
        onClick?: () => void;
        icon: LucideIcon;
        color?: string;
        fill?: string;
        className?: string;
    };

    const AnimatedIcon = ({ onClick, icon: Icon, color, fill, className = "" }: AnimatedIconProps) => {
        const [animate, setAnimate] = useState(false);

        const handleClick = () => {
            setAnimate(true);
            onClick?.();
        };

        useEffect(() => {
            if (animate) {
                const timeout = setTimeout(() => setAnimate(false), 300);
                return () => clearTimeout(timeout);
            }
        }, [animate]);

        const MotionIcon = motion.create(Icon);

        return (
            <MotionIcon
                onClick={handleClick}
                className={`w-5 h-5 cursor-pointer hover:scale-120 transition-transform focus:outline-none ${className}`}
                color={color}
                fill={fill}
                animate={animate ? { scale: [1, 1.5, 1] } : {}}
                transition={{ duration: 0.3, ease: "easeOut" }}
            />
        );
    };

    const BigHeart = ({ x, y }: { x: number; y: number }) => {
        const MotionHeart = motion.create(Heart);
        const diagonalOffset = (Math.random() - 0.5) * 80;

        return (
            <div
                className="absolute pointer-events-none z-50"
                style={{
                    left: x,
                    top: y,
                    transform: "translate(-50%, -50%)",
                    willChange: "transform, opacity",
                    WebkitBackfaceVisibility: "hidden",
                }}
            >
                {/* Floating Heart */}
                <MotionHeart
                    style={{ y: "0%" }}
                    initial={{ scale: 0.5, opacity: 1, x: 0, y: 0, rotate: 0 }} // start slightly smaller
                    animate={{
                        scale: [1.3, 1], // pop larger then settle at normal
                        rotate: [0, -5, 5, -3, 3, 0], // subtle wobble
                        x: [0, diagonalOffset], // more obvious diagonal shift
                        y: [0, -180], // faster, more aggressive upward motion
                        opacity: [1, 0], // fade out
                    }}
                    transition={{
                        scale: { duration: 0.4, ease: "easeInOut" }, // grow/pop matches wobble duration
                        rotate: { duration: 0.4, ease: "easeInOut" },   // wobble
                        x: { duration: 0.2, delay: 0.4, ease: "easeIn" },  // diagonal move
                        y: { duration: 0.2, delay: 0.4, ease: "easeIn" },   // upward move
                        opacity: { duration: 0.2, delay: 0.4, ease: "easeIn" },   // fade aligned
                    }}
                    fill="url(#heartGradient)"
                    stroke="none"
                    className="w-24 h-24"
                />
                {/* Gradient Definition */}
                <svg className="absolute w-0 h-0">
                    <defs>
                        <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f43f5e" />
                            <stop offset="50%" stopColor="#ec4899" />
                            <stop offset="100%" stopColor="#e879f9" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        );
    }

    const OptionsMenu = () => {
        const menuOptions = ["Message", "More Info"];
        return (
            <motion.div
                ref={optionsMenuRef}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className=" absolute mt-2 right-0 top-0 w-40
                            bg-white/50 dark:bg-black/20
                            backdrop-blur-lg
                            border border-gray-500/20 dark:border-black/30
                            rounded-2xl
                            shadow-lg shadow-black/20
                            overflow-hidden
                            z-10"
            >
                <ul className="divide-y divide-white/10 py-1">
                    {menuOptions.map((option, index) => (
                        <OptionsMenuButton key={index} title={option} />
                    ))}
                </ul>
            </motion.div>
        );
    }

    const OptionsMenuButton = ({ title }: { title: string }) => {
        return (
            <li className="px-2 py-2 text-sm font-medium text-gray-800 dark:text-gray-100
                        hover:bg-gray-100/20 dark:hover:bg-gray-800/30 cursor-pointer">
                {title}
            </li>
        );
    }

    const handleShareClick = async() => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Check out Jonathan's Portfolio",
                    text: "Jonathan's Portfolio",
                    url: window.location.href,
                });
            } catch {}
        } else {
            alert("Sharing is not supported on this browser!");
        }
    }

    const handleSaveClick = () => {
        setIsSaved(!isSaved);
    }

    const handleCommentClick = () => {
        if (isTypingComment) {
            return;
        }

        if (!isCommented) {
            setIsCommented(true);
            setCommentCount(1);
        }

        setIsTypingComment(true);
        setMockUser(mockUsers[Math.floor(Math.random() * mockUsers.length)]);

        const options = mockComments.filter(c => c !== displayedComment);
        const index = Math.floor(Math.random() * options.length);

        const comment = mockComments[index];

        setDisplayedComment("");
        let i = 0;

        const typeNextChar = () => {
            startTransition(() => {
                setDisplayedComment(comment.slice(0, i + 1));
            });

            i++;

            if (i < comment.length) {
                const delay = 10 + (Math.random() * 30);
                setTimeout(typeNextChar, delay);
            } else {
                startTransition(() => {
                    setIsTypingComment(false);
                });
            }
        }

        typeNextChar();
    }

    const handleHeartClick = () => {
        if (isAnimatingHeart) {
            setIsAnimatingHeart(false);
        }

        if (isLiked) {
            setLikes(likes - 1);
            setIsLiked(false);
        } else {
            setLikes(likes + 1);
            setIsLiked(true);
            triggerHeartAnimation();
        }
    }

    const handleDoubleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (!isLiked) {
            setLikes(likes + 1);
            setIsLiked(true);
        }
        triggerHeartAnimation(x, y);
    }

    const triggerHeartAnimation = (x?: number, y?:number) => {
        if (!mainImageRef.current) return;
        const rect = mainImageRef.current.getBoundingClientRect();

        setTapCoords({
            x: x ?? rect.width / 2,
            y: y ?? rect.height / 2,
        });

        setIsAnimatingHeart(true);

        if (animationTimeoutRef.current !== null) {
            clearTimeout(animationTimeoutRef.current);
        }

        animationTimeoutRef.current = setTimeout(() => {
            setTapCoords(null);
            setIsAnimatingHeart(false);
            animationTimeoutRef.current = null;
        }, 600);
    }

    return (
        <div className={`bg-background border rounded-sm pb-3 w-full max-w-sm mx-auto text-center flex flex-col overflow-visible ${className}`}>

            {/* Header */}
            <div className="flex flex-row border-b border-white/10 justify-between px-3 py-2">
                <div className="flex flex-row">
                    <div className="hidden xs:flex items-center justify-center mr-2">
                        <Image
                            src={profileImageSrc}
                            alt={"Profile picture"}
                            width={100}
                            height={100}
                            className="w-10 h-10 rounded-full border border-neutral-50/20"
                        />
                    </div>
                    <div className="flex flex-col justify-center items-start leading-tight">
                        <p className="text-[12px] font-semibold text-foreground">{username}</p>
                        <p className="text-[11px] text-muted-foreground dark:text-neutral-300">{location}</p>
                    </div>
                </div>

                {/* Options Button */}
                <div
                    ref={optionsMenuButtonRef}
                    className="relative flex items-center"
                    onClick={() => setIsOptionsMenuOpen(open => !open)}
                >
                    <MoreHorizontal className="w-5 h-5 cursor-pointer" />

                    {/* Options Menu */}
                    {isOptionsMenuOpen && (
                        <OptionsMenu />
                    )}
                </div>
            </div>

            {/* Main Image Area */}
            <div className="h-[250px] relative" ref={mainImageRef} onDoubleClick={handleDoubleClick}>
                <Image
                    src={mainImageSrc}
                    alt="Mock post image"
                    fill
                    className="object-cover"
                />

                {/* Like Post Animation */}
                {isAnimatingHeart && tapCoords && <BigHeart x={tapCoords.x} y={tapCoords.y}/>}
            </div>

            {/* Caption */}
            <div className="flex items-center justify-between px-3 pt-3">
                {/* Left Icons */}
                <div className="flex gap-4">

                    {/* Heart Icon */}
                    <div className="flex items-center gap-1">
                        <AnimatedIcon onClick={handleHeartClick} icon={Heart} className={`${isLiked ? "text-red-500 fill-red-500" : "text-gray-900 dark:text-gray-100 fill-none"}`} />
                        {likes > 0 && (<span className="text-[12px] font-semibold">{likes}</span>)}
                    </div>

                    {/* Comment Icon */}
                    <div className="flex items-center gap-1">
                        <AnimatedIcon onClick={handleCommentClick} icon={MessageCircle} className={"-scale-x-100 hover:-scale-x-100 text-gray-900 dark:text-gray-100 fill-none"} />
                        {commentCount > 0 && (<span className="text-[12px] font-semibold">{commentCount}</span>)}
                    </div>

                    {/* Share Icon */}
                    <AnimatedIcon onClick={handleShareClick} icon={Send} className={"text-gray-900 dark:text-gray-100 fill-none"}/>
                </div>

                {/* Right Icons */}
                {/* Save Icon */}
                <AnimatedIcon onClick={handleSaveClick} icon={Bookmark} className={`${isSaved ? "text-gray-900 fill-gray-900 dark:text-gray-100 dark:fill-gray-100" : "text-gray-900 dark:text-gray-100 fill-none"}`} />
            </div>

            {/* Caption Text */}
            <div className="px-4 pt-2 text-[12px] text-left leading-snug break-words">
                <span className="font-semibold mr-1">{username}</span>
                {createHashtags(caption)}
            </div>

            {/* Comments Section */}
            {commentCount > 0 && (
                <div className="px-4 pt-1 text-[12px] text-left leading-snug break-words">
                    <span className="font-semibold mr-1">{mockUser}</span>
                    {displayedComment}
                    {isTypingComment && <span className="animate-blink">|</span>}
                </div>
            )}
        </div>
    );
}

export default MockInstagramPost;