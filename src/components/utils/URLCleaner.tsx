"use client";

import { useEffect } from "react";

const URLCleaner = () => {
    useEffect(() => {
        const cleanURL = () => {
            const { hash, pathname, search } = window.location;
            if (!hash) return;

            const id = hash.slice(1);
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            window.history.replaceState(null, document.title, pathname + search);
        }

        cleanURL();

        window.addEventListener("hashchange", cleanURL);
        return () => {
            window.removeEventListener("hashchange", cleanURL);
        }
    }, []);

    return null;
}

export default URLCleaner;