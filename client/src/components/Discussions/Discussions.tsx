/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

const Discussions = () => {
    const [discussions, setDiscussions] = useState<any>([]);
    const [newDiscussion, setNewDiscussion] = useState('');
    const [expandedDiscussions, setExpandedDiscussions] = useState<any>({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchDiscussions();
    }, []);

    const fetchDiscussions = async () => {
        try {
            //   const response = await axios.get('/api/discussions');
            // setDiscussions(response.data);
            setDiscussions([
                {
                    id: 1,
                    title: 'Discussion 1',
                    comments: [
                        { id: 1, content: 'Comment 1' },
                        { id: 2, content: 'Comment 2' },
                        { id: 3, content: 'Comment 3' },
                    ],
                    children: [
                        {
                            id: 2,
                            title: 'Child Discussion 1',
                            comments: [
                                { id: 4, content: 'Comment 4' },
                                { id: 5, content: 'Comment 5' },
                            ],
                        },
                    ],
                },
                {
                    id: 3,
                    title: 'Discussion 2',
                    comments: [
                        { id: 6, content: 'Comment 6' },
                        { id: 7, content: 'Comment 7' },
                    ],
                    children: [],
                },
            ]);
        } catch (error) {
            console.error('Error fetching discussions:', error);
        }
    };

    const handleNewDiscussion = () => {
        if (newDiscussion.trim() !== '') {
            createDiscussion(newDiscussion);
            setNewDiscussion('');
        }
    };

    const createDiscussion = async (title: any) => {
        try {
            console.log('title: ', title);
            //   await axios.post('/api/discussions', { title });
            fetchDiscussions();
        } catch (error) {
            console.error('Error creating discussion:', error);
        }
    };

    const handleDiscussionClick = (id: any) => {
        navigate(`/discussions/${id}`);
    };

    const toggleExpandedDiscussion = (id: any) => {
        setExpandedDiscussions((prevState: any) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    return (
        <div className="w-full h-full base-bg text-white rounded-lg p-4">
            <div className="flex flex-col h-full">
                <h1 className="text-2xl font-bold mb-4">Discussions</h1>
                <div className="overflow-auto flex-grow base-h-bg rounded-t-md chat-window py-4 max-h-[70vh]">
                    {discussions.map((discussion: any) => (
                        <div key={discussion.id}>
                            <div
                                onClick={() => handleDiscussionClick(discussion.id)}
                                className="bg-gray-100 hover:bg-white hover:bg-opacity-10 cursor-pointer p-4 mb-2 rounded-md base-bg mx-4"
                            >
                                <h2 className="text-lg font-bold">{discussion.title}</h2>
                                <p className="text-gray-600">
                                    {discussion.comments.length} comments
                                </p>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleExpandedDiscussion(discussion.id);
                                    }}
                                    className="bg-gray-700 hover:bg-gray-700 text-white px-4 py-2 rounded-lg mt-2"
                                >
                                    {expandedDiscussions[discussion.id] ? 'Hide' : 'Read More'}
                                </button>
                            </div>
                            {expandedDiscussions[discussion.id] && (
                                <div className="ml-8 mt-2">
                                    {discussion.children.map((child: any) => (
                                        <div
                                            key={child.id}
                                            onClick={() => handleDiscussionClick(child.id)}
                                            className="bg-gray-100 hover:bg-gray-200 cursor-pointer p-4 mb-2 rounded-md base-bg mx-4"
                                        >
                                            <h2 className="text-lg font-bold">{child.title}</h2>
                                            <p className="text-gray-600">
                                                {child.comments.length} comments
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="mb-4 w-full h-fit flex border-[#1C1F23] border-8 rounded-b-lg">
                    <input
                        type="text"
                        value={newDiscussion}
                        onChange={(e) => setNewDiscussion(e.target.value)}
                        placeholder="Start a new discussion..."
                        className="flex-grow px-4 py-4 rounded-bl-lg base-bg focus:outline-none text-white"
                    />
                    <button
                        onClick={handleNewDiscussion}
                        className="bg-gray-700 hover:bg-gray-700 text-white px-8 py-4 rounded-br-lg"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Discussions;