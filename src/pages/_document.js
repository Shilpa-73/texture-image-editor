import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";


export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"/>
        <Script src="https://getbootstrap.com/docs/4.3/assets/js/vendor/jquery-slim.min.js"/>
        
      <Script src="https://getbootstrap.com/docs/4.3/dist/js/bootstrap.bundle.min.js" 
      integrity="sha384-xrRywqdh3PHs8keKZN+8zzc5TX0GRTLCcmivcbNJWm2rs5C8PRhcEn3czEjhAO9o" crossorigin="anonymous"/>
      
      <Script>
        {
          // `document.addEventListener('click',(e)=>{

          // //Document Clicked
          // console.log({documentClicked: true});
          //   let modal = document.querySelector('.react-colorful');

          //       if (modal && !modal.contains(e.target)) {
          //         modal.remove();
          //       }
          // })`
        }
      </Script>

      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossorigin="anonymous"></link>
      </Head>
      <body>
        
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
