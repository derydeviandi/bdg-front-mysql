import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from '../config/axios'
import { isNull } from 'util'

export class Profile extends Component {

    state = {
        profile: null // {id, username, email, password, avatar, verified}
    }

    componentDidMount() {
        // Get user
        axios.get(`/users/profile/${this.props.username}`)
            .then(res => {
                this.setState({profile: res.data})

            }).catch(err => {
                console.log(err)

            })
    }

    render() {
        if(!isNull(this.state.profile)){
            let {username, name, email, avatar} = this.state.profile
            return (
                <div>
                    <img src={avatar} alt={name}/>
                    <h1>Hello, {name}</h1>
                    <p>{username} | {name} | {email}</p>
                </div>
            )
        }

        return <h1>Loading ...</h1>
    }
}

const mapStateToProps = state => {
    return {
        username: state.auth.username
    }
}

export default connect(mapStateToProps)(Profile)
