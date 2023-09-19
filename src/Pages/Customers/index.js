import { Avatar, Rate, Space,Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getUser } from "../../Api";



function Customers()
{
    const [loaading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() =>
    {
        setLoading(true);
        getUser().then(res =>
            {
                setDataSource(res.users);
                setLoading(false);
            })
    },[]);
    return <Space size={20} direction="vertical">
       <Typography.Title level={4}>Customers</Typography.Title>
       <Table
       loading={loaading} columns={[
        {
            
                title: 'Photo',
                dataIndex: 'image',
                render: (Link)=>
                {
                    return <Avatar src={Link}/>
                }
               },
               {
        title: 'First Name',
        dataIndex: 'firstName',
     
       },
       {
        title: 'Last Name',
        dataIndex: 'lastName',
       
       },
       {
        title: 'Email',
        dataIndex: 'email',
        
       },
       {
        title: 'Phone#',
        dataIndex:'phone'
       },
       
       {
        title: 'Address',
        dataIndex: 'address',
        render: (address) =>
        {
            return <span>{address.address},{address.city}</span>
        }
       },
       {
        title: 'Brand',
        dataIndex:'brand'
       },
       ]}
       dataSource={dataSource}
       pagination={{pageSize: 5}}>

       </Table>
    </Space>
}
export default Customers;