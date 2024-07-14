// Layout.js
import { useLocation } from 'react-router-dom';

const Layout = () => {
    const location = useLocation();
    const path = location.pathname;

    if (path === '/home') {
        return <div>home</div>;
    } else if (path === '/discussions') {
        return <div>discussions</div>;
    } else if (path === '/codeplay') {
        return <div>codeplay</div>;
    } else if (path === '/kavi') {
        return <div>kavi</div>;
    } else {
        return <div> </div>;
    }
};

export default Layout;
