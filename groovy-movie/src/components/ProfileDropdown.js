import React, { Component } from 'react';
import { Dropdown, Image } from 'semantic-ui-react';

const trigger = (username) => {
	return [
		<Image rounded src='imgs/avatar.jpg' size='mini' />
	];
};


class ProfileDropdown extends Component {
	render() {
		const { username, logoutUser } = this.props;

		return (
		  <Dropdown trigger={trigger(username)} pointing='top right' icon={null} >
		  	<Dropdown.Menu>
		      <Dropdown.Item text='Account' icon='user' />
		      <Dropdown.Item text='Settings' icon='settings' />
		      <Dropdown.Item text='Logout' icon='sign out' onClick={logoutUser} />
		    </Dropdown.Menu>
		  </Dropdown>
		);
	}
}


export default ProfileDropdown;