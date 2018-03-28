import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import List, {ListItem, ListItemText} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import ListSubheader from 'material-ui/List/ListSubheader';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

import styles from './profile.scss';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import ProfileClassStarter from '../Profile/ProfileStarter/profileClassStarter.jsx';

/*
	USAGE
	Format of the props:
	{
		profileInfos: {
			avatar: avatar of the profile owner. (url source)
			name: name of the profile owner (can be the name of a user, a course or a field),
			email: email of the profile owner (can be null if not a user profile),
			year: current academic year of the profile owner (can be null if not a user profile),
			description: description of the profile owner, string,
			friends: int, number of friends the user has (can be null if not a user profile),
			field: the field the class belongs to (can be null if not a class profile),
			currentProf: current professor of the class, string (can be null if not a class profile),
			avgGPA: the average GPA for the course, string (can be null if not a class profile),
			followers: int, the number of followers of the class (can be null if not a class profile),
		},
		profileSections: list of dicts (title-string, content-component, visible-boolean) representing sections to be displayed on the
		right side of the profile. See code below...
	}
*/

class ProfileSection extends Component {
	constructor (props) {
		super (props);
		// do nothing
		this.state = {
			visible: props.data.visible
		};

		// editable cannot be changed therefore is not in state
		// if editable is false, visible can be all garbage values
		// or null
		this.editable = props.editable;
		//console.log (this.editable);
		this.handleVisClick = this.handleVisClick.bind (this);
	}

	handleVisClick () {
		this.setState ({
			visible: !this.state.visible
		});
	}

	render () {
		if (this.editable) {
			//console.log (this.editable);
			if (this.state.visible){
				var visColor = '#64B5F6';
			} else {
				var visColor = '#BDBDBD';
			}
			const visIconStyle = {
				color: visColor
			};
			let nPSection = (
				//<MuiThemeProvider>
					<Paper elevation={1} className="sectionWrapper">
					<p className="sectionTitle">{this.props.data.title}</p>
					<div className="contentContainer"> {this.props.data.content}</div>
					<div className="iconContainer">
						<i className="fa fa-eye fa-lg" aria-hidden="true" style={visIconStyle} onClick={this.handleVisClick} id="sectionVisIcon"></i>
					</div>
					</Paper>
				//</MuiThemeProvider>
			);
			return nPSection;
		} else {
			// non editable case
			let nPSection = (
				<Paper elevation={1} className="sectionWrapper">
					<p className="sectionTitle">{this.props.data.title}</p>
					<div className="contentContainer" style={{"paddingBottom": "30px"}}> {this.props.data.content}</div>
				</Paper>
			);
			return nPSection;
		}
	}
}

class ProfileSectionList extends Component {
	constructor (props) {
		super (props);
		this.editable = props.editable;
		this.sectionComponentList = this.generateProfileSections (props.sectionList);
	}

	generateProfileSections (sectionList) {
		let sectionComponentList = [];
		for (let i = 0; i < sectionList.length; i ++) {
			sectionComponentList.push ((
				<li key={i} className="sectionListItem">
					<ProfileSection data={sectionList[i]} editable={this.editable} />
				</li>
				));
		}
		return sectionComponentList;
	}

	render () {
		console.log (this.sectionComponentList.length);
		return (
			<ul className="sectionList">
				{this.sectionComponentList}
			</ul>
		);
	}
}

class ProfileInfo extends Component {


	constructor (props) {
		super (props);

		this.yearOptions = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Secret'];

		this.userInfo = props.userInfo;
		this.editable = props.editable;

		if (props.email !== undefined && this.yearOptions.indexOf (this.userInfo.year) === -1) {
			console.log ("Invalid input year");
		 	this.userInfo.year = this.yearOptions[0]; // reset year option to freshman
		}

	}

	// Generate profile list layout using input props
	generateProfileListItems (props) {
		let profileListItems = [];
		/*
		// subheader seems doesn't work in Material UI 1.0
		if (props.email !== null) {
			profileListItems.push (
				(<Subheader
					key={0}>User</Subheader>));
		} else {
			profileListItems.push (
				(<Subheader
					key={0}>Class</Subheader>));
		}
		*/
		profileListItems.push ((
			<ListItem key={1} className="avatarContainer item">
				<Avatar src={props.avatar} alt="Icon" className="userAvatarProfile"/>
			</ListItem>
			));
		let currIndex = 2;
		for (let key in props) {
			if (props[key] !== undefined && props[key] !== null) {
				if (key === 'avatar')
					continue;
				if (key === 'description') {
					profileListItems.push ((
						<ListItem key={currIndex} className="item">
							<ListItemText className="profileText" primary='Description'
								secondary={props[key]} />
						</ListItem>
						));
				} else if (key === 'friends') {
					profileListItems.push ((
						<ListItem key={currIndex}className="item" >
							<ListItemText className="profileText" primary="Number of Friends"
								secondary={props[key]}/>
						</ListItem>
						));
				} else if (key === 'followers') {
					profileListItems.push ((
						<ListItem key={currIndex} className="item">
							<ListItemText className="profileText" primary="Number of Followers"
								secondary={props[key]}/>
						</ListItem>
						));
				} else {
					profileListItems.push ((
						<ListItem key={currIndex} className="item">
							<ListItemText className="profileText" primary={this.toUpperFirstChar(key)}
								secondary={props[key]}/>
						</ListItem>
						));
				}
			}
			currIndex += 1;
		}
		return profileListItems;
	}

	toUpperFirstChar (str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	render () {
		var profileList = this.generateProfileListItems (this.userInfo);

		return (
			<List>
				{profileList}
			</List>
		);
	}
}

class Profile extends Component {
	constructor (props) {
		super (props);

		// save props for future use
		if (this.profileInfos === null) {
			console.log ("Incorrect prop format");
			return;
		}
		if (this.profileSections === null) {
			console.log ("Incorrect prop format");
			return;
		}
		this.profileInfoProps = this.props.profileInfos;
		this.profileSectionProps = this.props.profileSections;
		this.editable = this.props.editable;

		// profile edit variable
		this.state = {
			open: false
		};
		this.editValue = null;
		this.handleClick = this.handleClick.bind (this);
	}

	handleClick () {
		console.log ("clicked");
		this.setState ({
			open: true
		});
	}

	render () {
		return (
			<div className="profileOutline">
			<Grid container spacing={40} className="profileOutGrid">
				<Grid item xs={12} sm={12} md={3}>
				<Paper elevation={1} className="profileInfoSection">
					<ProfileInfo userInfo={this.profileInfoProps} editable={this.editable} />
				</Paper>
				</Grid>

				<Grid item xs={12} sm={12} md={9}>
				<ProfileSectionList sectionList={this.profileSectionProps} editable={this.editable}/>
				</Grid>
			</Grid>

			
			</div>

		);
	}

	
	/*
		Profile Edit
	*/

}

export default Profile
