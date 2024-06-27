import { Routes, Route } from 'react-router-dom'
import ThemeExample from '../Style/ThemeExample';

function Router() {
    return (
        <Routes>
            {/* <Route path='/' element={<MainPage />} /> */}

            {/* theme 사용 에시 페이지 */}
            <Route path ='/theme' element = {<ThemeExample />} />
        </Routes>
    );
}

export default Router;
