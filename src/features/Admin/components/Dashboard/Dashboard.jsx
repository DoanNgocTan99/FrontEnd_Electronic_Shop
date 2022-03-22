import { Button, Grid } from '@material-ui/core';
import statusCards from 'assets/data/card-data.json';
import StatusCard from 'components/StatusCard/StatusCard';
import Table from 'components/Table/Table';
import React from 'react';
import Chart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import { formatPrice } from 'utils';
import './Dashboard.scss';

const chartOptions = {
  series: [
    {
      name: 'Online',
      data: [40, 70, 20, 90, 36, 80, 30, 91, 60, 20],
    },
    {
      name: 'Store',
      data: [50, 30, 70, 80, 40, 16, 40, 20, 51, 10],
    },
  ],
  options: {
    color: ['#6ab04c', '#2980b9'],
    chart: {
      background: 'transparent',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
      ],
    },
    legend: {
      position: 'top',
    },
    grid: {
      show: false,
    },
  },
};

const topCustomers = {
  header: ['user', 'total orders', 'total spending'],
  body: [
    {
      username: 'frank lampard',
      order: '490',
      price: formatPrice(35000000),
    },
    {
      username: 'didier drogba',
      order: '250',
      price: formatPrice(22000000),
    },
    {
      username: 'ashley cole',
      order: '120',
      price: formatPrice(21000000),
    },
    {
      username: 'john terry',
      order: '110',
      price: formatPrice(16000000),
    },
    {
      username: 'pert cech',
      order: '80',
      price: formatPrice(12000000),
    },
  ],
};

const renderCustomerHead = (item, index) => <th key={index}>{item}</th>;

const renderCustomerBody = (item, index) => (
  <tr key={index}>
    <td>{item.username}</td>
    <td>{item.order}</td>
    <td>{item.price}</td>
  </tr>
);

const latestOrders = {
  header: ['order ID', 'user', 'date', 'total price', 'status'],
  body: [
    {
      id: '#OD1716',
      user: 'frank lampard',
      date: '21 Jul 2021',
      price: formatPrice(400000),
      status: 'shipping',
    },
    {
      id: '#OD1715',
      user: 'pert cech',
      date: '19 Jul 2021',
      price: formatPrice(100000),
      status: 'paid',
    },
    {
      id: '#OD1714',
      user: 'didier drogba',
      date: '15 Jul 2021',
      price: formatPrice(150000),
      status: 'pending',
    },
    {
      id: '#OD1713',
      user: 'pert cech',
      date: '12 Jul 2021',
      price: formatPrice(177000),
      status: 'paid',
    },
    {
      id: '#OD1712',
      user: 'john terry',
      date: '25 Jun 2021',
      price: formatPrice(280000),
      status: 'refund',
    },
  ],
};

const orderStatus = {
  shipping: 'primary',
  pending: 'secondary',
  paid: 'default',
  refund: 'secondary',
};

const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.user}</td>
    <td>{item.date}</td>
    <td>{item.price}</td>
    <td>
      <Button
        variant="contained"
        onClick={() => console.log(orderStatus[item.status])}
        color={orderStatus[item.status]}
        size="small"
      >
        {item.status}
      </Button>
    </td>
  </tr>
);

function Dashboard() {
  return (
    <div className="dashboard">
      <h3 className="dashboard__header">Dashboard</h3>
      <Grid container spacing={3}>
        <Grid item lg={6} xs={12}>
          <Grid container spacing={3}>
            {statusCards.map((item, index) => (
              <Grid item lg={6} xs={6}>
                <StatusCard
                  icon={item.icon}
                  count={item.count}
                  title={item.title}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item lg={6} xs={12}>
          <div className="dashboard__card dashboard__full-height">
            <Chart
              options={chartOptions.options}
              series={chartOptions.series}
              type="line"
              height="100%"
            />
          </div>
        </Grid>
        <Grid item lg={4} xs={12}>
          <div className="dashboard__card">
            <div className="dashboard__card__header">
              <h3>top customers</h3>
            </div>
            <div className="dashboard__card__body">
              <Table
                headData={topCustomers.header}
                renderHead={(item, index) => renderCustomerHead(item, index)}
                bodyData={topCustomers.body}
                renderBody={(item, index) => renderCustomerBody(item, index)}
              />
            </div>
            <div className="dashboard__card__footer">
              <Link to="/admin">view all</Link>
            </div>
          </div>
        </Grid>
        <Grid item lg={8} xs={12}>
          <div className="dashboard__card">
            <div className="dashboard__card__header">
              <h3>latest orders</h3>
            </div>
            <div className="dashboard__card__body">
              <Table
                headData={latestOrders.header}
                renderHead={(item, index) => renderOrderHead(item, index)}
                bodyData={latestOrders.body}
                renderBody={(item, index) => renderOrderBody(item, index)}
              />
            </div>
            <div className="dashboard__card__footer">
              <Link to="/admin">view all</Link>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
