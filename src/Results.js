import React, { Component } from 'react'
import $ from 'jquery'

export default class Results extends Component {

	states1 = () => {
    let tableStates1 = (
      <table>
        <tr>
          <th className="table-title">Race</th>
        </tr>
        {this.props.state.name.map(x => (
          <tr>
            <th className="table-state">{x}</th>
          </tr>
        ))}
      </table>
    );
    return tableStates1;
  };

	states2 = () => {
		let tableStates2 = (
      <table>
        <tr>
          <th className="table-title">Household</th>
        </tr>
        {this.props.state.name.map(x => (
          <tr>
            <th className="table-state">{x}</th>
          </tr>
        ))}
      </table>
    );
    return tableStates2;
	}

	states3 = () => {
		let tableStates3 = (
      <table>
        <tr>
          <th className="table-title">Male</th>
        </tr>
        {this.props.state.name.map(x => (
          <tr>
            <th className="table-state">{x}</th>
          </tr>
        ))}
      </table>
    );
    return tableStates3;
	}

	states4 = () => {
		let tableStates4 = (
      <table>
        <tr>
          <th className="table-title">Female</th>
        </tr>
        {this.props.state.name.map(x => (
          <tr>
            <th className="table-state">{x}</th>
          </tr>
        ))}
      </table>
    );
    return tableStates4;
	}

	resultsRace = () => {
    let racesValues = [];
    for (let i = 1; i < this.props.state.response.length; i++) {
      racesValues.push(
        this.props.state.response[i].slice(
          0,
          this.props.state.labels.race.length
        )
      );
    }
    if (this.props.state.labels.race.length !== 0) {
      $(".resultsContainer1").show();
    } else {
      $(".resultsContainer1").hide();
    }
    let tableRaces = (
      <table>
        <tr>
          {this.props.state.labels.race.map(x => (
            <th className="table-parameter">{x.replace("_", " ")}</th>
          ))}
        </tr>
        {racesValues.map(state => (
          <tr>
            {state.map(value => (
              <td className="table-data">{value}</td>
            ))}
          </tr>
        ))}
      </table>
    );
    return tableRaces;
  };

	resultsSizes = () => {
    let sizeValues = [];
    for (let i = 1; i < this.props.state.response.length; i++) {
      sizeValues.push(
        this.props.state.response[i].slice(this.props.state.labels.race.length, (this.props.state.labels.race.length + this.props.state.labels.size.length))
      );
    }
		if (this.props.state.labels.size.length !== 0) {
			$('.resultsContainer2').show()
			} else {
			$('.resultsContainer2').hide()
      }
    let tableSizes = (
      <table>
        <tr>
          {this.props.state.labels.size.map(x => (
            <th className="table-parameter">{x.replace("_", " ")}</th>
          ))}
        </tr>
        {sizeValues.map(state => (
          <tr>
            {state.map(value => (
              <td className="table-data">{value}</td>
            ))}
          </tr>
        ))}
      </table>
    );
    return tableSizes;
	}

	resultsASM = () => {
    let ASMValues = [];
    for (let i = 1; i < this.props.state.response.length; i++) {
      ASMValues.push(
        this.props.state.response[i].slice((this.props.state.labels.race.length + this.props.state.labels.size.length), (this.props.state.labels.race.length + this.props.state.labels.size.length + this.props.state.labels.ASM.length))
      );
    }
		if (this.props.state.labels.ASM.length !== 0) {
			$('.resultsContainer3').show()
			} else {
			$('.resultsContainer3').hide()
    }
    let tableASM = (
      <table>
        <tr>
          {this.props.state.labels.ASM.map(x => (
            <th className="table-parameter">{x.replace("_", " ")}</th>
          ))}
        </tr>
        {ASMValues.map(state => (
          <tr>
            {state.map(value => (
              <td className="table-data">{value}</td>
            ))}
          </tr>
        ))}
      </table>
    );
    return tableASM;
	}

	resultsASF = () => {
    let ASFValues = [];
    for (let i = 1; i < this.props.state.response.length; i++) {
      ASFValues.push(
        this.props.state.response[i].slice((this.props.state.labels.race.length + this.props.state.labels.size.length), (this.props.state.labels.race.length + this.props.state.labels.size.length + this.props.state.labels.ASM.length))
      );
    }
		if (this.props.state.labels.ASF.length !== 0) {
			$('.resultsContainer4').show()
			} else {
			$('.resultsContainer4').hide()
      }
    let tableASF = (
      <table>
        <tr>
          {this.props.state.labels.ASF.map(x => (
            <th className="table-parameter">{x.replace("_", " ")}</th>
          ))}
        </tr>
        {ASFValues.map(state => (
          <tr>
            {state.map(value => (
              <td className="table-data">{value}</td>
            ))}
          </tr>
        ))}
      </table>
    );
    return tableASF;
	}

	render() {
		return (
			<>
				<div className="resultsContainer1">
					<div className="resultsStates1">{this.states1()}</div>
					<div className="resultsRaces">{this.resultsRace()}</div>
				</div>
				<div className="resultsContainer2">
					<div className="resultsStates2">{this.states2()}</div>
					<div className="resultsSizes">{this.resultsSizes()}</div>
				</div>
				<div className="resultsContainer3">
					<div className="resultsStates3">{this.states3()}</div>
					<div className="resultsASM">{this.resultsASM()}</div>
				</div>
				<div className="resultsContainer4">
					<div className="resultsStates4">{this.states4()}</div>
					<div className="resultsASF">{this.resultsASF()}</div>
				</div>
				<div className="resultsContainer5">
					<div className="resultsStates5"></div>
					<div className="resultsHousehold"></div>
				</div>
				{/* <button onClick={console.log('')}>generate</button> */}
			</>
		)
	}
}