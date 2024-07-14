// App.js
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Forum from '../pages/Home/Home';
import LearnModule from '../pages/LearnModule/LearnModule';
import "../index.css";

const router = createBrowserRouter([
    {
        path: "*",
        element: <div>Error</div>,
        errorElement: <div>error</div>,
    },
    {
        path: "home",
        element: <Forum />,
    },
    {
        path: "discussions",
        element: <div>discussions</div>,
    },
    {
        path: "codeplay",
        element: <LearnModule />,
    },
    {
        path: "kavi",
        element: <div>kavi</div>,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
