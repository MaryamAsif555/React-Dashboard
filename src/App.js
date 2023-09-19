import { Space } from 'antd';
import './App.css';
import AppHeader from './Components/AppHeader';
import AppSideBar from './Components/AppSideBar';
import PageContent from './Components/PageContent';
import AppFooter from './Components/AppFooter';

function App()
{

return(
    <div className="App">
        <AppHeader/>
        <div className='sidebarandpagecontent'>
            <AppSideBar></AppSideBar>
            <PageContent></PageContent>
        </div>
        <AppFooter/>
    </div>
);
}

export default App;