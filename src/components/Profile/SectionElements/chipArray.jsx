import React, {Component} from 'react';
import Chip from 'material-ui/Chip';
import styles from '../profile.scss';

class ChipArray extends Component {
	constructor (props) {
		super (props);
		this.stringArr = props.data;
	}

	generateChipArr (data) {
		// data is array of strings
		let chipArr = data.map (function(name, index) {
			return <Chip label={name} key={index} className="normalChip"/>;
		});
		return chipArr;
	}

	render () {
		if (this.stringArr === undefined || this.stringArr === null) {
			console.log ("Input data is undefined or null");
			return <div></div>;
		}
		let chipArr = this.generateChipArr (this.stringArr);
		return (
			<div className="chipContainer">
				{chipArr}
			</div>
		);
	}
}

export default ChipArray;