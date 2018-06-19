import React, { Component } from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import SearchNavBar from './Search';
import LoginModal from './LoginModal';
import ProfileDropdown from './ProfileDropdown';
 
class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeItem: 'browse'
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e, { name }) {
		this.props.history.push('/'+name);
		this.setState({ activeItem: name });
	}

	render() {
		const { activeItem } = this.state;
		const { isAuth, errorMessage, isFetching, loginUser, logoutUser, username } = this.props;

		return (
			<Menu fluid borderless fixed="top">
				<Menu.Item 
					name="browse" 
					active={activeItem === 'browse'} 
					onClick={this.handleClick} >
					Browse
				</Menu.Item>
				<Menu.Item 
					name="collections" 
					active={activeItem === 'collections'} 
					onClick={this.handleClick} >
					Collections
				</Menu.Item>
				<Menu.Menu position='right'>
					<Menu.Item>
						<SearchNavBar />
					</Menu.Item>
					{!isAuth &&
						<Menu.Item>
				      <Button primary>Sign up</Button>
				    </Menu.Item>
					}
					{!isAuth &&
				    <Menu.Item>
				    	<LoginModal 
				    		isFetching={isFetching} 
				    		errorMessage={errorMessage} 
				    		onLoginClick={loginUser} />
				    </Menu.Item>
				 	}
				 	{isAuth &&
						<Menu.Item>
							<ProfileDropdown 
								username={username} 
								logoutUser={logoutUser} />
						</Menu.Item>
				 	}
				
				</Menu.Menu>
			</Menu>
		);
	}
}

export default withRouter(NavBar);