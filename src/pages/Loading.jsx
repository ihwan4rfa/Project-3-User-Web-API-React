import { useEffect, useState } from "react";

const Loading = () => {

    useEffect(() => {
        // Menambahkan script Lottie ke dalam HTML
        const script = document.createElement('script');
        script.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            // Membersihkan script saat komponen dibongkar
            document.body.removeChild(script);
        };
    }, []);

    const [timeLoading, setTimeLoading] = useState(true);

    setTimeout(() => {
        setTimeLoading(false);
    }, 2500)

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-700">
            <div className={`transition-all duration-300 ease-in-out ${timeLoading ? 'opacity-100' : 'opacity-0'}`}>
                <lottie-player
                    src="https://lottie.host/9f12b545-3e37-4dbd-943a-2061a8508db6/Isvj3aXYxN.json"
                    speed="1.5"
                    style={{ width: '350px', height: '350px' }}
                    loop
                    autoplay
                ></lottie-player>
            </div>
        </div>
    );
}

export default Loading;