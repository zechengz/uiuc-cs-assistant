// GPA table section content wrapper
import React, {Component} from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

/*
	props format:
	{
		dataList: [{profName: String, GPA: Number/D3 Component(?), ARatio, BRatio, CRatio, DRatio} ...]
	}
*/

class GPATableWrapper extends Component {
	constructor (props) {
		super (props);
		this.state = {};
		console.log (props.dataList);
		this.tableContent = this.generateTableContent (props.dataList);
	}

	generateTableContent (dataList) {
		// current assumption: GPA is a number to be displayed in the table
		let tableBodyContent = dataList.map ((elem, index) => {
			let rA = (elem['ARatio'] === undefined) ? "N/A" : String(elem["ARatio"]) + '%';
			let rB = (elem['BRatio'] === undefined) ? "N/A" : String(elem["BRatio"]) + '%';
			let rC = (elem['CRatio'] === undefined) ? "N/A" : String(elem["CRatio"]) + '%';
			let rD = (elem['DRatio'] === undefined) ? "N/A" : String(elem["DRatio"]) + '%';
			return (
				<TableRow key={index}>
				<TableCell>{elem['profName']}</TableCell>
				<TableCell>{elem['GPA']}</TableCell>
				<TableCell>{rA}</TableCell>
				<TableCell>{rB}</TableCell>
				<TableCell>{rC}</TableCell>
				<TableCell>{rD}</TableCell>
			</TableRow>
			);
		});
		console.log (tableBodyContent);
		return tableBodyContent;
	}

	render () {
		if (this.tableContent === undefined) {
			return (<div></div>);
		}
		return (
			<Table>
				<TableHead>
				<TableRow>
					<TableCell>Instructor</TableCell>
					<TableCell>Average GPA</TableCell>
					<TableCell>A Ratio</TableCell>
					<TableCell>B Ratio</TableCell>
					<TableCell>C Ratio</TableCell>
					<TableCell>D Ratio</TableCell>
				</TableRow>
				</TableHead>
				
				<TableBody>
					{this.tableContent}
				</TableBody>
			</Table>
		);
		
	}
}

export default GPATableWrapper

/*
return (
			<Table>
			<TableHeader>
				<TableRow>
				 	<TableHeaderColumn>Professor</TableHeaderColumn>
				 	<TableHeaderColumn>Size</TableHeaderColumn>
				 	<TableHeaderColumn>GPA</TableHeaderColumn>
				</TableRow>
			</TableHeader>
			<TableBody>
				{this.tableContent}
			</TableBody>
			</Table>
		);
*/