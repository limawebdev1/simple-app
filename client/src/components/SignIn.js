import React from 'react';
import {createStyles, Grid, TextField, Typography, Button} from '@material-ui/core';
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => createStyles({
    root: {
        height: '100vh',
        padding: '30px'
    }
})

class SignInComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: null,
            password: null,
        }
    }

    handleTextFieldChange = name => (e) => {
        this.setState({
            [name]: e.target.value
        })
    }

    handleSignIn = () => {

    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography>Super Pretty App</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            onChange={this.handleTextFieldChange('email')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            onChange={this.handleTextFieldChange('password')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            size="large"
                            variant="contained"
                            onClick={this.handleSignIn}
                        >
                            Sign In
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const SignIn = withStyles(styles)(SignInComponent)

export {
    SignIn
}
