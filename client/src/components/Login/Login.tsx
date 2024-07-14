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
    const [password, setPassword] = useState<string>("");
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    useEffect(() => {
        const fetchCodingImages = async () => {
            try {
                const apiKey = "FtNvDyfKMwa5exTp1dIyz8Q00rO0m0JlkxgJkdJA8zuJsHBS87qdj2GT";
                const query = "companies";
                const response = await fetch(
                    `https://api.pexels.com/v1/search?query=${query}&per_page=3`,
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

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const sessionDetails = { username, password };

        try {
            const response = await fetch("http://localhost:3030/v1/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sessionDetails),
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result);
                localStorage.setItem("session-details", JSON.stringify(result));
                navigate(`/home`);
            } else {
                console.error("Login failed");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <section className="parentPage h-screen w-screen bg-gray-300 grid grid-cols-2">
            <section className="right-section bg-red-200">
                <img
                    src={imageUrls[0]}
                    alt={`Pexels Image`}
                    className="h-full w-full object-cover"
                />
            </section>
            <section className="left-section flex flex-col items-center justify-center">
                <div className="formWrapper min-w-[40%] py-[4rem] px-[4rem] rounded-xl bg-white flex flex-col justify-center">
                    <form onSubmit={handleFormSubmit} className="w-[30vw] h-[40vh] flex flex-col justify-center items-start">
                        <label htmlFor="username" className="text-slate-700 mb-6 text-2xl font-bold">
                            Hi Learner, Login to continue!
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username"
                            className="px-4 py-2 my-2 w-full bg-gray-200 shadow-sm rounded-md"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            className="px-4 py-2 my-2 w-full bg-gray-200 shadow-sm rounded-md"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 my-2 bg-blue-500 text-white font-medium w-full shadow-sm rounded-md"
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
