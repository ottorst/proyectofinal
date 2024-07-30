import Image from 'next/image';

const LoadingPage: React.FC = () => {

    return (
        <div className="flex flex-col items-center min-h-screen bg-custom-black/94 pt-40">
            <div className="flex items-center mb-4">
                <Image
                    src='/gorrocheff.png'
                    alt="Loading"
                    width={150}
                    height={150}
                    className="animate-spin"
                />
            </div>

            <div className="text-2xl font-semibold text-white">
                {Array.from("Loading").map((char, index) => (
                    <span
                        key={index}
                        className="inline-block"
                        style={{ animation: `fadeIn 0.5s ${index * 0.1}s forwards` }}
                    >
                        {char}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default LoadingPage;
