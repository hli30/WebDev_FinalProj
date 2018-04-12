import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class OptSideNav extends Component {
  constructor (props) {
    super(props);
    this.sideNavBtnClickHandler = this.sideNavBtnClickHandler.bind(this);
  }

  sideNavBtnClickHandler (e) {
    this.props.setCurrentViewOnSideNavClick(e.target.value);
  }

  render () {
    return (
      <nav>
        <p>sidenav</p>
        <button type="button" value="priceView" onClick={this.sideNavBtnClickHandler}>priceView</button>
        <button type="button" value="stratView" onClick={this.sideNavBtnClickHandler}>stratView</button>
      </nav>
    )
  }
}

OptSideNav.propTypes = {
  setCurrentViewOnSideNavClick: PropTypes.func
}