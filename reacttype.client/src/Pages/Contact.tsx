import Menu from "../components/Menu.tsx";

const Contact = () => {
    return (
        <>
        <Menu/>
            <h3 style={{ textAlign: 'center' }}>Contact.</h3>

            <p style={{ width: '100%', textAlign: 'left' }}>This application is supported by Jeffrey Lederer.
            The source code depository for this application as at <a href="https://github.com/jeffreylederer/ReactType" target="blank">https://github.com/jeffreylederer/ReactType</a>
         </p>

                <p style={{ width: '100%', textAlign: 'left' }}>
            <address>
                <strong>Support:</strong>   <a href="mailto:jeffrey@winnlederer.com">jeffrey@winnlederer.com</a><br />
                </address>   </p>
        </>
    );
}

export default Contact;