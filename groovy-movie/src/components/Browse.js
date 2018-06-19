import React, { Component } from 'react';
import { Grid, Dimmer, Loader, Container } from 'semantic-ui-react';
import { MovieCard } from '../components';

class Browse extends Component {
	componentDidMount() {
		if (this.props.movies.browseOrder.length === 0)
			this.props.loadBrowseMovies();
	}

	render() {
		const { isFetching, browseOrder, moviesById } = this.props.movies;

		let html = [];
		if (!isFetching) {
			for (let i = 0; i < browseOrder.length/5; i++) {
				html.push(
					<Grid.Row key={i} columns={5} centered>
						{browseOrder.slice(i*5, i*5+5).map(id => ( 
							<Grid.Column key={moviesById[id].title}>
								<MovieCard 
									movie={moviesById[id]} 
									watchMovie={this.props.watchMovie}
									bookmarkMovie={this.props.bookmarkMovie}
									unBookmarkMovie={this.props.unBookmarkMovie}
								/>
							</Grid.Column> 
						))}
					</Grid.Row>
				);
			}
		}


		return (
			<span>
				{isFetching &&
					<Dimmer active inverted>
			      <Loader content='Loading' inverted />
			    </Dimmer>
				}
				{isFetching &&
					<div style={{ height: '100vh'}}></div>
				}
				{!isFetching &&
					<Grid padded>
						{html}
					</Grid>
				}
			</span>
		);
	}
}

export default Browse;