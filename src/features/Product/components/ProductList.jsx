import { formatPrice } from 'utils';
import styles from '../product.module.css';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
ProductList.propTypes = {
  data: PropTypes.array,
};
function ProductList({ data=[]}) {
  return (
    <div className={styles.grid__column10}>
            <div className={styles.home__product}> 
                <div className={styles.grid__row}>       
                        {data.map((item, index)=>(
                        <div className={styles.grid__column24} key={`${item}_${index}`}>     
                            <Link to={`/productDetails/${item.id}`} className={styles.home__productitems}>
                              <div className={styles.home__productitemsimg} style={{backgroundImage: `url("${item.path}")`}}>
                                {/* <img src={item.path} alt ='hinh1'/> */}
                                </div>
                                <h4 className={styles.home__productitemsname}>{item.name}</h4>
                                <div className={styles.home__productprice}>
                                    <span className={styles.home__productitemsprice}>{formatPrice(item.product_Price)}</span>
                                    <div className={styles.btn_cart}>
                                    <i className="fas fa-search"></i>
                                     Details</div>
                                </div>
                            </Link>
                        </div>    
                        ))} 
                   
                </div>
              </div>
            </div>
  );
}
export default ProductList;
