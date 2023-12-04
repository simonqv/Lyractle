
function HamburgerView(props) {
    return (
        <div>
            <button onClick={logoutACB}>log out</button>
        </div>
    )

    function logoutACB() {
        props.onLogout()
    }
}

export default HamburgerView