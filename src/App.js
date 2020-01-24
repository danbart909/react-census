import React, { Component } from 'react'
import Map from './Map'
import Checkboxes from './Checkboxes'
import Results from './Results'
import options from './options'
import $ from 'jquery'

export default class App extends Component {
  constructor(props) {
    super (props)
    this.state = {
      id: [],
      name: [],
      labels: {
        race: [],
        size: [],
        ASM: [],
        ASF: []
      },
      response: ''
    }
  }

  submit2 = (e) => {

    e.preventDefault()
    console.log(e)
    console.log(e.target)
    let APIKey = "12ba7d01dfe85e9b84c731fceefc830022291a8f";
    let endpoint = "https://api.census.gov/data/2010/dec/sf1?";

    let raceNamesA = []
    let raceValuesA = []
    let sizeNamesA = []
    let sizeValuesA = []
    let ASMNamesA = []
    let ASMValuesA = []
    let ASFNamesA = []
    let ASFValuesA = []

    for (const [i, x] of Object.entries(e.target)) {
      if ((x.checked === true) && (x.name === 'race')) {
        raceNamesA.push(x.id)
        raceValuesA.push(x.value)
      } if ((x.checked === true) && (x.name === 'size')) {
        sizeNamesA.push(x.id)
        sizeValuesA.push(x.value)
      } if ((x.checked === true) && (x.name === 'ASM')) {
        ASMNamesA.push(x.id)
        ASMValuesA.push(x.value)
      } if ((x.checked === true) && (x.name === 'ASF')) {
        ASFNamesA.push(x.id)
        ASFValuesA.push(x.value)
      }
    }

    console.log(this.state, raceNamesA, raceValuesA, sizeNamesA, sizeValuesA, ASMNamesA, ASMValuesA, ASFNamesA, ASFValuesA)

    let checkboxValuesURL = raceValuesA.concat(sizeValuesA, ASMValuesA, ASFValuesA).join(',')
    let stateValuesURL = this.state.id.sort(function(a, b){return a-b}).join(',')

    let url = `${endpoint}get=${checkboxValuesURL}&for=state:${stateValuesURL}&key=${APIKey}`

    console.log(checkboxValuesURL, stateValuesURL, url)

    if (!this.state.id) {
    alert('Please choose a state!');
    } else if (!checkboxValuesURL) {
      alert(`Please check one of the checkboxes.`);    
    } else {
      fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        };
        throw new Error(response.statusText);
      })
      .then(responseJson =>
        this.displayResults2(responseJson, raceNamesA, sizeNamesA, ASMNamesA, ASFNamesA))
      .catch(error => console.log(error));
    }
  }


  displayResults2 = (responseJson, raceNamesA, sizeNamesA, ASMNamesA, ASFNamesA) => {
    console.log(responseJson, raceNamesA, sizeNamesA, ASMNamesA, ASFNamesA)
    $('.resultsContainer').show()
    this.setState({
      labels: {
        race: raceNamesA,
        size: sizeNamesA,
        ASM: ASMNamesA,
        ASF: ASFNamesA
      },
      response: responseJson
    })
    console.log(this.state)
  }

  clickAdd = (e) => {
		const id = e.target.attributes[0].value
		const name = e.target.attributes[1].value
    const stateIdArray = this.state.id
    const stateNameArray = this.state.name
		const newIdArray = stateIdArray.concat(id);
    const newNameArray = stateNameArray.concat(name)

    this.setState({
      id: newIdArray,
      name: newNameArray
    })

		console.log('add', id, name, this.state)
    console.log(newIdArray, newNameArray)
	}

  clickRemove = (e) => {
    const id = e.target.attributes[0].value
		const name = e.target.attributes[1].value
    const stateIdArray = this.state.id
    const stateNameArray = this.state.name
    const newIdArray = stateIdArray.filter(x => x !== id)
    const newNameArray = stateNameArray.filter(x => x !== name)

    this.setState({
      id: newIdArray,
      name: newNameArray
    })

    console.log('remove', id, name, this.state)
    console.log(newIdArray, newNameArray)
	}

  render() {
    return (
      <>
        <section className="map-container">
          <Map
            clickAdd={this.clickAdd}
            clickRemove={this.clickRemove}
          />
        </section>
        <section className="resultsContainer hidden">
          <Results
            state={this.state}
          />
        </section>
        <section className="checkbox-container">
          <Checkboxes
            submit={this.submit}
            submit2={this.submit2}
          />
        </section>
      </>
    )
  }
}


















// submit = (e) => {
//   e.preventDefault()
//   console.log(options, e, e.target)
//   let APIKey = "12ba7d01dfe85e9b84c731fceefc830022291a8f";
//   let endpoint = "https://api.census.gov/data/2010/dec/sf1?";
//   let checkedState = [];
//   let whichState = [];
//   $('path').each(function () {
//     if ($(this).attr("fill") === "red") {
//       whichState.push($(this).data("name"));
//       checkedState.push($(this).data("id"));
//     }
//   });
//   $('circle').each(function () {
//     if ($(this).attr("fill") === "red") {
//       whichState.push($(this).data("name"));
//       checkedState.push($(this).data("id"));
//     }
//   });
//   if ($('path[id=path67]').attr("fill") === "red") {
//     whichState = whichState.slice(0, -1);
//     checkedState = checkedState.slice(0, -1);
//   }
//   console.log(whichState, checkedState)

//   let whichStateSorted = whichState.sort();
//   let checkedStateSorted = checkedState.sort(function(a, b){return a-b});
//   let stateID = checkedStateSorted.join(",");

//   let checkedRace = [];
//   let whichRace = [];
//   $('input[name=race]:checked').each(function () {
//     checkedRace.push($(this).val());
//     whichRace.push($(this).attr("id"));
//   });
//   let raceID = checkedRace.join(",");

//   let checkedSizes = [];
//   let whichSizes = [];
//   $('input[name=size]:checked').each(function () {
//     checkedSizes.push($(this).val());
//     whichSizes.push($(this).attr("id"));
//   });
//   let sizeID = checkedSizes.join(",");

//   let checkedAS = [];
//   let whichAS = [];
//   $('input[name=AS]:checked').each(function () {
//     checkedAS.push($(this).val());
//     whichAS.push($(this).attr("id"));
//   });
//   let ASID = checkedAS.join(",");

//   let checkedASM = [];
//   let whichASM = [];
//   $('input[name=ASM]:checked').each(function () {
//     checkedASM.push($(this).val());
//     whichASM.push($(this).attr("id"));
//   });
//   let ASMID = checkedASM.join(",");

//   let checkedASF = [];
//   let whichASF = [];
//   $('input[name=ASF]:checked').each(function () {
//     checkedASF.push($(this).val());
//     whichASF.push($(this).attr("id"));
//   });
//   let ASFID = checkedASF.join(",");

//   let numCheckedRaces = $('input[name=race]:checked').length;
//   let numCheckedSizes = $('input[name=size]:checked').length;
//   let numCheckedAS = $('input[name=AS]:checked').length;
//   let numCheckedASM = $('input[name=ASM]:checked').length;
//   let numCheckedASF = $('input[name=ASF]:checked').length;

//   let comma = "";
//   if (numCheckedRaces !== 0 && (numCheckedSizes !== 0 || numCheckedAS !== 0 || numCheckedASM !== 0 || numCheckedASF !==0)) {
//     comma += ",";
//   }

//   let comma2 = "";
//   if (numCheckedSizes !== 0 && (numCheckedAS !== 0 || numCheckedASM !== 0 || numCheckedASF !==0)) {
//     comma2 += ",";
//   }

//   let comma3 = "";
//   if (numCheckedAS !== 0 && (numCheckedASM !== 0 || numCheckedASF !==0)) {
//     comma3 += ",";
//   }

//   let comma4 = "";
//   if (numCheckedASM !== 0 && (numCheckedASF !==0)) {
//     comma4 += ",";
//   }

//   let url = `${endpoint}get=${raceID}${comma}${sizeID}${comma2}${ASID}${comma3}${ASMID}${comma4}${ASFID}&for=state:${stateID}&key=${APIKey}`;
//   console.log(url, raceID, sizeID, ASID, ASMID, ASFID)

//   if (stateID === "") {
//   alert('Please choose a state!');
//   } else if (numCheckedRaces === 0 && numCheckedSizes === 0 && numCheckedAS === 0 && numCheckedASM === 0 && numCheckedASF === 0) {
//     alert(`Please check one of the checkboxes.`);    
//   } else {
//     fetch(url)
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       };
//       throw new Error(response.statusText);
//     })
//     .then(responseJson =>
//       this.displayResults(responseJson, whichStateSorted, whichRace, whichSizes, whichASM, whichASF, numCheckedRaces, numCheckedSizes, numCheckedAS, numCheckedASM, numCheckedASF))
//     .catch(error => console.log(error));
//   }
// }

// displayResults = (responseJson, whichStateSorted, whichRace, whichSizes, whichASM, whichASF, numCheckedRaces, numCheckedSizes, numCheckedAS, numCheckedASM, numCheckedASF) => {
//   console.log(responseJson)
//   $('.resultsContainer').removeClass("hidden");
//   $('.resultsStates1').empty();
//   $('.resultsStates2').empty();
//   $('.resultsStates3').empty();
//   $('.resultsStates4').empty();
//   $('.resultsStates5').empty();
//   $('.resultsRaces').empty();
//   $('.resultsSizes').empty();
//   $('.resultsASM').empty();
//   $('.resultsASF').empty();
  
//   let tableRaces = `<table><tr>`;
//   let tableSizes = `<table><tr>`;
//   let tableASM = `<table><tr>`;
//   let tableASF = `<table><tr>`;

//   let tableStates1 = `<table><tr><th class="table-title">Race</th></tr>`;
//   let tableStates2 = `<table><tr><th class="table-title">Family Size</th></tr>`;
//   let tableStates3 = `<table><tr><th class="table-title">Age(M)</th></tr>`;
//   let tableStates4 = `<table><tr><th class="table-title">Age(F)</th></tr>`;

//   $.map(whichStateSorted, function(k) {
//     tableStates1 += `<tr><th class="table-state">${k}</th></tr>`;
//     tableStates2 += `<tr><th class="table-state">${k}</th></tr>`;
//     tableStates3 += `<tr><th class="table-state">${k}</th></tr>`;
//     tableStates4 += `<tr><th class="table-state">${k}</th></tr>`;
//   });
//   $.map(whichRace, function(n) {
//     tableRaces += `<th class="table-parameter">${n.replace("_", " ")}</th>`;
//   });
//   $.map(whichSizes, function(u) {
//     tableSizes += `<th class="table-parameter">${u.replace("_", " ")}</th>`;
//   });
//   $.map(whichASM, function(y) {
//     tableASM += `<th class="table-parameter">${y.replace("_", " ")}</th>`;
//   });
//   $.map(whichASF, function(z) {
//     tableASF += `<th class="table-parameter">${z.replace("_", " ")}</th>`;
//   });

//   tableRaces += `</tr>`;
//   tableSizes += `</tr>`;
//   tableASM += `</tr>`;
//   tableASF += `</tr>`;

//   function numberWithCommas(x) {
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   }

//   let numCheckedRacesSizes = (numCheckedRaces + numCheckedSizes);
//   let numCheckedRacesSizesAS = (numCheckedRacesSizes + numCheckedAS);
//   let numCheckedRacesSizesASASM = (numCheckedRacesSizesAS + numCheckedASM);

//   let racesValues = [];
//   let sizesValues = [];
//   let ASValues = [];
//   let ASMValues = [];
//   let ASFValues = [];

//   for (let i = 1; i < responseJson.length; i++) {
//     let response = responseJson[i];
//     racesValues.push(response.slice(0, numCheckedRaces))
//     sizesValues.push(response.slice(numCheckedRaces, numCheckedRacesSizes))
//     ASValues.push(response.slice(numCheckedRacesSizes, numCheckedRacesSizesAS));
//     ASMValues.push(response.slice(numCheckedRacesSizesAS, numCheckedRacesSizesASASM));
//     ASFValues.push(response.slice(numCheckedRacesSizesASASM, -1));
//   };

//   for (let i = 0; i < racesValues.length; i++) {
//     tableRaces += `<tr>${racesValues[i].map(h => `<td class="table-data">${numberWithCommas(h)}</td>`).join('')}</tr>`;
//   }
  
//   for (let i = 0; i < sizesValues.length; i++) {
//     tableSizes += `<tr>${sizesValues[i].map(p => `<td class="table-data">${numberWithCommas(p)}</td>`).join('')}</tr>`;
//   }

//   for (let i = 0; i < ASMValues.length; i++) {
//     tableASM += `<tr>${ASMValues[i].map(r => `<td class="table-data">${numberWithCommas(r)}</td>`).join('')}</tr>`;
//   }

//   for (let i = 0; i < ASFValues.length; i++) {
//     tableASF += `<tr>${ASFValues[i].map(r => `<td class="table-data">${numberWithCommas(r)}</td>`).join('')}</tr>`;
//   }

//   tableRaces += `</table>`;
//   tableStates1 += `</table>`;
//   tableStates2 += `</table>`;
//   tableStates3 += `</table>`;
//   tableStates4 += `</table>`;
//   tableSizes += `</table>`;
//   tableASM += `</table>`;
//   tableASF += `</table>`;

//   if (numCheckedRaces !== 0) {
//     $('.resultsContainer1').show();
//   } else {
//     $('.resultsContainer1').hide();
//   }

//   if (numCheckedSizes !== 0) {
//     $('.resultsContainer2').show();
//   } else {
//     $('.resultsContainer2').hide()
//   }
  
//   if (numCheckedASM !== 0) {
//     $('.resultsContainer3').show();
//   } else {
//     $('.resultsContainer3').hide()
//   }

//   if (numCheckedASF !== 0) {
//     $('.resultsContainer4').show();
//   } else {
//     $('.resultsContainer4').hide()
//   }

//   $('.resultsRaces').append(tableRaces);
//   $('.resultsStates1').append(tableStates1);
//   $('.resultsStates2').append(tableStates2);
//   $('.resultsStates3').append(tableStates3);
//   $('.resultsStates4').append(tableStates4);
//   $('.resultsSizes').append(tableSizes);
//   $('.resultsASM').append(tableASM);
//   $('.resultsASF').append(tableASF);
// }