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
                        {data.map((item)=>(
                        <div className={styles.grid__column24}>     
                            <Link to={`/productDetails/${item.id}`} className={styles.home__productitems}>
                                <div className={styles.home__productitemsimg} style={{ backgroundImage: `url(${item.productThumbnail})` }}></div>
                                <h4 className={styles.home__productitemsname}>{item.productName}</h4>
                                <div className={styles.home__productprice}>
                                    <span className={styles.home__productitemsprice}>{formatPrice(item.salePrice)}</span>
                                    <div className={styles.btn_cart}>
                                    <i class="fas fa-search"></i>
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
