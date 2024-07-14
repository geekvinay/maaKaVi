/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { NavType } from './HomeTypes';
import { itemMockData } from './static/items';

const ITEMS_PER_PAGE = 5;

const ListItem = ({ item }: { item: any }) => {
  const maxTitleLength = 50;
  const maxDescriptionLength = 100;

  return (
    <section className="list-item px-10 py-4 mb-2 base-bg mx-2 rounded-lg hover:cursor-pointer shadow">
      <h2 className="text-xl font-semibold mb-2 break-words">
        {truncateText(item?.title, maxTitleLength)}
      </h2>
      <p className="text-base text-gray-400 break-words">
        {truncateText(item?.description, maxDescriptionLength)}
      </p>
    </section>
  );
};

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

const Forum = () => {
  const [nav, setNav] = useState(NavType.Modules);
  const [listItems, setListItems] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setListItems(itemMockData);
  }, []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedItems = listItems.slice(startIndex, endIndex);
  const totalPages = Math.ceil(listItems.length / ITEMS_PER_PAGE);

  return (
    <section className="forum-wrapper w-screen h-screen base-h-bg overflow-scroll px-20 flex flex-col justify-start">
      <section className="base-bg h-fit px-3 py-3 my-16 rounded-md flex flex-col shadow-2xl">
        <nav className="base-h-bg section selector h-fit w-full flex items-center rounded-lg py-2 px-2">
          <li
            className={`w-44 py-2 flex justify-center items-center list-none font-medium transition-all animate-ease-in duration-100 hover:cursor-pointer ${
              nav == NavType.Modules ? 'bg-white opacity-75 text-gray-800 rounded-lg' : ''
            }`}
            onClick={() => {
              setNav(NavType.Modules);
            }}
          >
            Modules
          </li>
          <li
            className={`w-44 py-2 flex justify-center items-center list-none font-medium transition-all animate-ease-in duration-100 hover:cursor-pointer ${
              nav == NavType.Discussions ? 'bg-white opacity-75 text-gray-800 rounded-lg' : ''
            }`}
            onClick={() => setNav(NavType.Discussions)}
          >
            Discussions
          </li>
          <li
            className={`w-44 py-2 flex justify-center items-center list-none font-medium transition-all animate-ease-in duration-100 hover:cursor-pointer ${
              nav == NavType.MyDiscussions ? 'bg-white opacity-75 text-gray-800 rounded-lg' : ''
            }`}
            onClick={() => setNav(NavType.MyDiscussions)}
          >
            My Discussions
          </li>
        </nav>
        <section className="list-item base-h-bg flex-grow mt-2 rounded-lg pt-2 overflow-y-scroll">
          {paginatedItems.map((item: any, id: any) => (
            <ListItem item={item} key={id} />
          ))}
        </section>

        <div className="pagination mt-4 flex justify-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === index + 1 ? 'base-h-bg text-white' : 'base-bg'
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Forum;
