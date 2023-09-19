import { Menu } from "antd";
import { AppstoreOutlined,ShopOutlined , ShoppingCartOutlined  ,UserOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function AppSideBar () 
{
    const navigate = useNavigate();
    return(
        <div className="app-sidebar">
            <Menu className= 'menubar' mode="vertical" onClick={(item) => {

                navigate(item.key);
            }}
            items={[
                {
                    label:"Dashboard",
                    icon:<AppstoreOutlined />,
                    key: "/"
                },
                {
                    label:"Inventory",
                    icon: <ShopOutlined/>,
                    key: "/inventory"
                },
                {
                    label:"Orders",
                    icon: <ShoppingCartOutlined/>,
                    key: "/orders"
                },
                {
                    label:"Custumers",
                    icon: <UserOutlined/>,
                    key: "/customers"
                },
            ]}></Menu>
        </div>
    );
}
export default AppSideBar;