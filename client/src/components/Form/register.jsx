import React from 'react';

//---------------- HELPER ----------------\\
import submitHelper from './Helper/Register/submitHelper';
import checkData from './Helper/Register/checkData';

//---------------- SVG ----------------\\
import user from './image_svg/register.svg';
import success from './image_svg/success.svg';

// register form if right side is clicked will switch to login form 
export class Register extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            fullName:     '',
            userName:     '',
            address:      '',
            password:     '',
            confPassword: '',
            error: '',
            regSuccess: false
        }
    }
       
    handleFullnameChange = event => { this.setState({ fullName: event.target.value }) }
    
    handleUsernameChange = event => { this.setState({ userName: event.target.value }) }
    
    handleAddressChange = event => { this.setState({ address: event.target.value }) }
    
    handlePasswordChange = event => { this.setState({ password: event.target.value }) }
    
    handleConfpasswordChange = event => { this.setState({ confPassword: event.target.value }) }

    handleSubmit = event => {    
        var data = JSON.stringify({"fullName": this.state.fullName,
                                "userName": this.state.userName,
                                "address":  this.state.address,
                                "password": this.state.password,
                                "confPassword": this.state.confPassword
                                });
        
        if(checkData(this, data)) {
            submitHelper(this, data)
                .then((message) => console.log(message))
                .catch((message) => console.log(message));
        }
        event.preventDefault();
    }

    regAgain = event => {
        
        this.setState ({
            fullName:     '',
            userName:     '',
            address:      '',
            password:     '',
            confPassword: '',
            error: '',
            regSuccess: false
        })
    }

    render() {
        const isRegSuccess = this.state.regSuccess;
        const errorCheck = this.state.error;

        const { fullName, userName, address, password, confPassword } = this.state;

        return(
            <div>
            {isRegSuccess
                ?
                <div className="suc-container">
                    <div className="content">
                        <div className="image">
                            <img src={success}/>
                        </div>
                        <div className="message">
                            Successfully registered:
                        </div>
                        <div className="user-container">
                            <div className="userInfo">
                                {fullName}<br/>{userName}
                            </div>
                        </div>
                        <button type="button" onClick={this.regAgain} className="btn">New Registration</button>
                    </div>
                </div>
                :
                <div className="reg-container" ref={this.props.containerRef}>
                    <div className="header">Register Account</div>
                    <div className="content">
                        <div className="image">
                            <img src={user}/>
                        </div>
                        <div className="form">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    < input type='text' 
                                      value = { fullName }  
                                      onChange = { this.handleFullnameChange } 
                                      placeholder='First and Last Name' 
                                      required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Username</label>
                                    < input type='text' 
                                      value = { userName }  
                                      onChange = { this.handleUsernameChange } 
                                      placeholder='Unique Username' 
                                      required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    < input type='text' 
                                      value = { address }  
                                      onChange = { this.handleAddressChange } 
                                      placeholder = 'U.S. Address' 
                                      required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    < input type='password' 
                                      value = { password }  
                                      onChange = { this.handlePasswordChange } 
                                      placeholder = 'Min-length: 6, 1 Capital, 1 Special' 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    < input type='password' 
                                      value = { confPassword }  
                                      onChange = { this.handleConfpasswordChange } 
                                      placeholder = 'Must match password' 
                                      required 
                                    />
                                </div>
                                <div className="footer">
                                    <button type="submit" className = "btn">
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div>
                            {errorCheck === ''
                            ?
                            <div/>
                            : 
                            <div className="error">
                                {errorCheck}
                            </div>
                            }
                        </div>    
                    </div>
                </div>
            }
            </div>
        );
    }
}
