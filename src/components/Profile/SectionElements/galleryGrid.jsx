import React, {Component} from 'react';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import styles from '../profile.scss';

class GalleryGrid extends Component {
	constructor (props) {
		super (props);
		this.data = props.data;
		// data should be a array of {profName, imgUrl}
	}

	generateGridTiles (data) {
		let tileList = data.map (function (elem, index) {
			let profName = elem.profName;
			let imgUrl = elem.imgUrl;
			let tileStyle ={
				marginBottom: "20px"
			};
			let imgStyle = {

			};
			return (
				<GridListTile key={index} style={tileStyle} col={1}>
					<img className="imagesss" src={imgUrl} alt="Professor"/>
					<GridListTileBar
						title={profName}/>
				</GridListTile>
			);
		})
		return tileList;
	}

	render () {
		if (this.data === undefined || this.data === null) {
			console.log ("Gallery data is not specified");
			return <div></div>;
		}
		let tileList = this.generateGridTiles (this.data);
		return (
			<div className="galleryContainer">
				<GridList cellHeight={200} className="galleryGridList" col={2}>
					{tileList}
				</GridList>
			</div>
		);
	}
}

export default GalleryGrid;
