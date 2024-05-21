import React from "react";
import { Modal } from "react-bootstrap";

const Search = React.memo(() => {
    const [state, setState] = React.useState({
        show: false
    });

    const toggleShow = React.useCallback(() => setState(s => ({ ...s, show: !s.show })), []);

    return <>
        <button
            type="button"
            className="btn"
            onClick={toggleShow}>
            <i className="fa-solid fa-magnifying-glass"></i>
        </button>

        <Modal show={state.show} onHide={toggleShow}>
            <Modal.Body></Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
    </>

});

export default Search;