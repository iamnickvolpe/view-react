import React, { Component } from "react";
//import Moment from 'react-moment';
//import firebase from 'firebase';

class Feed extends Component {
	constructor() {
		super();
		this.state = {
			items: [],
		};
	}

	componentDidMount() {
		let items = this.props.widget.data.items;
		items[0].show = true;
		this.setState({ items });

		let i = 0;
		this.timer = setInterval(() => {
			// eslint-disable-next-line
			items.map(function(item) {
				item.show = false;
			});
			i < items.length -1 ? i++ :i=0;
			items[i].show = true;
			this.setState({ items });
		}, 5000);
	}

	render() {
		return (
			<div className="feed">
				{this.state.items.map((item) => {
						return (
							<div 
								className={'feed__item ' + (item.show === true ? 'feed__item--show' : '')} 
								key={item.id}
								style={item.visual && item.visual.url && item.visual.url !== 'none' ?
									{ backgroundImage: `url(${item.visual.url})` }
									: null} 
								>
								<div className="font-1 bold feed__title">{item.title}</div>
							</div>
						)
					})}
			</div>
		);
	}
}

export default Feed;