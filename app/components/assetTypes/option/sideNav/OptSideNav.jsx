import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class OptSideNav extends Component {
  constructor (props) {
    super(props);
    this.sideNavBtnClickHandler = this.sideNavBtnClickHandler.bind(this);
  }

  sideNavBtnClickHandler (e) {
    this.props.setCurrentViewOnSideNavClick(e.currentTarget.value);
  }

  render () {
    return (
      <div className="col-1 reset-padding" id="side-nav">
        <ul className="list-unstyled">
          <li>
            <button 
              className="btn btn-outline-info"
              type="button" 
              value="priceView" 
              onClick={this.sideNavBtnClickHandler}>
              <i className="far fa-list-alt nav-icon"></i>
            </button>
            <br/>
            Option Chain
          </li>
          <li>
            <button 
              className="btn btn-outline-info"
              type="button" 
              value="stratView" 
              onClick={this.sideNavBtnClickHandler}>
              <i className="far fa-chart-bar nav-icon"></i>
            </button>
            <br/>
            Analysis
          </li>
        </ul>
      </div>
    )
  }
}

OptSideNav.propTypes = {
  setCurrentViewOnSideNavClick: PropTypes.func
}