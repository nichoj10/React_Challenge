import React from 'react';
import ReactDOM from 'react-dom';
import './layout.css';

class Unit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  	var imageFirst = this.props.details.imageFirst;
    return (
	    <div className="container" style={{background: this.props.details.backgroundColor, color: this.props.details.textColor}}>
			{imageFirst ? (
	    		<div className="box" style={{flexWrap: "wrap-reverse"}}>
	    			<img className="image" src={this.props.details.image} />
	    			<div className="allText">
		    			<h2>{this.props.details.title}</h2>
		    			<div>{this.props.details.text}</div>
		    		</div>
		    	</div>
	    	) : (
	    		<div className="box" style={{flexWrap: "wrap"}}>
	    			<div className="allText">
		    			<h2>{this.props.details.title}</h2>
		    			<div>{this.props.details.text}</div>
		    		</div>
		    		<img className="image" src={this.props.details.image} />
		    	</div>			
	    	)}
	    </div>
	);
  }
}

const Arrow = ({ image, direction, clickFunction}) => (
  <img src={ image } onClick={ clickFunction } />
);

class Carousel extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			carouselView: false,
			currentImageIndex: 0
		};
		this.nextSlide = this.nextSlide.bind(this);
		this.previousSlide = this.previousSlide.bind(this);
	}

	previousSlide () {
		const lastIndex = 2;
		const { currentImageIndex } = this.state;
		const shouldResetIndex = currentImageIndex === 0;
		const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;

		this.setState({
			currentImageIndex: index
		});
	}

	nextSlide() {
		const lastIndex = 2;
		const { currentImageIndex } = this.state;
		const shouldResetIndex = currentImageIndex === lastIndex;
		const index = shouldResetIndex ? 0 : currentImageIndex + 1;

		this.setState({
			currentImageIndex: index
		});
	}

	switchView() {
		this.setState({
			carouselView: !this.state.carouselView
		});
	}

	render () {
		var otherState;
		if (this.state.carouselView) {
			otherState = "List"; 
		} else { otherState = "Carousel"; }
		return (
			<div>
				<button className="button" onClick={() => { this.switchView(); }}>Switch to {otherState}!</button>
				{this.state.carouselView ? ( // Carousel!
					<div>
						<div className="arrowContainer">
							<Arrow className="arrow" image="./Photos/left.svg" direction="left" clickFunction={ this.previousSlide } />
							<Arrow className="arrow" image="./Photos/right.svg" direction="right" clickFunction={ this.nextSlide } />
						</div>
						<Unit details={this.props.list[this.state.currentImageIndex]} />
					</div>
				) : ( // No Carousel!
					<div>
						<Unit details={this.props.list[0]} />
						<Unit details={this.props.list[1]} />
						<Unit details={this.props.list[2]} />
					</div>
				)}
			</div>
		);
	}
}

// mutable details for the first container
var container0 = {
	title: "Monsoon III",
	text: "Lorem ipsum dolor sit amet, consectetur adopiscing elit. Donec tincidunt ipsum augue. In faucibus vehicula magna pulvinar aliquam. Cras aliquam feugiat lorem non auctor. Quisque sed lorem egestas mauris venenatis commodo eu id nibh. Ut porta libero sed semper faucibus.",
	image: "./Photos/Monsoon.jpg",
	backgroundColor: "white",
	textColor: "black",
	imageFirst: true,
};

// mutable details for the second container
var container1 = {
	title: "Beams",
	text: "Lorem ipsum dolor sit amet, consectetur adopiscing elit. Donec tincidunt ipsum augue. In faucibus vehicula magna pulvinar aliquam. Cras aliquam feugiat lorem non auctor. Quisque sed lorem egestas mauris venenatis commodo eu id nibh. Ut porta libero sed semper faucibus.",
	image: "./Photos/Beams.jpg",
	backgroundColor: "grey",
	textColor: "white",
	imageFirst: false,
};

// mutable details for the third container
var container2 = {
	title: "Move 2",
	text: "Lorem ipsum dolor sit amet, consectetur adopiscing elit. Donec tincidunt ipsum augue. In faucibus vehicula magna pulvinar aliquam. Cras aliquam feugiat lorem non auctor. Quisque sed lorem egestas mauris venenatis commodo eu id nibh. Ut porta libero sed semper faucibus.",
	image: "./Photos/Move.jpg",
	backgroundColor: "lightgrey",
	textColor: "white",
	imageFirst: true,
};

var listDetails = [container0, container1, container2];

ReactDOM.render(
	<div>
		<Carousel list={listDetails} />
	</div>,
	document.getElementById('vimeoapp'),
);