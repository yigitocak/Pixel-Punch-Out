import "./SearchResultsPage.scss";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/utils";
import { SearchResultsItem } from "../../Components/SearchResultsItem/SearchResultsItem";

export const SearchResultsPage = ({ setQueryParam }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  let query = queryParams.get("query");

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}profiles`);
      if (response && response.data) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (query) {
      const searchQuery = query.toLowerCase().replace(" ", "");
      const matchedUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchQuery),
      );
      setFilteredUsers(matchedUsers);
    }
  }, [query, users]);

  return (
    <section className="result">
      <h1 className="result__title">Search Results</h1>
      {filteredUsers.length ? (
        <ul className="result__list">
          {filteredUsers.map((user) => (
            <SearchResultsItem user={user} />
          ))}
        </ul>
      ) : (
        <div className="result__error">No user found!</div>
      )}
    </section>
  );
};
