import {motion} from "framer-motion";
import {JSX} from "react";

type AnimatedButtonProps = {
    isSubmitting: boolean;
    onClick?: () => void;
    label: string;
    sendingMessage?: string;
    hoverMessage?: string;
    incomplete?: boolean;
    className?: string;
}

const AnimatedButton = ({ isSubmitting, onClick, label, sendingMessage="Sending..", hoverMessage="", incomplete, className="" }: AnimatedButtonProps) => {
    return (
        <motion.button
            type="submit"
            onClick={onClick}
            disabled={isSubmitting}
            initial="rest"
            whileHover="hover"
            animate="rest"
            className={`relative overflow-hidden self-start bg-gradient-to-br from-background to-neutral-100 dark:to-neutral-900 border dark:border-white/20 px-6 py-2 rounded-sm font-medium shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-auto ${className}`}
        >
            {/* Sliding Text */}
            <motion.span
                className="relative z-10 flex items-center justify-center"
                variants={{
                    rest: { x: 0, opacity: 1 },
                    hover: { x: -100, opacity: 0, transition: { duration: 0.3 } },
                }}
            >
                {isSubmitting ? sendingMessage : label}
            </motion.span>

            {/* Hover Text */}
            <motion.span
                className="absolute inset-0 flex items-center justify-center"
                variants={{
                    rest: { x: 100, opacity: 0 },
                    hover: { x: 0, opacity: 1, transition: { duration: 0.3 } },
                }}
            >
                {isSubmitting ? '...' : incomplete ? "Incomplete ❌" : hoverMessage}
            </motion.span>
        </motion.button>
    );
}

export default AnimatedButton;