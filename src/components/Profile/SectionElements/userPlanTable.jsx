// GPA table section content wrapper
import React, {Component} from 'react';
import Chip from 'material-ui/Chip';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Avatar from 'material-ui/Avatar';
import styles from '../profile.scss';


class UserPlanTable extends Component {
	constructor (props) {
		super (props);
		this.state = {};
		this.expansionListAssem = this.generatePlanExpansionTable (props.dataList);

		//this.expansionListAssem = this.generatePlanExpansionTable (dataList);

	}

	handleChange () {

	}

	generatePlanExpansionTable (dataList) {
		const colors = ["#5BC8AC", "#E6D72A", "#F18D9E", "#98DBC6"];

		let expansionList = dataList.map (function (semesterInfo, indexSem) {
			let sem = semesterInfo.semester;
			let courseNames = semesterInfo.courses; // list of string
			let courseList = courseNames.map (function (course, indexCor) {
				let backgroundColorStyle = {background: colors[indexCor % colors.length]};
				return <Chip avatar={<Avatar style={{"minWidth": "0"}} src="/assets/fieldIcons/software-32.png"/>} label={course} 
					key={indexCor} className="courseChip" style={backgroundColorStyle}/>
			});
			let chipContainer = (
				<div className="chipContainer">
					{courseList}
				</div>
			);
			let singleExpansion = (
				<ExpansionPanel key={indexSem} defaultExpanded className="expansionItem">
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<Typography>{sem}</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						{chipContainer}
					</ExpansionPanelDetails>
				</ExpansionPanel>
			);
			return singleExpansion;
		});
		let expansionListAssem = (
			<div className="expansionTableOutline">
				{expansionList}
			</div>
		);
		return expansionListAssem;
	}

	render () {
		if (this.expansionListAssem === undefined || this.expansionListAssem === null) {
			console.log ("Failed to construct Expansion List Assemble");
			return <div></div>;
		}
		return this.expansionListAssem;
	}
}

export default UserPlanTable;