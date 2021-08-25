import React from 'react'

import './search.css'

const SearchBar = props => {
    return (
        <div className="container mt-3 mb-4">
            <div className="row" >
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fa fa-search"></i>
                            </div>
                        </div>
                        <input type="text"
                            className="form-control input_search"
                            aria-label="Text input with segmented dropdown button"
                            placeholder="Search"
                            value={props.value}
                            onChange={props.onChange}
                        />
                    </div>
                </div>
                <div className="col-sm-3"></div>
            </div>
        </div>
    )
}

export default SearchBar
