import React from 'react';
const SearchResult = () => {
    return (
      <section className="search-result">
        <ResultItem/>
      </section>
    );
}

const ResultItem = () => {
    return (        
        <div>
            <li>Francis</li>
        </div>
    );
}

export default SearchResult;