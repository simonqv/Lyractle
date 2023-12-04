
function HamburgerView(props) {
    return (
        <div>
            <button onClick={logoutACB()}>Log out</button>
        </div>
    )

    function logoutACB() {
        props.onLogout()
    }
}