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
    }, 1000)

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-slate-200 to-slate-100">
            <div className={`transition-all duration-300 ease-in-out ${timeLoading ? 'opacity-100' : 'opacity-0'}`}>
                <lottie-player
                    src="https://lottie.host/4bd9620d-cb68-45ee-b4dd-1a265e42cbbc/X2UBIfDndd.json"
                    speed="2"
                    style={{ width: '150px', height: '150px' }}
                    loop
                    autoplay
                ></lottie-player>
            </div>
        </div>
    );
}

export default Loading;