import { Badge, Drawer, Typography ,List} from 'antd';
import {BellOutlined,MailOutlined} from '@ant-design/icons';
import mlogo from './logo.jpg';
import { useEffect, useState } from 'react';
import { getComments, getOrder } from '../../Api';
function AppHeader ()
{
  const [comments, setComments] = useState([]);
const [orders, setOrders] = useState([]);
const [commentsOpen,setCommentsOpen] = useState(false);
const [notificationOpen, setNotifcationOpen] = useState(false);
  useEffect(() =>
  {
    getComments().then((res) =>
    {
      setComments(res.comments);
    })
    getOrder().then((res) =>
    {
      setOrders(res.products);
    })
  },[]);
    return(
        <div className="app-header">
          <img width = {70} src = {mlogo} alt='logo'/>
          <Typography.Title >Maryam's Dashboard</Typography.Title>
          <space>
            <Badge count={comments.length} dot>
          <MailOutlined  style={{fontSize: 24}} onClick={() => setCommentsOpen(true)}  />
          </Badge>
          <Badge count = {orders.length}>
            <BellOutlined style={{fontSize: 24}} onClick={() => setNotifcationOpen(true)}/>
            </Badge>
          </space>
          <Drawer title='comments' open = {commentsOpen} onClose={() =>setCommentsOpen(false)  } maskClosable>
          <List dataSource={comments} renderItem={(item) => {return<List.Item>{item.body}</List.Item>}}></List>
          </Drawer>
          <Drawer title='notifications' open = {notificationOpen} onClose={() =>setNotifcationOpen(false)  } maskClosable>
          <List dataSource={orders} renderItem={(item) => {return<List.Item><Typography.Text strong>{item.title}</Typography.Text > has been ordered</List.Item>}}></List>
          </Drawer>
            </div>
    );
}
export default AppHeader;