const SearchForm = (props) => {
    const handleChange = (e) => {
        props.setSearchTerm(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (props.searchTerm.trim() === '') {
            props.setError("Search term can't be empty.");
            return;
        }
        props.handleFormSubmit(e);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Search" value={props.searchTerm} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary">Search</button>
        </form>
    );
}
export default SearchForm;