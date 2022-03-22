import React,{ useEffect,useState } from 'react';
import ProductInfor from './components/ProductInfor/ProductInfor';
import {Link} from "react-router-dom"
import ProductRelated from './components/ProductRelated/ProductRelated'
import styles from './ProductDetail.module.css'
import NavBar from './components/Navbar/NavBar';
import Footer from 'features/Product/components/Footer/Footer';
import ClipLoader from "react-spinners/ClipLoader";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useHistory} from 'react-router-dom';
import StorageUser from 'constants/storage-user';
function ProductDetail(props) {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    useEffect(() => {
     setLoading(true)
     setTimeout(()=>{
       setLoading(false)
     },2000)
    }, [])
    const [product, setproduct] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        const token = localStorage.getItem(StorageUser.TOKEN);
        if (!token) {
          history.replace('/login1');
        }
      });
   
  useEffect(() => {
    if (id) {
        const getApi = `https://api-mts.herokuapp.com/products/${id}`;
        axios.get(getApi).then((response) => {
            setproduct(response.data);
        });
    }
}, [id]);
    return (
        <React.Fragment>
             {
            loading?
            <div className={styles.sweet_loading}>
            <ClipLoader
            color={"#F5A623"} 
            loading={loading} 
            // css={override} 
            size={40} />
            <span>Please Wait</span>
          </div>
            :
        <React.Fragment>
        <NavBar/>
        <div className={styles.container_productDetails}>
                <div className={styles.grid__row}>
                    <div className={styles.grid__column5  }>
                        <div className={styles.back_btn}>
                            <Link to={"/"} className= {styles.btn_back}>
                            <i class="fas fa-arrow-left"></i>
                            Back</Link>
                        </div>
                        <img src={product?.productThumbnail} alt="" className={styles.product_img} />
                    </div>
                    <div className={styles.grid__column5} ><ProductInfor/></div>
                    <div className= {styles.RelatedWapper}><ProductRelated/></div>
                </div>
         </div>
         <Footer/>
        </React.Fragment>
        }
        </React.Fragment>
    );
}

export default ProductDetail;
