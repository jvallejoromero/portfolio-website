import React, { useEffect } from "react"

export function useClickOutside(refs: React.RefObject<HTMLDivElement | null>[], handler: (e: MouseEvent | TouchEvent) => void) {
    useEffect(() => {
        const listener = (e: MouseEvent | TouchEvent) => {
            for (const ref of refs) {
                if (ref.current?.contains(e.target as Node)) {
                    return;
                }
            }
            handler(e);
        };

        document.addEventListener("mousedown", listener)
        document.addEventListener("touchstart", listener)

        return () => {
            document.removeEventListener("mousedown", listener)
            document.removeEventListener("touchstart", listener)
        }
    }, [refs, handler])
}
