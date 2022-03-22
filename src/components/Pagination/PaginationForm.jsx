// import React ,{useState,useEffect} from 'react';
// import Pagination from './Pagination';
// import axios from 'axios'
// import QueryString from 'qs';
// // import queryString from 'queryString'; 
// function PaginationForm(props) {
//     const [productList, setproductList] = useState([])
//     const [pagination,setPagination]=useState({
//         _page:1,
//         _limit:10,
//         _totalRows:1,
//     })
//     const [filters,setFilters]=useState({
//         _limit:10,
//         _page:1, 
//     })
//     function handlePageChange(newPage){
//         console.log("NewPage:",newPage)
//         setFilters({ 
//             ...filters,
//             _page: newPage,
//         })
//     }
//     useEffect(() => {
//         const paramsString = QueryString.stringify(filters);  
//         const getApi = `https://api-mts.herokuapp.com/products/posts?${paramsString}`
//         axios.get(getApi).then((response) =>{
//             const {data,pagination}=response.data
//              setproductList(data);
//              setPagination(pagination); 
//         })
       
//     }, [filters])
//     return (
//         <div>
//             <Pagination
//              pagination={pagination}
//              onPageChange={handlePageChange} />
//         </div>
//     );
// }

// export default PaginationForm;