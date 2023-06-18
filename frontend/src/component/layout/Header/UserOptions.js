import React, { Fragment, useState } from 'react'
import './Header.scss'
import { SpeedDial, SpeedDialAction } from '@material-ui/lab'
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import profile from '../../../images/profile.png'
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const UserOptions = ({ user }) => {
    const { cartItems } = useSelector((state) => state.cart);
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const alert = useAlert();
    const dispatch = useDispatch();

    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        {
            icon: <ShoppingCartIcon
                style={{ color: cartItems.length > 0 ? "tomato" : "unset" }} />,
            name: `Cart(${cartItems.length})`,
            func: cart,
        },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ];

    if (user.role === "admin") {
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashboard,
        });//adds this element to the start of the array
    }

    //when you click on dashboard , you get redirected to dashboard url, and simlarly for orders,account,logout and cart
    function dashboard() {
        history.push("/admin/dashboard");
    }
    function orders() {
        history.push("/orders");
    }
    function account() {
        history.push("/account");
    }
    function cart() {
        history.push("/cart");
    }
    function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successfully");
    }

    return (
        <Fragment>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                ariaLabel="SpeedDial tooltip example" 
                className='speedDial'
                // sx={{ position: 'absolute', bottom: 16, right: 16 }}
                style={{ zIndex: "11" }}
                icon={<img
                    className='speedDialIcon'
                    src={user.avatar.url ? user.avatar.url : profile}
                    alt='Profile'
                />}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction='up'
            >
                {
                    options.map((option) => (
                        <SpeedDialAction
                            key={option.name}
                            icon={option.icon}
                            tooltipTitle={option.name} 
                            onClick={option.func}
                        />
                    ))
                }
            </SpeedDial>
        </Fragment>
    )
}

export default UserOptions