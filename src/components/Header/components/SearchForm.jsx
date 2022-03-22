
function SearchForm(props) {
    function handleSearchTermChange(e){
    } 
    return (
             <form className="searchBox">
                <input type="" 
                placeholder="Type for search" 
                className="inputSearch"
                onChange={(e) => handleSearchTermChange(e)}>
                </input>
                <button type="submit" className="btn btn-find">
                    <i class="fas fa-search"></i>
                </button>   
            </form>
    );
}

export default SearchForm;