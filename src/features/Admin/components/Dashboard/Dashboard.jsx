import { Button, Grid, Snackbar } from '@material-ui/core';
import StatusCard from 'components/StatusCard/StatusCard';
import Table from 'components/Table/Table';
import Chart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import { formatPrice } from 'utils';
import './Dashboard.scss';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

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
    <td>{item.userName}</td>
    <td>{item.totalOrders}</td>
    <td>{formatPrice(item.totalSpending)}</td>
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
  Unknown: 'default',
};

const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td>{item.orderId}</td>
    <td>{item.userName}</td>
    <td>{item.date}</td>
    <td>{formatPrice(item.totalPrice)}</td>
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
  const [statistical, setStatistical] = useState([]);
  const [topCustome, setTopCustome] = useState();
  const [latestOrder, setLatestOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = {
      fromDate: fromDate,
      toDate: toDate,
    };
    const exportExcel =
      'http://tandn97-001-site1.itempurl.com/Statistical/GetFileExcel';
    axios.post(exportExcel, value).then((response) => {
      setOpen(true);
    });
  };
  const onChangeFromDate = (e) => {
    setFromDate(e.target.value);
  };
  const onChangeToDate = (e) => {
    setToDate(e.target.value);
  };
  useEffect(() => {
    const getApi = 'http://tandn97-001-site1.itempurl.com/Statistical';
    axios.get(getApi).then((response) => {
      setStatistical(response.data);
    });

    const getApiTopCustomes =
      'http://tandn97-001-site1.itempurl.com/Statistical/GetTopCustomers';
    axios.get(getApiTopCustomes).then((response) => {
      setTopCustome(response.data);
    });

    const getApiLatestOrders =
      'http://tandn97-001-site1.itempurl.com/Statistical/GetLatestOrders';
    axios.get(getApiLatestOrders).then((response) => {
      setLatestOrders(response.data);
    });
  }, []);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <div className="dashboard">
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        {open && (
          <Alert onClose={handleClose} severity="success">
            Download excel thành công!!!
          </Alert>
        )}
      </Snackbar>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <h5 className="div_left_cus">From</h5>
          <input
            className="div_left"
            type="date"
            name="name"
            onChange={onChangeFromDate}
          />
          <h5 className="div_left_cus">To</h5>
          <input
            className="div_left"
            type="date"
            name="name"
            onChange={onChangeToDate}
          />
        </div>
        <button className="top-bar__button">Export Excel</button>
      </form>

      <Grid container spacing={3}>
        <Grid item lg={6} xs={12}>
          <Grid container spacing={3}>
            {statistical.map((item, index) => (
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
                bodyData={topCustome}
                renderBody={(item, index) => renderCustomerBody(item, index)}
              />
            </div>
            <div className="dashboard__card__footer">
              <Link to="/admin/Customer">view all</Link>
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
                bodyData={latestOrder}
                renderBody={(item, index) => renderOrderBody(item, index)}
              />
            </div>
            <div className="dashboard__card__footer">
              <Link to="/admin/orders">view all</Link>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
