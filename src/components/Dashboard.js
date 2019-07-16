import React from 'react';
import { Grid, Typography, Avatar, FormControlLabel, Switch, createStyles } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { updateDeviceState, getDashboardInfo } from "../api/graphqlAPI";

const styles = () => createStyles({
    root: {
        height: '100vh',
        padding: '30px'
    }
})

class DashboardComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            on: false,
            blinkingMode: false,
            user: null,
            isLoaded: false,
        }
    }

    async componentWillMount() {
        const result =  await getDashboardInfo()
        this.setState({
            ...result,
            isLoaded: true,
        })
    }

    renderUserProfile = () => {
        const { classes } = this.props
        const { user } = this.state
        return user &&
            <>
                <Grid item xs={12}>
                    <Avatar className={classes.avatar}>
                        {user.firstName[0]}{user.lastName[0]}
                    </Avatar>
                </Grid>
                <Grid item xs={12}>
                    <Typography>{user.firstName} {user.lastName}</Typography>
                </Grid>
            </>
    }

    renderOnToggle = () => {
        const { classes } = this.props
        const { on } = this.state
        return (
            <Grid item xs={12}>
                <Typography>Light State</Typography>
                <FormControlLabel
                    label={`${on ? 'On' : 'Off'}`}
                    control={
                        <Switch
                            checked={on}
                            onChange={this.handleToggle('on')}
                            value="on"
                        />
                    }
                />
            </Grid>
        )
    }

    renderBlinkingModeToggle = () => {
        const { classes } = this.props
        const { blinkingMode, on } = this.state
        return (
            <Grid item xs={12}>
                <Typography>Blinking Mode</Typography>
                <FormControlLabel
                    label={`${blinkingMode ? 'On' : 'Off'}`}
                    control={
                        <Switch
                            disabled={!on}
                            checked={blinkingMode}
                            onChange={this.handleToggle('blinkingMode')}
                            value="blinkingMode"
                        />
                    }
                />
            </Grid>
        )
    }

    handleToggle = (name) => async e => {
        const value = e.target.checked
        await updateDeviceState(name, value)
        this.setState({
            [name]: value,
        })
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                {this.state.isLoaded &&
                    <Grid container>
                        {this.renderUserProfile()}
                        {this.renderOnToggle()}
                        {this.renderBlinkingModeToggle()}
                    </Grid>
                }
            </div>
        )
    }
}

const Dashboard = withStyles(styles)(DashboardComponent)

export { Dashboard }
