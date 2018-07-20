import React, {Component} from 'react';
import {Grid} from 'semantic-ui-react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {auth, firestore} from '../services/firebase/firebase'
import './App.css';
import * as constants from '../configs/constants'
import Login from './Login/Login'
import Home from './Home/Home'
import CurrentTask from './CurrentTask/CurrentTask'
import Tasks from './Tasks/Tasks'


class App extends Component {

    state = {
        user: undefined,
        tasks: [],
        smallTask: undefined,
        mediumTask: undefined,
        largeTask: undefined
    };


    componentDidMount() {
        this.unregisterAuthObserver = auth.onAuthStateChanged(user => {
            if (user) {

                this.setState({user});

                this.unregisterCollectionObserver = firestore.collection('tasks')
                    .where('uid', '==', user.uid).onSnapshot(query => {
                        const tasks = query.docs.map(doc => ({
                            id: doc.id,
                            description: doc.data().description,
                            duration: doc.data().duration,
                            priority: doc.data().priority,
                            score: App._scoreTaskFromModel(doc.data())
                        }));


                        const smallTask = App._deriveSmallTask(tasks);
                        const mediumTask = App._deriveMediumTask(tasks);
                        const largeTask = App._deriveLargeTask(tasks);

                        this.setState({tasks, smallTask, mediumTask, largeTask})
                    })

            } else this.setState({user: null});

        });
    }

    static _scoreTaskFromModel(taskModel) {
        const priorityScore = constants.TASK_PRIORITY_SCORES[taskModel.priority];
        const durationScore = constants.TASK_DURATION_SCORES[taskModel.duration];

        return priorityScore * durationScore
    }

    static _deriveSmallTask(tasks) {
        return tasks.sort((left, right) => left.score - right.score).find(task => task.duration === constants.TASK_ENUM_DURATION_SMALL)
    }

    static _deriveMediumTask(tasks) {
        return tasks.sort((left, right) => left.score - right.score).find(task => task.duration === constants.TASK_ENUM_DURATION_MEDIUM)
    }

    static _deriveLargeTask(tasks) {
        return tasks.sort((left, right) => left.score - right.score).find(task => task.duration === constants.TASK_ENUM_DURATION_LARGE)
    }

    componentWillUnmount() {
        this.unregisterAuthObserver();
        this.unregisterCollectionObserver();
    }

    handleTaskAdd = (addedTask) => firestore.collection('tasks').add({
        description: addedTask.description,
        duration: addedTask.duration,
        priority: addedTask.priority,
        uid: this.state.user.uid
    });

    handleTaskDelete = (taskId) => firestore.collection('tasks').doc(taskId).delete();

    handleTaskUpdate = (taskData) => firestore.collection('tasks').doc(taskData.id).update(taskData);

    render() {
        return (
            <BrowserRouter>
                <Grid textAlign='center' style={{height: '100%'}}>
                    <Grid.Column style={{maxWidth: 350}}>
                        <Switch>
                            <Route exact path='/' component={Login}/>
                            <Route exact path='/home' render={() => <Home user={this.state.user}/>}/>

                            <Route exact path={'/current_task/' + constants.TASK_ENUM_DURATION_SMALL}
                                   render={() => <CurrentTask task={this.state.smallTask}/>}/>
                            <Route exact path={'/current_task/' + constants.TASK_ENUM_DURATION_MEDIUM}
                                   render={() => <CurrentTask task={this.state.mediumTask}/>}/>
                            <Route exact path={'/current_task/' + constants.TASK_ENUM_DURATION_LARGE}
                                   render={() => <CurrentTask task={this.state.largeTask}/>}/>

                            <Route exact path='/tasks' render={() => <Tasks user={this.state.user}
                                                                            tasks={this.state.tasks}
                                                                            handleTaskAdd={this.handleTaskAdd}
                                                                            handleTaskDelete={this.handleTaskDelete}
                                                                            handleTaskUpdate={this.handleTaskUpdate}/>}/>
                        </Switch>
                    </Grid.Column>
                </Grid>
            </BrowserRouter>
        );
    }
}


export default App;
