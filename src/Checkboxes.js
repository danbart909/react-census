import React, { Component } from 'react'
import options from './options'
// import ReactHtmlParser from 'react-html-parser'
import $ from 'jquery'

export default class Checkboxes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raceShow: true,
      sizeShow: true,
      ageShow: true,
      ageMaleShow: true,
      ageFemaleShow: true
    };
  }

	raceTop = () => {
    let x = options[0]
    let raceHTML = []
		raceHTML.push(
			<>
				<span className='plussign2' onClick={() => {this.collapseExpand2()}}>+</span>
				<input id={x.id} type='checkbox' name={x.name} value={x.value} />
				<label htmlFor={x.id}><b>Race/Ethnicity</b></label>
			</>
		)
		return raceHTML
	}

	race = () => {
		let properties = options[0].options
		let raceHTML = []
		for (const [i, x] of Object.entries(properties)) {
			raceHTML.push(
				<li className='checkboxchild2' key={i}>
					<input id={x.id} type='checkbox' name={x.name} value={x.value}/>
					<label htmlFor={x.id}>{x.label}</label>
				</li>
			)
		}

		return raceHTML
	}

	sizeTop = () => {
		let x = options[1]
		let sizeHTML = []
		sizeHTML.push(
			<>
				<span className='plussign3' onClick={() => {this.collapseExpand3()}}>+</span>
				<input id={x.id} type='checkbox' name={x.name} value={x.value} />
				<label htmlFor={x.id}><b>Household Size</b></label>
			</>
		)
		return sizeHTML
	}

	size = () => {
		let properties = options[1].options
		let sizeHTML = []
		for (const [i, x] of Object.entries(properties)) {
			sizeHTML.push(
				<li className='checkboxchild3'key={i}>
					<input id={x.id} type='checkbox' name={x.name} value={x.value}/>
					<label htmlFor={x.id}>{x.label}</label>
				</li>
			)
		}
		return sizeHTML
	}

	all = () => {
		let x = options[2]
		let genderHTML = []
		genderHTML.push(
			<>
				<span className='plussign4' onClick={() => {this.collapseExpand4()}}>+</span>
				<input id={x.id} type='checkbox' name={x.name} value={x.value} />
				<label htmlFor={x.id}><b>All Ages</b></label>
			</>
		)
		return genderHTML
	}

	maleTop = () => {
		let x = options[3]
		let maleHTML = []
		maleHTML.push(
			<>
				<span className='plussign41' onClick={() => {this.collapseExpand41()}}>+</span>
				<input id={x.id} type='checkbox' name={x.name} value={x.value} />
				<label htmlFor={x.id}><b>Male</b></label>
			</>
		)
		return maleHTML
	}

	male = () => {
		let properties = options[3].options
		let maleHTML = []
		for (const [i, x] of Object.entries(properties)) {
			maleHTML.push(
				<li className='checkboxchild41' key={i}>
					<input id={x.id} type='checkbox' name={x.name} value={x.value}/>
					<label htmlFor={x.id}>{x.label}</label>
				</li>
			)
		}
		return maleHTML
	}

	femaleTop = () => {
		let x = options[4]
		let femaleHTML = []
		femaleHTML.push(
			<>
				<span className='plussign42' onClick={() => {this.collapseExpand42()}}>+</span>
				<input id={x.id} type='checkbox' name={x.name} value={x.value} />
				<label htmlFor={x.id}><b>Female</b></label>
			</>
		)
		return femaleHTML
	}

	female = () => {
		let properties = options[4].options
		let femaleHTML = []
		for (const [i, x] of Object.entries(properties)) {
			femaleHTML.push(
				<li className='checkboxchild42' key={i}>
					<input id={x.id} type='checkbox' name={x.name} value={x.value}/>
					<label htmlFor={x.id}>{x.label}</label>
				</li>
			)
		}
		return femaleHTML
	}

	checkChange = (e) => {
		var checked = $(this).prop("checked"),
    container = $(this).parent(),
    siblings = container.siblings();
  
  container.find('input[type="checkbox"]').prop({
    indeterminate: false,
    checked: checked
  });

		function checkSiblings (el) {

			var parent = el.parent().parent(),
				all = true;

			el.siblings().each(function () {
				let returnValue = all = ($(this).children('input[type="checkbox"]').prop("checked") === checked);
				return returnValue;
			});

			if (all && checked) {

				parent.children('input[type="checkbox"]').prop({
					indeterminate: false,
					checked: checked
				});

				checkSiblings(parent);

			} else if (all && !checked) {

				parent.children('input[type="checkbox"]').prop("checked", checked);
				parent.children('input[type="checkbox"]').prop("indeterminate", (parent.find('input[type="checkbox"]:checked').length > 0));
				checkSiblings(parent);

			} else {

				el.parents("li").children('input[type="checkbox"]').prop({
					indeterminate: true,
					checked: false
				});
			}
		}
	}

	collapseExpand2 = () => {
		this.setState({
      raceShow: !this.state.raceShow
    })
	}

	collapseExpand3 = () => {
		this.setState({
      sizeShow: !this.state.sizeShow
    })
	}

	collapseExpand4 = () => {
    if (this.state.ageFemaleShow !== this.state.ageMaleShow) {
      this.setState({
        ageMaleShow: false,
        ageFemaleShow: false
      });
    } else {
      this.setState({
        ageMaleShow: !this.state.ageMaleShow,
        ageFemaleShow: !this.state.ageFemaleShow
      });
    }
  }

	collapseExpand41 = () => {
		this.setState({
      ageMaleShow: !this.state.ageMaleShow
    })
	}

	collapseExpand42 = () => {
		this.setState({
      ageFemaleShow: !this.state.ageFemaleShow
    })
	}

	selectMap = () => {
		$('path').attr("fill", "red");
  	$('circle').attr("fill", "red");
	}

	unSelectMap = () => {
		$('path').attr("fill", "#D3D3D3");
  	$('circle').attr("fill", "#D3D3D3");
	}

	toggleChecks = () => {
		if ($('.totalInput input:checkbox:checked').length < 52) {
    $('.totalInput input:checkbox').prop('checked', true);
		} else if ($('.totalInput input:checkbox:checked').length === 52) {
			$('.totalInput input:checkbox').prop('checked', false);
		}
	}

	showHide = () => {
		if ($('li:hidden').length !== 0) {
      console.log('show')
			this.setState({
        raceShow: true,
        sizeShow: true,
        ageShow: true,
        ageMaleShow: true,
        ageFemaleShow: true
      })
		} else {
      console.log('hide')
			this.setState({
        raceShow: false,
        sizeShow: false,
        ageShow: false,
        ageMaleShow: false,
        ageFemaleShow: false
      })
  	}
	}

	buttons = () => {
		return (
			<>
				<button type='submit'>Submit</button>
				<button type='button' onClick={() => {this.selectMap()}}>Select</button>
				<button type='button' onClick={() => {this.unSelectMap()}}>Unselect</button>
				<button type='button' onClick={() => {this.toggleChecks()}}>Toggle</button>
				<button type='button' onClick={() => {this.showHide()}}>Show/Hide</button>
			</>
		)
	}

	render() {
		return (
			<form className='totalInput' onChange={(e) => {this.checkChange(e)}} onSubmit={(e) => {this.props.submit2(e)}}>
				<div className='button-container'>
					<div className='button-container1'>
						{this.buttons()}
					</div>
				</div>
				<div className='options'>
					<div className='raceandsize'>
						<div className='byRace'>
							<ul>
								<li className='checkboxparent1'>
									{this.raceTop()}
                  {this.state.raceShow ? <ul>{this.race()}</ul> : ''}
								</li>
							</ul>
						</div>
						<div className='bySize'>
							<ul>
								<li className='checkboxparent3'>
									{this.sizeTop()}
                  {this.state.sizeShow ? <ul>{this.size()}</ul> : ''}
								</li>
							</ul>
						</div>
					</div>
					<div className='byAS'>
						<div className='AStotal'>
							<ul>
								<li className='checkboxparent4'>
									{this.all()}
								</li>
							</ul>
						</div>
						<div className="genders">
							<div className="male">
								<ul>
									<li className='checkboxmiddle41'>
										{this.maleTop()}
                    {this.state.ageMaleShow ? <ul>{this.male()}</ul> : ''}
									</li>
								</ul>
							</div>
							<div className="female">
								<ul>
									<li className='checkboxmiddle42'>
										{this.femaleTop()}
										{this.state.ageFemaleShow ? <ul>{this.female()}</ul> : ''}
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</form>
		)
	}
}