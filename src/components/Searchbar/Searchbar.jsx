import React, { Component } from 'react';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = { query: '' };

  handleOnChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    if (!this.state.query.trim()) {
      return;
    }
    this.props.submit(this.state.query);
    this.setState({ query: '' });
  };
  render() {
    return (
      <header className={css.searchbar}>
        <form onSubmit={this.handleSubmit} className={css.searchForm}>
          <button type="submit" className={css.search_button}>
            <span className={css.search_button_label}>Search</span>
          </button>

          <input
            className={css.search_input}
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleOnChange}
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;
