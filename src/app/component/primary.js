import Script from 'next/script';
const Primary = () => {
    return (

        <>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Vidyasagar Shihu Niketan</title>
            <link rel="stylesheet" href="css/style.css" />
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
            />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
            />
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
                strategy="lazyOnload"
            />
            <Script
                src="http://code.jquery.com/jquery-2.2.1.min.js"
                strategy="beforeInteractive"
            />
            <link rel="icon" type="image/x-icon" href="/image/footer_logo.png"></link>
        </>
    )
}
export default Primary;