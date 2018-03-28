import React, {Component} from 'react';
import Profile from '../profile.jsx';
import GPATableWrapper from '../SectionElements/gpaTable.jsx';
import UserPlanTable from '../SectionElements/userPlanTable.jsx';
import CourseFieldPoster from '../SectionElements/courseField.jsx';
import ChipArray from '../SectionElements/chipArray.jsx';
import GalleryGrid from '../SectionElements/galleryGrid.jsx';


class ProfileUserStarter extends Component {
	render () {
    	let content1 = <CourseFieldPoster field="machine"/>
        let planData = [{semester: "Fall 2017", courses: ["CS 374", "CS 498", "CS 440"]},
                {semester: "Fall 2016", courses: ["CS 225", "CS 233", "CS 241"]},
                {semester: "Fall 2015", courses: ["CS 105", "CS 125", "CS 357"]}];
        let courses = ["CS 225", "CS 233", "CS 241", "CS 498"];
        let experiences = ["C", "C++", "Python", "Assembly", "Javascript", "React", "NodeJS"];
        let content2 = <UserPlanTable dataList={planData}/>
        let content3 = <ChipArray data={courses}/>
        let content4 = <ChipArray data={experiences}/>
    	let profileProps = {
    		profileInfos: {
    			avatar: "https://nerdist.com/wp-content/uploads/2017/08/here-s-how-to-catch-pikachus-before-they-become-super-rare-in-pokemon-go.jpg",
    			name: "pikachu",
    			email: "pikachu@pokemon.com",
    			year: "Sophomore",
    			description: "I am a cute pokemon",
    			friends: 10086,
    		},
    		profileSections: [
                {title: "Direction", content: content1, visible: true},
                {title: "User Plan", content: content2, visible: true},
                {title: "Course Taken", content: content3, visible: true},
                {title: "Experience", content: content4, visible: true}
            ]
    	}
        return(
            <div>
                <Profile {...profileProps}/>
            </div>
        );
	}
}

export default ProfileUserStarter;