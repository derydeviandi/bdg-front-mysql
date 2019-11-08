import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../config/axios'
import { Redirect } from 'react-router-dom'

export class Home extends Component {

    state = {
        tasks: []
    }
    getTasks = () => {
        axios.get(`/owntasks/${this.props.id}`)
            .then(res => {
                this.setState({ tasks: res.data })

            }).catch(err => {
                console.log(err)

            })
    }

    componentDidMount() {
        this.getTasks()
    }


    addTask = () => {
        // Get data
        let user_id = this.props.id
        let description = this.task.value

        // POST new task
        axios.post(
            `/tasks`,
            {
                description,
                user_id
            }
        ).then(res => {
            this.task.value = ""
            this.getTasks()

        }).catch(err => {
            console.log({ err })

        })
    }

    doneTask = (id) => {
        axios.patch(`/tasks/${id}`, { completed: true })
            .then(res => {
                this.getTasks()
            }).catch(err => {
                console.log(err)
            })
    }

    cancelTask = (id) => {
        axios.patch(`/tasks/${id}`, { completed: false })
            .then(res => {
                this.getTasks()
            }).catch(err => {
                console.log(err)
            })
    }

    deleteTask = (id) => {
        axios.delete(`/tasks/${id}`)
            .then(res => {
                this.getTasks()
            }).catch(err => {
                console.log(err)
            })

    }

    renderList = () => {
        if (this.props.tasks) {
            return this.state.tasks.map(task => {
                if (task.completed) {
                    return (
                        <li onDoubleClick={() => { this.deleteTask(task.id) }} className="list-group-item d-flex justify-content-between">
                            <del>{task.description}</del>
                            <button onClick={() => { this.cancelTask(task.id) }} className="btn btn-outline-danger">Cancel</button>
                        </li>
                    )
                }

                return (
                    <li onDoubleClick={() => { this.deleteTask(task.id) }} className="list-group-item d-flex justify-content-between">
                        <span>{task.description}</span>
                        <button onClick={() => { this.doneTask(task.id) }} className="btn btn-outline-primary">Done</button>
                    </li>
                )
            })
        }
        return 'loading...'
    }

    render() {
        if (this.props.username) {
            return (
                <div className="container">
                    <h1 className="text-center display-4">List Tasks</h1>
                    <ul className="list-group list-group-flush mb-5">
                        {this.renderList()}
                    </ul>

                    <form className="form-group mb-3">
                        <input ref={(input) => this.task = input} type="text" className="form-control" placeholder="You next move ..." />
                    </form>
                    <button
                        className="btn btn-block btn-outline-danger"
                        onClick={this.addTask}
                    >Up!</button>
                </div>
            )
        }

        return <Redirect to='/login' />
    }
}

const mapStateToProps = state => {
    return {
        username: state.auth.username,
        id: state.auth.id
    }
}

export default connect(mapStateToProps)(Home)