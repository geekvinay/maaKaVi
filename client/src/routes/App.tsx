// App.js
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home/Home';
import LearnModule from '../pages/LearnModule/LearnModule';
import "../index.css";
import KaviAI from '../components/KaviAI/KaviAI';
import Login from '../components/Login/Login';

const router = createBrowserRouter([
    {
        path: "",
        element: <Login />,
    },
    {
        path: "home",
        element: <Home />,
    },
    {
        path: "discussions",
        element: <div>discussions</div>,
    },
    {
        path: "codeplay/*",
        element: <LearnModule />,
    },
    {
        path: "kavi",
        element: (
            <div className='w-screen h-screen'>
                <KaviAI article='' code='' />,
            </div>
        )
    },
    {
        path: "*",
        element: <div>Error</div>,
        errorElement: <div>error</div>,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
