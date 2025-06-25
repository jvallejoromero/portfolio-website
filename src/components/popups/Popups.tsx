import PopupMessage from "@/components/popups/PopupMessage";
import GenericButton from "@/components/buttons/GenericButton";
import React from "react";

export const MockInstagramPostPopup = ({ isOpen, onClickOutside }: { isOpen: boolean, onClickOutside: () => void }) => {
    return (
        <PopupMessage
            isOpen={isOpen}
            onClickOutside={onClickOutside}
        >
            <div className="flex flex-col items-center justify-between w-full max-w-sm p-2 space-y-4">
                <h3 className="text-xl sm:text-2xl font-semibold text-center leading-tight tracking-tight whitespace-normal break-words">
                    🥚 Easter Egg Unlocked!
                </h3>

                <p className="text-sm text-center leading-snug">
                    Surprise! This post isn’t “real” Instagram—it’s a mock demo to show off some React & Tailwind.
                    No API, no real likes or comments.
                </p>

                <GenericButton
                    label="Back to Reality"
                    onClick={onClickOutside}
                    className="w-full px-4 py-2"
                />
            </div>
        </PopupMessage>
    );
}