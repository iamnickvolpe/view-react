import React, { Component } from "react";
import Moment from 'react-moment';
//import firebase from 'firebase';

class Feed extends Component {
	constructor() {
		super();
		this.state = {
			items: [],
		};
		this.startSlideshow = this.startSlideshow.bind(this);
	}

	startSlideshow(items) {
		clearInterval(this.timer);
		items[0].show = true;
		this.setState({ items: items });
		let i = 0;
		this.timer = setInterval(() => {
			// eslint-disable-next-line
			items.map(function(item) {
				item.show = false;
			});
			i < items.length -1 ? i++ :i=0;
			items[i].show = true;
			this.setState({ items });
		}, 10000);
	}

	componentDidMount() {
		if(this.props.widget.data && this.props.widget.data.items) {
			this.startSlideshow(this.props.widget.data.items);
		}
	}

	componentWillReceiveProps(props) {
		if(props.widget.data && props.widget.data.items) {
			this.startSlideshow(props.widget.data.items);
		}
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
								<div className="font-3 margin-2 normal">{item.origin.title} &bull; <Moment fromNow>{item.published}</Moment></div>
								<div className="font-1 bold">{item.title}</div>
							</div>
						)
					})}
			</div>
		);
	}
}

export default Feed;