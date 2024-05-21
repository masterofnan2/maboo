import React from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Rootstate } from "../../../../utilities/redux/store";
import SmallText from "../../../../utilities/minitiatures/SmallText/SmallText";
import appImage from "../../../../utilities/helpers/appImage";

const account = <><i className="fa fa-user"></i> Compte</>;

const guestActions = <>
    <Dropdown.Item as={Link} to={'/auth/login'}>Se connecter</Dropdown.Item>
    <Dropdown.Item as={Link} to={'/auth/signup'}>S'inscrire</Dropdown.Item>
</>

const authActions = <>
    <Dropdown.Item as={Link} to={'/user/profile'}>Profil</Dropdown.Item>
</>

const UserDropdown = React.memo(() => {
    const user = useSelector((state: Rootstate) => state.customer.auth);

    const userProfile = React.useMemo(() => {
        if (user) {
            return <>
                {user.image ?
                    <img className="user-profile-image" src={appImage(user.image)} /> :
                    <span className="user-profile">
                        {user.name.charAt(0)}
                    </span>} <SmallText maxLength={6} isExtendable={false}>
                    {user.name}
                </SmallText>
            </>
        }
    }, [user]);

    return <Dropdown className="user-dropdown">
        <Dropdown.Toggle variant="btn" className="btn-sm">
            {user ? userProfile : account}
        </Dropdown.Toggle>
        <Dropdown.Menu>
            {user ? authActions : guestActions}
        </Dropdown.Menu>
    </Dropdown>
})

export default UserDropdown;