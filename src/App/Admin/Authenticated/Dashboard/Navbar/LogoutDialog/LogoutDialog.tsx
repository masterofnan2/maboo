import React from "react";
import { Modal } from "react-bootstrap";
import Button from "../../../../../../utilities/minitiatures/Button/Button";
import { useLogout } from "../Navbar";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../../../../utilities/redux/admin/adminSlice";

const LogoutDialog = React.memo(() => {
    const logout = useLogout();
    const dispatch = useDispatch();

    const handleLogout = React.useCallback(() => {
        dispatch(setAuth(false));
        localStorage.removeItem('AdminToken');
    }, []);

    return <Modal show={logout.show} centered onHide={logout.toggle}>
        <Modal.Header>
            <div>
                <i className="fa fa-power-off"></i> Déconnexion
                <p>Vous allez être déconnecté(e), continuer ?</p>
            </div>
        </Modal.Header>
        <Modal.Footer>
            <Button
                type="button"
                className="btn btn-sm btn-outline-dark"
                onClick={logout.toggle}>Annuler</Button>
            <Button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={handleLogout}><i className="fa fa-power-off"></i> Se déconnecter</Button>
        </Modal.Footer>
    </Modal>
});

export default LogoutDialog;