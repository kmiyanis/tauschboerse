import React from 'react';
import PropTypes from 'prop-types';

import SaveIcon from 'material-ui/svg-icons/content/save';

import ApplicationBar from '../../containers/ApplicationBar';
import UserDetailsBox from '../UserDetailsBox/UserDetailsBox';
import UserPasswordBox from '../UserPasswordBox/UserPasswordBox';
import PageButton from '../PageButton/PageButton';

import { INFO_MESSAGE } from '../../model/GlobalMessageParams';

import ContentContainer from '../ContentContainer/ContentContainer';

import userDetailsValidator from '../../../shared/validations/userDetails';
import Gender from '../../../shared/constants/Gender';

import './UserFormPage.css';

export default class UserFormPage extends React.Component {

    static propTypes = {
        updateUser: PropTypes.func.isRequired,
        setGlobalMessage: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        loading: PropTypes.bool.isRequired
    };

    state = {
        gender: Gender.MALE,
        name: '',
        email: '',
        address: '',
        currentPassword: '',
        newPassword: '',
        passwordConfirmation: '',
        changePassword: false,
        errors: {},
        modified: false
    };

    componentDidMount() {
        const { gender, name, email, address } = this.props.user;
        this.setState({ gender, name, email, address });
    }

    onChange = (theEvent) => {
        this.setState({
            [theEvent.target.name]: theEvent.target.value,
            modified: true
        });
    };

    onGenderSelectionChange = (theEvent, theKey, theValue) => {
        this.setState({
            gender: theValue,
            modified: true
        });
    };

    onPasswordChangeToggled = () => {
        const newChangePasswordState = !this.state.changePassword;
        this.setState({
            changePassword: newChangePasswordState,
            currentPassword: !newChangePasswordState ? '' : this.state.currentPassword,
            newPassword: !newChangePasswordState ? '' : this.state.newPassword,
            passwordConfirmation: !newChangePasswordState ? '' : this.state.passwordConfirmation,
            errors: {
                gender: this.state.errors.gender,
                name: this.state.errors.name,
                email: this.state.errors.email,
                address: this.state.errors.address,
                currentPassword: !newChangePasswordState ? undefined : this.state.errors.currentPassword,
                newPassword: !newChangePasswordState ? undefined : this.state.errors.newPassword,
                passwordConfirmation: !newChangePasswordState ? undefined : this.state.errors.passwordConfirmation,
            }
        });
    };

    onSubmit = (theEvent) => {
        theEvent.preventDefault();
        const { gender, name, email, address, currentPassword, newPassword, passwordConfirmation } = this.state;
        const { _id, registration } = this.props.user;
        const user = { gender, name, email, address, registration, currentPassword, newPassword, passwordConfirmation };
        user._id = _id;
        const validation = userDetailsValidator.validate(user);
        if (validation.isValid) {
            this.props.updateUser(user)
                .then(() => {
                    if (this.state.changePassword) {
                        this.onPasswordChangeToggled();
                    }
                    this.setState({
                        errors: {},
                        modified: false
                    });
                    this.props.setGlobalMessage('Benutzerdaten wurden gespeichert.', INFO_MESSAGE);
                })
                .catch((err) => {
                    this.setState({ errors: err.response.data.errors || {} })
                });
        }
        else {
            this.setState({ errors: validation.errors });
        }
    };

    render() {
        const { loading, user } = this.props;
        const { gender, name, email, address, currentPassword, newPassword, passwordConfirmation, changePassword, errors, modified } = this.state;
        const { registration } = user;
        const userDetails = { gender, name, email, address, registration, changePassword, currentPassword, newPassword, passwordConfirmation };
        return (
            <div>
                <ApplicationBar subtitle="Mein Konto verwalten"/>
                <ContentContainer>
                    <form className="user-form" onSubmit={this.onSubmit}>
                        <UserDetailsBox
                            userDetails={userDetails}
                            errors={errors}
                            loading={loading}
                            onChange={this.onChange}
                            onGenderSelectionChange={this.onGenderSelectionChange}
                            onSubmit={this.onSubmit}/>
                        <UserPasswordBox
                            userDetails={userDetails}
                            errors={errors}
                            loading={loading}
                            onChange={this.onChange}
                            onPasswordChangeChecked={this.onPasswordChangeToggled}
                            onSubmit={this.onSubmit}/>
                        <PageButton isSubmit={true} disabled={loading || !modified}>
                            <SaveIcon/>
                        </PageButton>
                    </form>
                </ContentContainer>
            </div>
        );
    }
}
