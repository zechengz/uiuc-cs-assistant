import React, {Component} from 'react';
import path from 'path';
import styles from '../profile.scss';

class CourseFieldPoster extends Component {
	constructor (props) {
		super (props);
		this.field = props.field;
	}

	render () {
		if (this.field === undefined || this.field === null) {
			console.log ("No field is assigned to this class");
			return <div></div>;
		}
		// find corresponding image
			return (
				<div >
				<div className="fieldText">{this.field.toUpperCase()}</div>
				<img src={"assets/fieldIcons/" + this.field.toLowerCase() + ".png"} alt="Unknown Error" />
				</div>
			);
	}
}

export default CourseFieldPoster;