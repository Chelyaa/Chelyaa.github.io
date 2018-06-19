import React, { Component } from 'react';
import { Image, Label, Button, Icon, Card, Dropdown } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import './components-style.css';

class MovieCard extends Component {

	handleClick = () => this.props.history.push('/movie');
	handleWatchMovieClick = () => this.props.watchMovie(this.props.movie.id);
	handleBookmarkMovieClick = () => this.props.bookmarkMovie(this.props.movie.id);
	handleUnBookmarkMovieClick = () => this.props.unBookmarkMovie(this.props.movie.id);

	render() {
		const { title, cover, year, watched, bookmark } = this.props.movie;

		return (
			<Card href=''>
		    <Image src={cover}>
					<Dropdown 
						trigger={<Icon name='ellipsis vertical' size='large' inverted />} 
						pointing='top left' 
						icon={null}
						className="movie-card-dropdown-menu"
					>
				  	<Dropdown.Menu>
				  		{watched > 0 &&
					      <Dropdown.Item text='Watch' onClick={this.handleWatchMovieClick} />
				  		}
							{!watched &&
						    <Dropdown.Item text='Add to Watched' onClick={this.handleWatchMovieClick} />
							}
							{!watched &&
					      <Dropdown.Item text='Add to Wishlist' />
							}
							{bookmark &&
					      <Dropdown.Item text='Remove from Bookmarks' onClick={this.handleUnBookmarkMovieClick} />
							}
							{!bookmark &&
					      <Dropdown.Item text='Add to Bookmarks' onClick={this.handleBookmarkMovieClick} />
							}
				    </Dropdown.Menu>
				  </Dropdown>
					<img src={cover} className="ui image movie-card-image" />
					<Label.Group>
						{bookmark &&
							<Label color='blue' attached='top right' icon='bookmark' style={{ borderRadius: 0 }} />
						}
						{watched > 0 &&
							<Label color='teal' attached='bottom right' style={{ borderRadius: 0 }}>
								<Icon name='eye' />
								{watched}
							</Label>
						}
					</Label.Group>
		    </Image>
		    <Card.Content>
		      <Card.Header>{title}</Card.Header>
		      <Card.Meta>{year}</Card.Meta>
		    </Card.Content>
		    <Card.Content extra>
	        <Icon name='eye' />
	        3567
	        <Icon name='star' />
	        7.8
		    </Card.Content>
		  </Card>
		);
	}

}
 
export default withRouter(MovieCard);