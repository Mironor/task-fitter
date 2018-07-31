import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Container, Divider, Statistic, Header, Button} from 'semantic-ui-react';

class CurrentTask extends Component {

    state = {
        secondsLeft: 300,
        time: CurrentTask.secondsToTime(300)
    };

    timer = undefined;

    static secondsToTime(secs){
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        return {
            hours,
            minutes,
            seconds
        };
    }

    componentDidMount() {
        this.startTimer()
    }

    startTimer() {
        if (!this.timer) this.timer = setInterval(this.countDown.bind(this), 1000);
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let secondsLeft = this.state.secondsLeft - 1;
        this.setState({
            time: CurrentTask.secondsToTime(secondsLeft),
            secondsLeft
        });

        // Check if we're at zero.
        if (secondsLeft === 0) {
            clearInterval(this.timer);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        const paddedMinutes = (this.state.time.minutes < 10) ? '0' + this.state.time.minutes :  this.state.time.minutes;
        const paddedSeconds = (this.state.time.seconds < 10) ? '0' + this.state.time.seconds :  this.state.time.seconds;

        if(this.props.task) return (
            <Container>
                <Container textAlign='left'>
                    <Link to='/home'>Back</Link>
                </Container>
                <Divider/>
                <Header>
                    {this.props.task.description}
                </Header>

                <Statistic>
                    <Statistic.Value>{paddedMinutes}:{paddedSeconds}</Statistic.Value>
                    <Statistic.Label>Time left</Statistic.Label>
                </Statistic>

                <Button.Group basic>
                    <Button basic onClick={() => this.setState({_updating: true})}>
                        Update
                    </Button>
                    <Button basic onClick={() => this.props.handleTaskDelete(this.props.id)}>
                        Delete
                    </Button>
                </Button.Group>
            </Container>
        );
        else return (<div>Loading</div>)
    }
}

export default CurrentTask