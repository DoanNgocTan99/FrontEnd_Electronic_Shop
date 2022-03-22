import React from 'react';
import PropTypes from 'prop-types';

Pagination.propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func,
};
Pagination.defaultProps={
    onPageChange:null,
}
function Pagination(props) {
    const {pagination,onPageChange} = props;
    const {_start,_limit,_totalRows} =pagination;
    const totalPages = Math.ceil(_totalRows /_limit)
    function handlePageChange(newPage){
        if(onPageChange){
            onPageChange(newPage);
        }
    }
    return (
        <div>
            <button
            disabled={_start<=1}
            onClick={()=> handlePageChange(_start-1)}
            >
                Prew
            </button>
            <button
            disabled={_start>=totalPages}
            onClick={()=> handlePageChange(_start+ 1)}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;