import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../config/axios'
import { isNull } from 'util'

export class EditProfile extends Component {

    state = {
        profile: null
    }


    componentDidMount() {
        axios.get(`/users/profile/${this.props.username}`)
            .then(res => {
                this.setState({ profile: res.data })
            }).catch(err => {
                console.log(err)
            })
    }

    updateProfile = () => {
        // Membuat objek dari class FormData
        let formData = new FormData()

        let _name = this.name.value
        let _email = this.email.value
        let _password = this.password.value
        let _avatar = this.avatar.files[0]

        // Membuat properties untuk formData
        // Kita menggunakan form data, karena akan mengirim sebuah file
        formData.append("name", _name)
        formData.append("email", _email)
        if (_password) formData.append("password", _password)
        if (_avatar) formData.append("avatar", _avatar)

        axios.patch(`/users/${this.props.username}`, formData)
            .then(res => {
                console.log(res)

            }).catch(err => {
                console.log(err)

            })


    }

    render() {
        if (!isNull(this.state.profile)) {
            let { name, email } = this.state.profile
            return (
                <div className='container'>
                    <form className="form-group">
                        <h1>Edit Profile</h1>

                        <h3>Name</h3>
                        <input ref={(input) => this.name = input} className="form-control" type="text" defaultValue={name} />

                        <h3>Email</h3>
                        <input ref={(input) => this.email = input} className="form-control" type="email" defaultValue={email} />

                        <h3>Password</h3>
                        <input ref={(input) => this.password = input} className="form-control" type="password" />


                        <div class="form-group mt-4">
                            <input ref={(input) => this.avatar = input} type="file" class="form-control-file" id="exampleFormControlFile1" />
                        </div>

                        {/* <div className="custom-file mt-4">
                            <input ref={(input) => this.avatar = input} id="customFileLang"  className="custom-file-input" type="file"/>
                            <label className="custom-file-label" htmlFor="customFileLang">Please insert file</label>
                        </div> */}

                    </form>
                    <button onClick={this.updateProfile} className="mt-5 btn-block btn btn-outline-primary">Save</button>
                </div>
            )
        }

        return <h1>Loading ...</h1>
    }
}

const mapStateToProps = state => {
    return {
        username: state.auth.username,
        id: state.auth.id
    }
}

export default connect(mapStateToProps)(EditProfile)


// name
// email
// password
// avatar