import { ShoppingCartOutlined,UserOutlined,ShoppingOutlined,DollarCircleOutlined } from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getInventory, getOrder, getRevenue, getUser } from "../../Api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



function Dashboard()
{
  const [order, setOrder] = useState();
  const [inventory, setInventory] = useState();
  const [customer, setCustomer] = useState();
  const [revenue, setRevenue] = useState();

  useEffect(()=>
  {
    getOrder().then(res=>
      {
        setOrder(res.total);
      })
      getInventory().then(res=>
        {
          setInventory(res.total);
        })
        getRevenue().then(res=>
          {
            setRevenue(res.total);
          })
          getUser().then(res => 
            {
              setCustomer(res.total);
            })

  },[])
    return <div>
        <Space size={12} direction="vertical">
        <Typography.Title level={4}>Dashboard</Typography.Title>
        
        <Space direction="horizontal">       
         
         <DashboardCard
         icon = {
         <ShoppingCartOutlined
         style={{
            color:"green",
            backgroundColor:"rgba(0,255,0,.25)",
            borderRadius:16,
            fontSize: 24,
            padding: 8

         }}
         
         />} 
         title = {"Orders"} 
         value = {order}/>
        
        <DashboardCard  
         icon = {<UserOutlined 
            style={{
                color:"blue",
                backgroundColor:"rgba(0,0,255,.25)",
                borderRadius:16,
                fontSize: 24,
                padding: 8
    
             }}
             />}
          title = {"Customers"} 
          value = {customer}/>
        <DashboardCard 
         icon = {<ShoppingOutlined
            style={{
                color:"purple",
                backgroundColor:"rgba(0,255,255,.25)",
                borderRadius:16,
                fontSize: 24,
                padding: 8
    
             }}
             />}
          title = {"Inventory"}
           value = {inventory}/>
        <DashboardCard   icon = {<DollarCircleOutlined
         style={{
            color:"red",
            backgroundColor:"rgba(255,0,0,.25)",
            borderRadius:16,
            fontSize: 24,
            padding: 8

         }}
         
        />} 
        title = {"Revenue"} value = {revenue}/>
    
        </Space>
        <Space >
        <RecentOrder/>
        <DashbordChart/>
        </Space>
        </Space>
</div>
}

const DashboardCard = ({icon, title, value}) =>
{
    return(
    <>
   
            <Card>
                <Space direction="horizontal">
                    {icon}
                    <Statistic title= {title} value={value}/>
                </Space>
            </Card>
        
    </>);
}

function RecentOrder()
{
    const [dataSource,setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() =>
    {
        setLoading(true);
        getOrder().then((res) =>
            {
                setDataSource(res.products.splice(0,3))
                setLoading(false);
            });
    },[]);
    return(
        <>
        <Typography.Text>Recent Orders</Typography.Text>
        <Table
        columns={[
            {
            title:'Title',
            dataIndex:'title',

        },
        {
            title:'Quantity',
            dataIndex:'quantity',

        },
        {
            title:'Price',
            dataIndex:'discountedPrice',

        },
        ]}
        loading = {loading}
        dataSource={dataSource}

        >


        </Table>
        </>

    );
}
function DashbordChart()
{
    const [revenueData, setRevenueData] = useState({labels: [], datasets: []})
    useEffect(() => {
        getRevenue().then((res) =>
        {
          console.log(res); 
            const labels = res.carts.map((cart) =>
            {
              
                return `User-${cart.userId}`;
            });
            const data = res.carts.map((cart) =>
            {
                return cart.discountedTotal;
            });
            
           const dataSource  = {
                labels,
                datasets: [
                  {
                    label: 'Revenue',
                    data: data,
                    backgroundColor: 'rgba(255, 0, 0, 1)'
                  }
                  
                ],
              };
              setRevenueData(dataSource);
        } );
             },[]);
     
             const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Order Revenue',
          },
        },
      };
      

      

      return(
      <Card style={{width: 400, height: 250}}>
         <Bar options={options} data={revenueData} />
       </Card>);
};
export default Dashboard;