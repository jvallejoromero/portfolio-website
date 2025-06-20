"use client";

import {MoreHorizontal, Heart, MessageCircle, Send, Bookmark, LucideIcon} from "lucide-react";
import Image from "next/image";
import React, {JSX, useEffect, useRef, useState} from "react";
import { motion } from "framer-motion";

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

    const [mockUser, setMockUser] = useState<string>("");

    const [showBigHeart, setShowBigHeart] = useState<boolean>(false);
    const [isShowingHeart, setIsShowingHeart] = useState<boolean>(false);
    const [tapCoords, setTapCoords] = useState<{ x: number; y: number } | null>(null);

    const mainImageRef = useRef<HTMLDivElement>(null);

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

        const MotionIcon = motion(Icon);

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
        const MotionHeart = motion(Heart);
        return (
            <div
                className="absolute pointer-events-none z-50"
                style={{
                    left: x,
                    top: y,
                    transform: "translate(-50%, -50%)",
                }}
            >
                {/* Floating Heart */}
                <MotionHeart
                    initial={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
                    animate={{
                        scale: [1.4, 1],
                        opacity: [1, 0],
                        y: -60,
                        rotate: [0, -10, 10, -6, 6, -2, 2, 0], // wobble
                    }}
                    transition={{
                        duration: 0.9,
                        ease: "easeOut",
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

    const handleHeartClick = (coords?: { x: number; y: number }) => {
        const wasLiked = isLiked;
        if (!isShowingHeart) {
            triggerHeartAnimation(coords?.x, coords?.y);
        }

        if (isLiked) {
            return;
        }

        setIsLiked(!wasLiked);
        setLikes(prev => prev + (wasLiked ? -1 : 1));
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
            setDisplayedComment(comment.slice(0, i + 1));
            i++;

            if (i < comment.length) {
                const delay = 10 + (Math.random() * 50);
                setTimeout(typeNextChar, delay);
            } else {
                setIsTypingComment(false);
            }
        }

        typeNextChar();
    }

    const handleDoubleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        handleHeartClick({x, y});
    }

    const triggerHeartAnimation = (x?: number, y?:number) => {
        if (!mainImageRef.current || isShowingHeart) return;
        const rect = mainImageRef.current.getBoundingClientRect();

        setTapCoords({
            x: x ?? rect.width / 2,
            y: y ?? rect.height / 2,
        });

        setShowBigHeart(true);
        setIsShowingHeart(true);
        console.log("tap coords", tapCoords);
        setTimeout(() => {
            setShowBigHeart(false);
            setIsShowingHeart(false);
        }, 600);
    }

    return (
        <div className={`bg-background border rounded-sm pb-3 w-full max-w-sm mx-auto text-center flex flex-col overflow-hidden ${className}`}>
            {/* Header */}
            <div className="flex flex-row border-b border-white/10 justify-between px-3 py-2">
                <div className="flex flex-row">
                    <div className="flex items-center justify-center mr-2">
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

                <div className="flex items-center">
                    <MoreHorizontal className="w-5 h-5 cursor-pointer" />
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
                {showBigHeart && tapCoords && <BigHeart x={tapCoords.x} y={tapCoords.y}/>}
            </div>

            {/* Caption */}
            <div className="flex items-center justify-between px-3 pt-3">
                {/* Left Icons */}
                <div className="flex gap-4">

                    {/* Heart Icon */}
                    <div className="flex items-center gap-1">
                        <AnimatedIcon onClick={handleHeartClick} icon={Heart} fill={isLiked ? "red" : "none"} color={isLiked ? "red" : "white"} />
                        {likes > 0 && (<span className="text-[12px] font-semibold">{likes}</span>)}
                    </div>

                    {/* Comment Icon */}
                    <div className="flex items-center gap-1">
                        <AnimatedIcon onClick={handleCommentClick} icon={MessageCircle} className="-scale-x-100 hover:-scale-x-100"/>
                        {commentCount > 0 && (<span className="text-[12px] font-semibold">{commentCount}</span>)}
                    </div>
                    <AnimatedIcon onClick={handleShareClick} icon={Send}/>
                </div>

                {/* Save Icon */}
                <AnimatedIcon onClick={handleSaveClick} icon={Bookmark} fill={isSaved ? "white" : "none"} />
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