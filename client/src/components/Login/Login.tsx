import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PexelsPhoto {
    src: {
        medium: string;
    };
}

interface PexelsResponse {
    photos: PexelsPhoto[];
}

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [classCode, setClassCode] = useState<string>("");
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    useEffect(() => {
        const fetchCodingImages = async () => {
            try {
                const apiKey = "FtNvDyfKMwa5exTp1dIyz8Q00rO0m0JlkxgJkdJA8zuJsHBS87qdj2GT";
                const query = "companies";
                const response = await fetch(
                    `https://api.pexels.com/v1/search?query=${query}&per_page=10`,
                    {
                        headers: {
                            Authorization: apiKey,
                        },
                    }
                );
                const data: PexelsResponse = await response.json();
                const images = data.photos.map((photo) => photo.src.medium);
                setImageUrls(images);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchCodingImages();
    }, []);

    const handleUsernameChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setUsername(e.target.value);
    };

    const handleClassCodeChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setClassCode(e.target.value);
    };

    const handleFormSubmit = (
        event: React.FormEvent<HTMLFormElement>
    ): void => {
        event.preventDefault();
        const sessionDetails = { username, classCode };
        localStorage.setItem("session-details", JSON.stringify(sessionDetails));
        navigate(`/student`);
    };

    return (
        <section className="parentPage h-screen w-screen base-h-bg grid grid-cols-2">
            <section className="right-section base-h-bg">
                <img
                    src={imageUrls[1]}
                    alt={`Pexels Image`}
                    className="h-full w-full object-cover opacity-70"
                />
            </section>
            <section className="left-section flex flex-col items-center justify-center">
                <div className="formWrapper min-w-[40%] py-[4rem] px-[4rem] rounded-xl base-bg flex flex-col justify-center">
                    <form onSubmit={handleFormSubmit} className="w-[30vw] h-[40vh] flex flex-col justify-center items-start">
                        <label
                            htmlFor="username"
                            className="text-gray-300 mb-6 text-2xl font-bold"
                        >
                            Hi Learner, Login to continue!
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username"
                            className="px-4 py-4 my-2 w-full base-h-bg shadow-sm rounded-md"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <input
                            type="text"
                            name="classCode"
                            id="classCode"
                            placeholder="Class ID"
                            className="px-4 py-4 my-2 w-full base-h-bg shadow-sm rounded-md"
                            value={classCode}
                            onChange={handleClassCodeChange}
                        />
                        <button
                            type="submit"
                            className="px-4 py-4 my-2 bg-blue-200 opacity-80 text-lg text-black font-semibold w-full shadow-sm rounded-md"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </section>
        </section>
    );
};

export default Login;