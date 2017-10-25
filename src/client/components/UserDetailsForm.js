import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from 'material-ui/Checkbox';

import InputComponent from '../components/InputComponent';

export default class UserDetailsForm extends React.Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        oldPassword: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        passwordConfirmation: PropTypes.string.isRequired,
        changePassword: PropTypes.bool.isRequired,
        errors: PropTypes.object.isRequired,
        loading: PropTypes.bool.isRequired,
        onChange: PropTypes.func.isRequired,
        onPasswordChangeChecked: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    render() {
        const { name, email, oldPassword, password, passwordConfirmation, changePassword, errors, loading, onChange, onPasswordChangeChecked, onSubmit } = this.props;
        const inputStyles = { width: '350px' };
        const formStyles = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        };
        return (
            <form style={formStyles} onSubmit={onSubmit}>
                <InputComponent
                    style={inputStyles}
                    error={errors.name}
                    label="Name"
                    onChange={onChange}
                    value={name}
                    field="name"
                    disabled={loading}
                />
                <InputComponent
                    style={inputStyles}
                    error={errors.email}
                    label="E-Mail"
                    onChange={onChange}
                    value={email}
                    field="email"
                    disabled={loading}
                />
                <br/>
                <Checkbox
                    style={inputStyles}
                    label="Passwort ändern"
                    checked={changePassword}
                    onCheck={onPasswordChangeChecked}
                />
                {changePassword && <InputComponent
                    style={inputStyles}
                    error={errors.oldPassword}
                    label="Bisheriges Passwort"
                    onChange={onChange}
                    value={oldPassword}
                    field="oldPassword"
                    type="password"
                    disabled={loading}
                />}
                {changePassword && <InputComponent
                    style={inputStyles}
                    error={errors.password}
                    label="Neues Passwort"
                    onChange={onChange}
                    value={password}
                    field="password"
                    type="password"
                    disabled={loading}
                />}
                {changePassword && <InputComponent
                    style={inputStyles}
                    error={errors.passwordConfirmation}
                    label="Neues Passwort bestätigen"
                    onChange={onChange}
                    value={passwordConfirmation}
                    field="passwordConfirmation"
                    type="password"
                    disabled={loading}
                />}
                <br/>
                {this.props.children}
            </form>
        );
    }
}
