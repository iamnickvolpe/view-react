import React, { Component } from "react";
import Moment from 'react-moment';

class Feed extends Component {
	render() {
		return (
			<div className="feed">
				{(this.props.widget.data && this.props.widget.data.items) ? this.props.widget.data.items.map((item) => {
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
					}): null}
			</div>
		);
	}
}

export default Feed;