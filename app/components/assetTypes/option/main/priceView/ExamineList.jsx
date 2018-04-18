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

    const overflow = {
      overflow: 'scroll'
    }

    return (
      <div className="col" style={overflow}>
        <div id={this.props.currentView === 'stratView' ? 'stratView-examine' : 'examinelist'}>
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
                {this.props.currentView === 'stratView' ? <th colSpan='2'>Action</th> : null}
              </tr>
            </thead>

            <tbody>
              {row}
            </tbody>
          </table> 
        </div> 
      </div> 
    )
  }
}

ExamineList.propTypes = {
 examineList: PropTypes.array,
 addToSelectedTrades: PropTypes.func,
 currentView: PropTypes.string
}