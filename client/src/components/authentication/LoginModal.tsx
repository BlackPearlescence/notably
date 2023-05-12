import { useSelector } from "react-redux";
import styles from "./LoginModal.module.scss";
import { hideLoginModal, selectIsLoginModalShown } from "../../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Modal } from "react-bootstrap";

export const LoginModal = () => {

    const isLoginShown: boolean = useAppSelector(selectIsLoginModalShown)
    const dispatch = useAppDispatch()

    return(
        <Modal centered show={isLoginShown} onHide={() => dispatch(hideLoginModal())}>
            <Modal.Header></Modal.Header>
        </Modal>
    )
}