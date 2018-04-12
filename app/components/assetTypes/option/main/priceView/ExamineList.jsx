import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ExamineListRow from './ExamineListRow.jsx';

export default class ExamineList extends Component {

  render () {
    const row = this.props.examineList.map((row, index) => (
      //get the data from server
      <ExamineListRow
        key={index}
        description={row.description}
        bid={row.bid}
        ask={row.ask}
      />
    ))

    return (
      <div>
        <h3>Examine List</h3>
        <table>
          <thead>
            <tr>
              <th>Option</th>
              <th>Bid</th>
              <th>Ask</th>
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
 examineList: PropTypes.array 
}