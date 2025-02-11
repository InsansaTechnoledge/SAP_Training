import React,{ useEffect } from "react";

function H5PVideo() {
    useEffect(() => {
        const loadH5P = async () => {
            const { H5P } = await import("h5p-standalone");

            // Load H5P content from public folder
            new H5P(document.getElementById("h5p-container"), "/interactive.h5p");
        };

        loadH5P();
    }, []);

    return <div id="h5p-container" className="w-full h-[500px]"></div>;
}

export default H5PVideo;
