import * as React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

let base = localStorage.getItem("base");
let target = localStorage.getItem("target");
let input = localStorage.getItem("input");
let newRate;
if (base !== "" && target !== "" && input !== 0) {
  try {
    axios.get(`https://api.apilayer.com/exchangerates_data/convert?to=${base}&from=${target}&amount=${input}&apikey=mAPyiFeELrblYbZn8pNyAvtrBi0TWylx`)
    .then(response => response.data).then(data => {
        let rate = JSON.stringify(data);
        newRate = rate.substring(rate.indexOf("\"rate\":") + 7, rate.indexOf("\"date\":") - 2);
        localStorage.setItem("rate", newRate);
    })
  } catch (error) {

  }
}
let rate = localStorage.getItem("rate");

export default class SumExTable extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: {base, target, rate},
      rows: []
    }
  }
  clicks = 0;
  updateTable(event) {
    this.setState({
      data: event.target.value
    });
  }
  
  handleClick() {
    this.clicks++;
    if (base !== "" && target !== "" && input !== 0 && this.clicks === 1) {
    var rows = this.state.rows;
  
    rows.push(this.state.data);
  
    this.setState({
      rows: [...rows]
    });
    this.clicks++;
    } else if (base === "" && target === "" && (input !== 0 || input === null) && this.clicks === 1) {
      alert("You haven't exchanged anything yet.");
    }
  }
  
  renderRows() {
    let date = new Date();
    return  this.state.rows.map(function(o, i) {
      return (
        <tr key={"item-" + i}>
          <td>
            <center>{base}</center>
          </td>
          <td>
            <center>{target}</center>
          </td>
          <td>
            <center>{rate}</center>
          </td>
          <td>
            <center>{date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear()}</center>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <center><Button 
        onClick={this.handleClick.bind(this)} 
        color="warning" 
        onChange={this.updateTable.bind(this)}
        variant="outlined"
        >
          Click To See Most Recent Exchange Rate
        </Button></center>
        <br></br>
        <br></br>
        <table border='solid' width={800}>
          <thead>
            <tr>
              <th>Base Currency</th>
              <th>Target Currency</th>
              <th>Rate</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

