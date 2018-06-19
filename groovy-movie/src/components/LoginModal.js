import React, { Component } from 'react';
import { Modal, Button, Input, Icon, Grid } from 'semantic-ui-react';

class LoginModal extends Component {
	constructor(props) {
		super(props);
		this.state = { modalOpen: false };
		this.username = React.createRef();	
		this.password = React.createRef();	
	}

  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });

  logIn = (e) => {
		const username = this.username.current.inputRef;
    const password = this.password.current.inputRef;
    const creds = { username: username.value.trim(), password: password.value.trim() };
    console.log(creds);
    this.props.onLoginClick(creds);
  };

	render() {
		const { modalOpen } = this.state;
		const { errorMessage, isFetching } = this.props;

		return (
			<Modal 
				trigger={<Button onClick={this.handleOpen}>Log-in</Button>}
				open={modalOpen}
        onClose={this.handleClose} 
        size='mini'
        closeIcon
      >
		    <Modal.Header>Log-in</Modal.Header>
		    <Modal.Content>
					<Grid>
						<Grid.Row columns={1} centered>
							<Grid.Column>
								<Input 
									icon='user' 
									iconPosition='left'
									placeholder='Username' 
									fluid
									size='big'
									ref={this.username} />
							</Grid.Column>
						</Grid.Row>
						<Grid.Row columns={1} centered>
							<Grid.Column>
								<Input 
									type='password'
							    icon='shield' 
							    iconPosition='left'
							    placeholder='Password' 
							    fluid
							    size='big'
							    ref={this.password} />
							  {errorMessage &&
									<p style={{ color: '#E3192A'}}>{errorMessage}</p>
							  }
							 </Grid.Column>
						</Grid.Row>
						<Grid.Row columns={1} centered>
							<Grid.Column>
					    	<Button primary fluid onClick={this.logIn} loading={isFetching} size='big' >Login</Button>
							</Grid.Column>
						</Grid.Row>
					</Grid>
		    </Modal.Content>
		  </Modal>
		);
	}
}

export default LoginModal;