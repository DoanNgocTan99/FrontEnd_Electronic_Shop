import { Grid } from '@material-ui/core';
import customerApi from 'api/customerApi';
import Table from 'components/Table/Table';
import { formatPrice } from 'utils';
import React, { useEffect, useState } from 'react';
import 'features/Admin/components/Customer/Customer.scss';
Customer.propTypes = {};

function Customer(props) {
  const [CustomerList, setCustomerList] = useState();
  const CustomerHead = ['Name', 'Total Order', 'Total Spending'];
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.userName}</td>
      <td>{item.totalOrders}</td>
      <td>{item.totalSpending}</td>
    </tr>
  );

  useEffect(() => {
    (async () => {
      try {
        const list = await customerApi.getAll();
        setCustomerList(
          list.map((x) => ({
            userName: x.userName,
            totalOrders: x.totalOrders,
            totalSpending: formatPrice(x.totalSpending),
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

export default Customer;
