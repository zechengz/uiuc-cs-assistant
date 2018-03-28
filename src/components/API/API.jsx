import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { findDOMNode } from 'react-dom';
import axios from 'axios'

var convert = require('xml-js');

// using this API need to npm install xml-js --save first and "var convert = require('xml-js');" first and "import axios from 'axios'"

class API extends Component {
    
    componentWillMount() {
        // this one is to get all the courses for CS in specific semester
//        const proxyurl = "https://cors-anywhere.herokuapp.com/";
//        var year = "2017";
//        var semester = "fall";
//        var url = "https://courses.illinois.edu/cisapp/explorer/schedule/"+year+"/"+semester+"/CS.xml";
//        var result1 = [];
//        var courses_json = null;
//        var courses = {};
//        var c = null;
//        var course498 = [];
//        var course598 = [];
//        axios.get(proxyurl+url).then((response)=> {
//            result1 = convert.xml2json(response.data, {compact: true, spaces: 4});
//        })
//        .then(()=> {
//            var a = JSON.parse(result1);
//            courses_json = a["ns2:subject"]["courses"];
//        })
//        .then(()=> {
//            var b = courses_json["course"];
//            for(var i=0;i<b.length;i++) {
//                if(b[i]["_attributes"]["id"] === "498") {
//                    var url = "https://courses.illinois.edu/cisapp/explorer/schedule/"+year+"/"+semester+"/CS/498.xml?mode=detail";
//                    axios.get(proxyurl+url).then((response)=> {
//                        result1 = convert.xml2json(response.data, {compact: true, spaces: 4});
//                        c = JSON.parse(result1);
//                    })
//                    .then(()=> {
//                        for(var j=0;j<c["ns2:course"]["detailedSections"]["detailedSection"].length;j++) {
//                            if(course498.indexOf(c["ns2:course"]["detailedSections"]["detailedSection"][j]["sectionTitle"]["_text"])==-1) {
//                                var name = c["ns2:course"]["detailedSections"]["detailedSection"][j]["sectionTitle"]["_text"];
//                                course498.push(name);
//                                courses["cs498 "+name] = name;
//                            }
//                        }
//                    });
//                }
//                else if(b[i]["_attributes"]["id"] === "598") {
//                    var url = "https://courses.illinois.edu/cisapp/explorer/schedule/"+year+"/"+semester+"/CS/598.xml?mode=detail";
//                    axios.get(proxyurl+url).then((response)=> {
//                        result1 = convert.xml2json(response.data, {compact: true, spaces: 4});
//                        c = JSON.parse(result1);
//                    })
//                    .then(()=> {
//                        for(var j=0;j<c["ns2:course"]["detailedSections"]["detailedSection"].length;j++) {
//                            if(course598.indexOf(c["ns2:course"]["detailedSections"]["detailedSection"][j]["sectionTitle"]["_text"])==-1) {
//                                var name = c["ns2:course"]["detailedSections"]["detailedSection"][j]["sectionTitle"]["_text"];
//                                course598.push(name);
//                                courses["cs598 "+name] = name;
//                            }
//                        }
//                    });
//                }
//                else {
//                    courses["cs"+b[i]["_attributes"]["id"]] = b[i]["_text"];
//                }
//            }
//        })
//        .then(()=> {
//             console.log(courses);
//        });
        
        // this will get the specific information for a specific class
//        var classid = "412";// the class id
//        const proxyurl = "https://cors-anywhere.herokuapp.com/";
//        var year = "2018";
//        var semester = "spring";
//        var url = "https://courses.illinois.edu/cisapp/explorer/schedule/"+year+"/"+semester+"/CS/"+classid+".xml?mode=detail";
//        var result1 = [];
//        var courses_json = null;
//        var course = {};
//        axios.get(proxyurl+url).then((response)=> {
//            result1 = convert.xml2json(response.data, {compact: true, spaces: 4});
//        })
//        .then(()=> {
//            var a = JSON.parse(result1);
//            courses_json = a["ns2:course"];
//        })
//        .then(()=> {
//            course["description"] = courses_json["description"];
//            course["creditHours"] = courses_json["creditHours"];
//            course["courseSectionInformation"] = courses_json["courseSectionInformation"];
//            var len = courses_json["detailedSections"]["detailedSection"].length;
//            course["instructor"] = [];
//            for(var i=0;i<len;i++) {
//                var firstname = courses_json["detailedSections"]["detailedSection"][i]["meetings"]["meeting"]["instructors"]["instructor"]["_attributes"]["firstName"];
//                var lastname = courses_json["detailedSections"]["detailedSection"][i]["meetings"]["meeting"]["instructors"]["instructor"]["_attributes"]["lastName"];
//                var name = firstname+" "+lastname;
//                if(course["instructor"].indexOf(name)==-1) {
//                    course["instructor"].push(name);
//                }
//            }
//        })
//        .then(()=>{
//           console.log(course); 
//        });
        
        var classtotal = "cs498 The Art of Web Programming";// the class id
        var classid = classtotal.substring(2,5);
        var classname = classtotal.substring(6, classtotal.length);
        console.log(classid);
        console.log(classname);
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        var year = "2017";
        var semester = "fall";
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
            var len = courses_json["detailedSections"]["detailedSection"].length;
            course["instructor"] = [];
            course["creditHours"] = "N/A";
            for(var i=0;i<len;i++) {
                var firstname = [];
                var lastname = [];
                if(courses_json["detailedSections"]["detailedSection"][i]["sectionTitle"]["_text"]===classname) {
                    if(courses_json["detailedSections"]["detailedSection"][i]["sectionText"]!=undefined) {
                        course["description"] = courses_json["detailedSections"]["detailedSection"][i]["sectionText"]["_text"];
                    }
                    else {
                        course["description"] = courses_json["detailedSections"]["detailedSection"][i]["sectionTitle"]["_text"];
                    }
                    
                    if(courses_json["detailedSections"]["detailedSection"][i]["creditHours"]!=undefined) {
                        course["creditHours"] = courses_json["detailedSections"]["detailedSection"][i]["creditHours"]["_text"];
                    }
        
                    course["courseSectionInformation"] = courses_json["courseSectionInformation"]["_text"];
                    var temparr = courses_json["detailedSections"]["detailedSection"][i]["meetings"]["meeting"]["instructors"]["instructor"];
                    if(temparr.length!=undefined) {
                        for(var j=0;j<temparr.length;j++) {
                            firstname.push(temparr[j]["_attributes"]["firstName"]);
                            lastname.push(temparr[j]["_attributes"]["lastName"]);
                        }
                        for(var j=0;j<firstname.length;j++) {
                            var name = firstname[j]+" "+lastname[j];
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
            }
        })
        .then(()=>{
           console.log(course);
        });
    }
    
    render() {
        return(
            <h1>wawa</h1>
        )
    }
}

export default API
