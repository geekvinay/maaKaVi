import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios

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
    const [errorMessage, setErrorMessage] = useState<string>(""); // State to track error messages

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

    const handleFormSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();
        const sessionDetails = { username, password: classCode };

        try {
            const response = await axios.post('http://localhost:3031/v1/users/login', sessionDetails);

            if (response.status === 200) {
                // Store the session details in local storage if needed
                localStorage.setItem("user", JSON.stringify(response.data.data.user));
                localStorage.setItem("token", JSON.stringify(response.data.data.token));
                navigate(`/home`);
            } else {
                setErrorMessage("Invalid username or password. Please try again.");
            }
        } catch (error) {
            setErrorMessage("Invalid username or password. Please try again.");
        }
    };

    return (
        <section className="parentPage h-screen w-screen base-h-bg grid grid-cols-2">
            <section className="right-section base-h-bg">
                {imageUrls.length > 0 && (
                    <img
                        src={imageUrls[0]}
                        className="h-full w-full object-cover"
                    />
                )}
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
                        {errorMessage && (
                            <p className="text-red-500 mb-4">{errorMessage}</p>
                        )}
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
                            type="password"
                            name="classCode"
                            id="classCode"
                            placeholder="Password"
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
