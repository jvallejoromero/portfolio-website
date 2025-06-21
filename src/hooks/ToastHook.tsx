import { useState, useCallback } from "react";

export function useToast(duration = 3000) {
    const [toast, setToast] = useState<string | null>(null);

    const showToast = useCallback((msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), duration);
    }, [duration]);

    return { toast, showToast };
}