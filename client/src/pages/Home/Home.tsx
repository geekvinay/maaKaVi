/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import axios from "axios"; // Import axios
import { itemMockData } from './static/items';
import Header from '../../components/Header/Header';
import { Link } from 'react-router-dom';

const ITEMS_INITIAL_LIMIT = 3;
const ITEMS_INCREMENT = 2;

export const ListItem = ({ item, imageUrl }: { item: any; imageUrl: string; }) => {
  const maxTitleLength = 50;
  const maxDescriptionLength = 200;

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <Link to={`/codeplay/${item._id}`}>
      <section className="list-none flex items-center px-4 py-4 mb-4 base-bg mx-2 rounded-lg transition-all duration-300 hover:cursor-pointer hover:bg-gray-100 hover:bg-opacity-10 hover:shadow-md">
        <img
          src={imageUrl}
          alt="thumbnail"
          className="object-cover w-[5rem] h-[5rem] mr-4 rounded-md opacity-90"
        />
        <div>
          <h2 className="text-2xl font-semibold break-words">
            {truncateText(item?.title, maxTitleLength)}
          </h2>
          <p className="text-lg text-gray-400 break-words">
            {truncateText(item?.description, maxDescriptionLength)}
          </p>
        </div>
      </section>
    </Link>
  );
};

export const ForumSection = ({ title, items }: { title: string; items: any[]; }) => {
  const [limit, setLimit] = useState(ITEMS_INITIAL_LIMIT);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    fetchCodingImages();
  }, []);

  const fetchCodingImages = async () => {
    try {
      const apiKey = 'FtNvDyfKMwa5exTp1dIyz8Q00rO0m0JlkxgJkdJA8zuJsHBS87qdj2GT';
      const query = 'web developer';
      const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=10`, {
        headers: {
          Authorization: apiKey,
        },
      });
      const data = await response.json();
      const images = data.photos.map((photo: any) => photo.src.medium);
      setImageUrls(images);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleReadMore = () => {
    setLimit(limit + ITEMS_INCREMENT);
  };

  const displayedItems = items.slice(0, limit);

  return (
    <section className="section-wrapper mx-[10rem] flex flex-col items-center">
      <h2 className="text-2xl px-4 font-bold pt-[2rem] py-[1rem] w-full">{title}</h2>
      <section className="list-none base-h-bg flex-grow mt-2 rounded-lg">
        {displayedItems.map((item, id) => (
          <ListItem item={item} imageUrl={imageUrls[id % imageUrls.length]} key={id} />
        ))}
      </section>
      {limit < items.length && (
        <button
          className="read-more mx-auto text-center w-fit px-4 py-2 mt-4 rounded text-blue-300 opacity-50 transition-all duration-300 hover:cursor-pointer hover:bg-gray-100 hover:bg-opacity-10"
          onClick={handleReadMore}
        >
          Read More
        </button>
      )}
      <hr className="border-gray-300 mt-[2rem]" />
    </section>
  );
};

const Forum = () => {
  const [listItems, setListItems] = useState<any[]>([]);
  const [cohorts, setCohorts] = useState<any[]>([]);
  const [randomDiscussions, setRandomDiscussions] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>(""); // State to track error messages
  const user = JSON.parse(localStorage.getItem('user') || "{}" as string);
  const token = JSON.parse(localStorage.getItem('token') || "{}" as string);

  useEffect(() => {
    fetchModules();
    fetchRandomDiscussions();
    setListItems(itemMockData);
  }, []);

  const fetchModules = async () => {
    try {
      const response = await axios.get(`http://localhost:3031/v1/users/${user._id}/cohorts`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCohorts(response.data.data);
    } catch (error) {
      setErrorMessage("Error fetching modules. Please try again.");
    }
  };

  const fetchRandomDiscussions = async () => {
    try {
      const response = await axios.get(`http://localhost:3031/v1/discussions/all`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRandomDiscussions(response.data);
    } catch (error) {
      setErrorMessage("Error fetching discussions. Please try again.");
    }
  };

  return (
    <section className="forum-wrapper w-screen h-screen base-h-bg overflow-scroll flex flex-col justify-start py-[6rem]">
      {errorMessage && (
        <p className="text-red-500 mb-4 text-center">{errorMessage}</p>
      )}
      <Header />
      <h2 className="text-3xl font-bold pt-[2rem] w-full px-[11rem]">Cohorts</h2>
      {cohorts.map((cohort, index) => (
        <ForumSection title={cohort.cohortName} items={cohort.modules} key={index} />
      ))}
      <ForumSection title="Discussions" items={randomDiscussions} />
      <ForumSection title="Top Discussions" items={listItems} />
    </section>
  );
};

export default Forum;
