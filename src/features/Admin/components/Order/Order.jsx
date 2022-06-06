import { Grid } from '@material-ui/core';
import customerApi from 'api/customerApi';
import Table from 'components/Table/Table';
import { formatPrice } from 'utils';
import React, { useEffect, useState } from 'react';
import './Order.scss';

Order.propTypes = {};

function Order(props) {
  const [CustomerList, setCustomerList] = useState();
  const CustomerHead = ['orderId', 'User name', 'Date', 'totalPrice', 'status'];
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.orderId}</td>
      <td>{item.userName}</td>
      <td>{item.date}</td>
      <td>{item.totalPrice}</td>
      <td>{item.status}</td>
    </tr>
  );

  useEffect(() => {
    (async () => {
      try {
        const list = await customerApi.getFullLatestOrders();
        setCustomerList(
          list.map((x) => ({
            orderId: x.orderId,
            userName: x.userName,
            date: x.date,
            totalPrice: formatPrice(x.totalPrice),
            status: x.status
          }))
        );
        console.log(list);
      } catch (error) {
        console.log('Failed to fetch Customer list', error);
      }
    })();
  }, []);

  return (
    <div className="customer">
      <h3 className="customer__header">Customers</h3>
      <Grid container>
        <Grid item lg={12} xs={12}>
          <div className="customer__card">
            <div className="customer__card__body">
              <Table
                headData={CustomerHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={CustomerList}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Order;
