import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ExamineListRow from './ExamineListRow.jsx';

export default class ExamineList extends Component {

  render () {
    const row = this.props.examineList.map((row, index) => (
      <ExamineListRow
        key={index}
        option={row}
        description={row.description}
        bid={row.bid}
        ask={row.ask}
        addToSelectedTrades={this.props.addToSelectedTrades}
        currentView={this.props.currentView}
      />
    ))

    return (
      <div id="examinelist" className="col-xs-6">
        <div className="examinelist-header">
          <label>Examine List</label>
        </div>
        <table className="table table-hover table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Option</th>
              <th>Bid</th>
              <th>Ask</th>
              {this.props.currentView === 'stratView' ? <th>Quantity</th> : null}
            </tr>
          </thead>

          <tbody>
            {row}
          </tbody>
        </table>  
      </div> 
    )
  }
}

ExamineList.propTypes = {
 examineList: PropTypes.array,
 addToSelectedTrades: PropTypes.func,
 currentView: PropTypes.string
}