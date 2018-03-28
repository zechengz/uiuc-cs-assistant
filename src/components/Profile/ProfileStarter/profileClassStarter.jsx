import React, {Component} from 'react';
import Profile from '../profile.jsx';
import GPATableWrapper from '../SectionElements/gpaTable.jsx';
import UserPlanTable from '../SectionElements/userPlanTable.jsx';
import CourseFieldPoster from '../SectionElements/courseField.jsx';
import ChipArray from '../SectionElements/chipArray.jsx';
import GalleryGrid from '../SectionElements/galleryGrid.jsx';

class ProfileClassStarter extends Component {
	render () {
		let GPAContent = [{profName: "Ranjitha Kumar", classSize: 300, GPA: 3.21},
						{profName: "Prof2", classSize: 100, GPA: 3.57},
						{profName: "Prof3", classSize: 250, GPA: 3.00}];
		let content3 = <GPATableWrapper dataList={GPAContent} />;
		let content2 = <CourseFieldPoster field="humansocial"/>

		let gridData = [{profName: "Kumar", imgUrl: "http://ranjithakumar.net/resources/headshot.jpg"},
						{profName: "Sujay Khandekar", imgUrl: "http://sujaykhandekar.com/images/profile.jpg"},
						{profName: "Biplap Deka", imgUrl: "http://www.biplabdeka.net/images/profile_picture.png"},
						{profName: "Konstantinos Koiliaris", imgUrl: "http://koiliaris.com/img/kk.jpeg"}];
		let content1 = <GalleryGrid data={gridData}/>;

		let profileProps = {
			profileInfos: {
				avatar: "http://www.newsteptechnology.com/wp-content/themes/newstep/timthumb.php?src=http://www.newsteptechnology.com/wp-content/uploads/2015/06/depositphotos_45238073-SEO-web-development-concept-Web-Programming-on-digital-background.jpg&w=555&h=296&zc=0&q=100",
				name: "CS 498 RK",
				description: "Art of Web Programming Fall 2017 Profile",
				field: "Web/UXUI",
				currentProf: "Ranjitha Kumar",
				avgGPA: "3.21",
				followers: 300
			},
			profileSections: [
				{title: "Instructor", content: content1, visible:true},
				{title: "Field", content: content2, visible:true},
				{title: "Course GPA", content: content3, visible: true}
			],
			editable: false
		};
		return (
			<div>
				<Profile {...profileProps} />
			</div>
		);
	}
}

export default ProfileClassStarter;
