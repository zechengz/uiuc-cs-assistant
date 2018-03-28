import React, {Component} from 'react';
import queryString from 'query-string';
import axios from 'axios';

import NavBar from '../NavBar/navbar.jsx';

import ProfileClassStarter from '../Profile/ProfileStarter/profileClassStarter.jsx';
import CourseFieldPoster from './SectionElements/courseField.jsx';
import GalleryGrid from './SectionElements/galleryGrid.jsx';
import GPATableWrapper from './SectionElements/gpaTable.jsx';
import Profile from './profile.jsx';
import UserPlanTable from './SectionElements/userPlanTable.jsx';
import ChipArray from './SectionElements/chipArray.jsx';

import convert from 'xml-js';

class ClassProfile extends Component {
  constructor (props) {
    super (props);
    this.state = {
    	dataAvail: false,
    	data: null
    };
    this.getUserInfo = this.getUserInfo.bind (this);
    this.getClassInfo = this.getClassInfo.bind (this);
    this.getFieldInfo = this.getFieldInfo.bind (this);
    
    this.getClassInfo = this.getClassInfo.bind (this);

	var parsed = queryString.parse(this.props.location.search);
	if (parsed.type === undefined) {
		console.log ("Please specify data type (class/field or user)");
	} else if (parsed.type === 'user') {
    this.type = 'user';
		var info = this.getUserInfo (parsed.name);
	} else if (parsed.type === 'class') {
    this.type = 'class';
		let courseNumber = parsed.name.slice (-3);
    if (parsed.name.toLowerCase() === 'cs498rk') {
      this.secret = true;
    }
		console.log (courseNumber);
		this.getClassInfo (courseNumber, "2017", "fall");
	} else if (parsed.type === 'field') {
		// not implemented
	} else {
		console.log ("Unidentified data type");
	}
  }

  getUserInfo (name) {
  	if (name === undefined || name === null) {
  		console.log ("User name not specified");
  		return;
  	}
  	axios.get ("/api/user/info", {
  		params: {
  			partialName: name
  		}
  	}).then ((response) => this.processResponse (response));
  }

/*
  getClassInfo (name) {
  	if (name === undefined || name === null) {
  		console.log ("Invalid class name");
  		return;
  	}
  	axios.get ("api/class", {
  		params: {
  			partialName: name
  		}
  	}).then ((response) => this.processResponse (response));
  }
  */

  getFieldInfo (name) {

  }

  processResponse (res) {
  	if (res === null || res.data === null) {
  		console.log ("Fail to retrieve data");
  	} else {
      console.log ("Response data");
  		console.log (res.data);
  		this.setState ({
  			dataAvail: true,
  			data: res.data.data[0]
  		});
  	}
  }

  render() {
    if (this.secret !== undefined && this.secret) {
      return (
        <div>
        <NavBar/>
        <ProfileClassStarter/>
        </div>

        );
    }
  	if (this.type === 'class' && this.info === undefined) {
  		console.log ("Not yet get class data");
  		return <div></div>;
  	}
    if (this.type === 'user' && !this.state.dataAvail) {
      console.log ("Not yet get user data");
      return <div></div>;
    }
  	/*
  	if (this.state.data === null) {
  		// still waiting for data to come
  		return <div></div>;
  	}
  	*/
    const fieldFileMap = {
        'Basics': 'basics',
        'Software Foundations': 'software',
        'Intelligence and Big Data': 'data',
        'Human and Social Impact': 'humansocial',
        'Media': 'media',
        'Machines': 'machine',
        'Distributed Systems, Networking, and Security': 'security',
        'Scientific, Parallel, and High Performance Computing': 'scientific'
      };

    if (this.type === 'class') {    	
    	let fieldPoster = <CourseFieldPoster field={fieldFileMap[this.field]}/>;
    	let GPATable = (this.gpaTable === null) ? <div>Nothing to display</div> : <GPATableWrapper dataList={this.gpaTable}/>;
    	let profileProps = {
    		profileInfos: this.info,
    		profileSections: [
    			{title: "Field", content: fieldPoster, visible: true},
    			{title: "GPA information", content: GPATable, visible: true}
    		],
    		editable: false
    	};
    	console.log ("======================");
    	console.log (this.info);

      return (
        <div>
          <NavBar />
          <Profile {...profileProps} />
        </div>
      );
    } else {
      let fieldPoster = <CourseFieldPoster field={fieldFileMap[this.state.data.direction]}/>
      if (this.state.data.userPlan !== undefined && this.state.data.userPlan.length > 0) {
        var userPlanTable = <UserPlanTable dataList={this.state.data.userPlan}/>
      } else {
        var userPlanTable = <div></div>;
      }
      
      if (this.state.data.classTaken !== undefined) {
        var classTaken = <ChipArray data={this.state.data.classTaken}/>
      } else {
        var classTaken = <div></div>;
      }

      if (this.state.data.experience !== undefined && this.state.data.experience.length > 0) {
        var experience = <ChipArray data={this.state.data.experience}/>
      } else {
        var experience = <div></div>;
      }

      let profileProps = {
        profileInfos: {
          name: this.state.data.name,
          email: this.state.data.email,
          avatar: this.state.data.avatar,
          year: this.state.data.year,
          description: this.state.data.description
        },
        profileSections: [
        {title: "Interested Field", content: fieldPoster, visible: true},
        {title: "User Plan", content: userPlanTable, visible: true},
        {title: "Class Taken", content: classTaken, visible: true},
        {title: "Experience", content: experience, visible: true}],
        editable: false
      };

      return (
        <div>
          <NavBar/>
          <Profile {...profileProps}/>
        </div>
      );
    }
  }

  parseGPATable (GPAMAP, course) {
  	if (GPAMAP[course] === undefined) {
  		console.log ("Fail to parse GPA table of the course");
  		return null;
  	}
  	let profSet = GPAMAP[course];
  	let GPATableData = [];
  	for (let prof in profSet) {
  		let gpaArr = profSet[prof];
  		let rA = gpaArr[0];
  		let rB = gpaArr[1];
  		let rC = gpaArr[2];
  		let rD = gpaArr[3];
  		let gpa = gpaArr[5];
  		GPATableData.push ({
  			profName: prof,
  			GPA: gpa,
  			ARatio: rA,
  			BRatio: rB,
  			CRatio: rC,
  			DRatio: rD,
  		});
  	}
  	return GPATableData;
  }

  getClassInfo (classid, year, semester) {
  		console.log ("New file");
  		console.log (classid);
  	
        let professorGPAMAP = {"cs100":{"L Pitt":[87.1,6.6,3.0,1.2,2.2,3.75]}, 
        "cs101":{"R Cunningham":[52.2,31.5,10.5,3.0,2.9,3.26],"N Davis":[54.4,25.7,11.1,5.7,3.1,3.19],"T Gambill":[36.7,30.6,17.9,8.9,6.0,2.82]},
        "cs105":{"M Hellwig":[69.1,24.5,4.0,0.8,1.6,3.56],"W Fagen":[56.6,29.9,9.5,2.5,1.4,3.35]},"cs125":{"W Chapman":[63.7,21.2,12.2,1.5,1.5,3.43]}, 
        "cs126":{"C Zilles":[79.4,14.7,5.9,0,0,3.75]}, 
        "cs173":{"M Prabhakaran":[38.9,42.2,15.6,3.3,0,3.16],"M Fleck":[41.6,37.7,13.2,6.2,1.3,3.1],"G Agha":[35.7,42.1,18.6,2.9,0.7,3.06],"T Warnow":[38.5,38.5,13.7,8.7,0.6,3.05],"M Parthasarathy":[33.0,37.3,14.7,10.6,4.4,2.84]}, 
        "cs196":{"W Chapman":[89.3,8.4,1.7,0,0.6,3.84],"M Fleck":[75.2,18.3,3.7,0.9,1.8,3.6]}, 
        "cs199" : {"C Heeren":[94.7,3.5,1.8,0,0.0,3.91],"G Yershova":[69.2,30.8,0,0,0,3.69]}, 
        "cs210":{"R Cunningham":[66.5,26.1,5.8,0.6,1.0,3.55],"A Kirlik":[64.1,26.6,6.5,2.2,0.5,3.51]}, 
        "cs225":{"C Heeren":[51.5,25.7,12.7,5.9,4.2,3.12],"C Geigle":[33.3,36.8,16.2,6.8,6.8,2.84],"G Yershova":[43.7,29.6,9.9,7.0,9.9,2.84]},
        "cs233":{"S Meenai":[33.3,54.5,9.1,3.0,0.0,3.16],"C Zilles":[37.3,32.5,16.9,7.8,5.5,2.87]},"cs242":{"M Woodley":[54.7,32.7,9.5,1.9,1.2,3.34]}, 
        "cs296":{"L Angrave":[88.9,6.7,0,0,4.4,3.74],"C Heeren":[82.9,12.8,0.9,0.0,3.3,3.71],"C Zilles":[60.5,25.8,8.9,2.4,2.4,3.36]}, 
        "cs357":{"L Olson":[37.9,39.9,16.2,6.1,0.0,3.11],"A Kloeckner":[47.2,25.8,14.7,10.2,2.2,3.06],"E Shaffer":[30.0,34.0,27.1,6.9,2.0,2.83],"M Heath":[25.0,35.3,28.3,8.2,3.3,2.68]},
        "cs361":{"J Peng":[53.0,31.8,12.1,1.5,1.5,3.37]},
        "cs374":{"J Erickson":[21.7,28.0,31.7,15.1,3.5,2.5]}, 
        "cs410":{"C Zhai":[89.1,9.5,1.0,0.2,0.2,3.86]},
         "cs411":{"A Parameswaran":[50.5,49.5,0,0,0,3.47],"S Sinha":[53.5,37.5,8.0,0.5,0.5,3.38],"K Chang":[43.2,37.5,12.2,5.0,2.2,3.05]}, 
         "cs412":{"H Sundaram":[59.3,25.9,9.9,2.5,2.5,3.26],"J Han":[45.6,37.8,13.5,1.0,2.1,3.21],"K Chang":[43.9,30.2,16.2,4.5,5.3,2.93]}, 
         "cs418":{"J Hart":[63.2,27.3,5.9,1.8,1.8,3.41],"E Shaffer":[50.5,31.7,9.9,4.5,3.2,3.18]}, 
         "cs419" : {"E Shaffer":[64.1,28.2,5.1,2.6,0.0,3.5]},
     	 "cs498" : {'R Kumar': [38.9, 43.2, 15.8, 2.1, 0.0]}};

        var fieldDict = {
        'Basics':['cs100','cs101','cs105','cs125','cs126','cs173','cs196','cs199','cs210','cs225','cs233','cs241','cs242',
        'cs296','cs357','cs361','cs374'],
        'Software Foundations':
        ['cs422','cs426','cs427','cs428','cs429','cs476','cs477','cs492','cs493','cs494','cs498 Software Testing','cs522','cs524','cs526','cs527','cs528','cs576'],
        'Algorithms and Models of Computation':
        ['cs413','cs473','cs475','cs476','cs477','cs481','cs482','cs571','cs572','cs573','cs574','cs575','cs576','cs579','cs583',
        'cs584'],
        'Intelligence and Big Data':
        ['cs410','cs411','cs412','cs414','cs440','cs443','cs445','cs446','cs447','cs466','cs467','cs510','cs511','cs512','cs543',
        'cs544','cs546','cs548','cs566','cs576','cs598 Mach Lrng for Signal Processng'],
        'Human and Social Impact':
        ['cs416','cs460','cs461','cs463','cs465','cs467','cs468','cs498 Art and Science of Web Prog','cs498 The Art of Web Programming','cs563','cs565'],
        'Media':
        ['cs414','cs418','cs419','cs445','cs465','cs467','cs498 Virtual Reality','cs519','cs565','cs598 Mach Lrng for Signal Processng'],
        'Scientific, Parallel, and High Performance Computing':
        ['cs419','cs450','cs457','cs466','cs482','cs483','cs484','cs519','cs554','cs555','cs556','cs558'],
        'Distributed Systems, Networking, and Security':
        ['cs423','cs424','cs425','cs431','cs436','cs438','cs439','cs460','cs461','cs463','cs483','cs484','cs523','cs524','cs525',
        'cs538','cs563'],
        'Machines':
        ['cs423','cs424','cs426','cs431','cs433','cs484','cs523','cs526','cs533','cs536','cs541','cs584','cs598 Parallel Programming'],
        'Group Project':
['cs427','cs428','cs429','cs445','cs465','cs467','cs493','cs494']};
        // this will get the specific information for a specific class
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        var url = "https://courses.illinois.edu/cisapp/explorer/schedule/"+year+"/"+semester+"/CS/"+classid+".xml?mode=detail";
        var result1 = [];
        var courses_json = null;
        var course = {};
        axios.get(proxyurl+url).then((response)=> {
            result1 = convert.xml2json(response.data, {compact: true, spaces: 4});
        })
        .then(()=> {
            var a = JSON.parse(result1);
            courses_json = a["ns2:course"];
        })
        .then(()=> {
            course["description"] = courses_json["description"];
            course["creditHours"] = courses_json["creditHours"];
            course["courseSectionInformation"] = courses_json["courseSectionInformation"];
            var len = courses_json["detailedSections"]["detailedSection"].length;
            course["instructor"] = [];
            // console.log(courses_json["detailedSections"]["detailedSection"][0]["meetings"]["meeting"]["instructors"]["instructor"]);
            for(var i=0;i<len;i++) {
                if(courses_json["detailedSections"]["detailedSection"][i]["meetings"]["meeting"]["instructors"]["instructor"].length > 1) {
                  for(var j=0;j<courses_json["detailedSections"]["detailedSection"][i]["meetings"]["meeting"]["instructors"]["instructor"].length;j++) {
                    var firstname = courses_json["detailedSections"]["detailedSection"][i]["meetings"]["meeting"]["instructors"]["instructor"][j]["_attributes"]["firstName"];
                    var lastname = courses_json["detailedSections"]["detailedSection"][i]["meetings"]["meeting"]["instructors"]["instructor"][j]["_attributes"]["lastName"];
                    var name = firstname+" "+lastname;
                    if(course["instructor"].indexOf(name)==-1) {
                      course["instructor"].push(name);
                    }
                  }
                }
                else {
                  var firstname = courses_json["detailedSections"]["detailedSection"][i]["meetings"]["meeting"]["instructors"]["instructor"]["_attributes"]["firstName"];
                  var lastname = courses_json["detailedSections"]["detailedSection"][i]["meetings"]["meeting"]["instructors"]["instructor"]["_attributes"]["lastName"];
                  var name = firstname+" "+lastname;
                  if(course["instructor"].indexOf(name)==-1) {
                    course["instructor"].push(name);
                  }
                }
            }
})
        .then(()=>{
           //console.log(course); 

           // find corresponding field
           let courseName = 'cs' + classid;
           let field = null;
           for (let key in fieldDict) {
           		let courses = fieldDict[key];
           		for (let i = 0; i < courses.length; i ++) {
           			if (courses[i] === courseName) {
           				field = key;
           				break;
           			}
           		}
           		if (field !== null)
           			break;
           }
           this.field = field;

           //find avgGPA info
           let profs = professorGPAMAP[courseName];
           let gpaInfos = [];
           for (let key in profs) {
           		let gpa = profs[key][profs[key].length - 1];
           		gpaInfos.push ({profName: key, size: 100, GPA: gpa});
           }
           this.info = {
           		avatar: 'assets/avatar-1.svg',
           		name: "CS " + classid,
           		year: year,
           		description: course['description']['_text'],
           		field: field,
           		'Current Professor': (course['instructor'].length === 0) ? "N/A" : course['instructor'][0],
           		'Average GPA': (gpaInfos.length === 0) ? "N/A" : gpaInfos[0]['GPA'],
           		'Credit Hours': (course['creditHours'] === undefined) ? "N/A" : course['creditHours']._text,
           		followers: 0
           };
           this.gpaTable = this.parseGPATable (professorGPAMAP, courseName);
           this.forceUpdate ();


		});

  }
}

export default ClassProfile
