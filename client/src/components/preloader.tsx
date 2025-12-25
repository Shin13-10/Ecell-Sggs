import { useEffect, useState } from "react";

export function Preloader() {
    const [launching, setLaunching] = useState(false);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const handleLoad = () => {
            // Trigger the launch animations
            setLaunching(true);

            // Wait for animations to finish before hiding the container
            setTimeout(() => {
                setHidden(true);
            }, 500);
        };

        // Check if window is already loaded
        if (document.readyState === "complete") {
            setTimeout(handleLoad, 1300); // Wait 1.3 seconds even if loaded
        } else {
            window.addEventListener("load", () => setTimeout(handleLoad, 1300));
        }

        // Creating a backup timeout in case load event fired before listener
        const backupTimer = setTimeout(handleLoad, 2000);

        return () => {
            window.removeEventListener("load", handleLoad);
            clearTimeout(backupTimer);
        };
    }, []);

    if (hidden) return null;

    return (
        <>
            <style>{`
        /* 1. The Preloader Container */
        #preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #1a1a1a;
            z-index: 9999;
            display: flex;
            flex-direction: column; /* Stacks rocket and text vertically */
            justify-content: center;
            align-items: center;
            transition: opacity 0.5s ease 0.5s; /* Delay fade-out so rocket leaves first */
        }

        /* 2. The Rocket Styling */
        .rocket-container {
            width: 60px;
            height: 60px;
            margin-bottom: 20px; /* Space between rocket and text */
            animation: pulse-fly 2s infinite ease-in-out; 
            transition: transform 0.8s ease-in;
        }

        .rocket-svg {
            width: 100%;
            height: 100%;
            fill: #ffffff;
            filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
        }

        /* 3. The Text Styling */
        .loading-text {
            color: #ffffff;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            font-size: 14px;
            font-weight: 300; /* Light font weight for elegance */
            letter-spacing: 2px; /* Spaced out letters look more premium */
            text-transform: uppercase;
            opacity: 0.8;
            transition: opacity 0.3s ease, transform 0.3s ease;
        }

        /* 4. Floating Animation */
        @keyframes pulse-fly {
            0% { transform: translateY(0px); opacity: 0.9; }
            50% { transform: translateY(-10px); opacity: 1; }
            100% { transform: translateY(0px); opacity: 0.9; }
        }

        /* 5. Launch Animation States */
        
        /* Rocket goes UP */
        .rocket-launching .rocket-container {
            animation: none;
            transform: translateY(-150vh) scale(0.5);
        }

        /* Text fades OUT and moves down slightly */
        .rocket-launching .loading-text {
            opacity: 0;
            transform: translateY(20px); 
        }

        /* Background fades */
        .preloader-hidden {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
        }
      `}</style>
            <div id="preloader" className={`${launching ? "rocket-launching" : ""} ${hidden ? "preloader-hidden" : ""}`}>
                <div className="rocket-container">
                    <svg className="rocket-svg" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <path d="M256 16c-5.52 0-10.42 2.65-13.72 6.84L128.53 162.9c-8.98 11.41-11.75 26.54-7.53 40.53l35.84 118.88c4.22 14 15.65 24.58 29.84 27.63l53.95 11.56c8.58 1.84 17.5 1.84 26.08 0l53.95-11.56c14.19-3.04 25.62-13.62 29.84-27.63l35.84-118.88c4.22-13.99 1.45-29.12-7.53-40.53L269.72 22.84C266.42 18.65 261.52 16 256 16zM153.37 172.48l102.63-130.6 102.63 130.6-26.17 86.82-76.46 16.39-76.46-16.39-26.17-86.82z" />
                        <path d="M256 512c-35.35 0-64-28.65-64-64 0-35.35 28.65-64 64-64s64 28.65 64 64c0 35.35-28.65 64-64 64z" opacity="0.5" />
                    </svg>
                </div>
                <p className="loading-text">Launching E-cell SGGSIE&T...</p>
            </div>
        </>
    );
}
