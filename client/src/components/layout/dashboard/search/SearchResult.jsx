import React from 'react';
import { ListItem, Button } from '../../../commonViews';

const SearchResult = ({ foundUsers, handleAddMember }) =>
  <section className="search-result">
    {
      foundUsers.map((foundUser, index) =>
        <div key={index}>
          <ListItem key={index}
          name={foundUser.username}
          iconClass="fa fa-user"
          listClass="result-item"
          />
          <Button
            onClick={() => handleAddMember(foundUser)}
            btnClass="btn btn-create right"
            name="Add"
          />
        </div>
      )
    }
  </section>;

export default SearchResult;
