import React, {useEffect} from "react";
import {createPortal} from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

type PopupMessageProps = {
    isOpen: boolean;
    onClickOutside: () => void;
    children: React.ReactNode;
}

const PopupMessage = ({ isOpen, onClickOutside, children }: PopupMessageProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const modal = (
        <AnimatePresence>
            <div
                role={"dialog"}
                aria-modal={true}
                className={"fixed inset-0 z-50 flex items-center justify-center"}
            >
                {/* Backdrop */}
                <div
                    onClick={onClickOutside}
                    onTouchStart={onClickOutside}
                    onPointerDown={onClickOutside}
                    className={"absolute inset-0 bg-black/80"}
                />

                {/* Content */}
                <motion.div
                    onClick={e => e.stopPropagation()}
                    className="relative w-full p-6 max-w-sm m-10 min-w-0 rounded-sm
                           bg-gradient-to-b from-white to-neutral-300
                           dark:bg-gradient-to-t dark:from-black dark:to-neutral-900
                           shadow-lg shadow-neutral-300/5 border border-neutral-300 dark:border-neutral-700/30"
                    initial={{ y: "100vh", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "100vh", opacity: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 600,
                        damping:   35,
                        bounce:    0.1,
                    }}
                >
                    {children}
                </motion.div>
            </div>
        </AnimatePresence>
    );

    return createPortal(modal, document.body);
}

export default PopupMessage;