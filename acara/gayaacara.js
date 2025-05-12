document.addEventListener('DOMContentLoaded', function () {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.fontFamily = "Times New Roman";
    document.body.style.backgroundColor = "white";

   
   const navbar = document.getElementById("navbar");
   
   navbar.style.display = "flex";
   navbar.style.position = "fixed";
   navbar.style.flexDirection = "column";
   navbar.style.width = '50px';
   navbar.style.padding = '10px';
   navbar.style.height = '100vh';
   navbar.style.top = '0';
   navbar.style.right = '0';
   navbar.style.backgroundColor = "white";
   navbar.style.justifyContent = "flex-start";
   navbar.style.alignItems = "flex-start";
   navbar.style.borderLeft = "1px solid #ccc";
   
   const linkNavbar = navbar.querySelectorAll("a");
   linkNavbar.forEach(link => {
       link.style.display = "block";
       link.style.width = '100%';
       link.style.marginTop = '20px';
       link.style.color = "";
       link.style.textDecoration = "none";
       
       // Efek hover
       link.addEventListener("mouseover", () => {
           link.style.backgroundColor = "white";
       });
       link.addEventListener("mouseout", () => {
           link.style.backgroundColor = "transparent";
       });
   });

    const navbarAirPutih = document.getElementById("navbarAirPutih");
    navbarAirPutih.style.display = "block";
    navbarAirPutih.style.marginTop = '40vh';
    navbarAirPutih.style.width = '100%';
    navbarAirPutih.style.paddingTop = '20px';



    const header = document.querySelector("header");
    header.style.cssText = `
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        border-bottom: 8px solid #80ff80;
        padding: 20px;
        margin-top: -20px;
        color: #404040;
        background-color: #01b23b;
    `;


    const acaraPiodrink = document.querySelector(".acaraPiodrink");
    acaraPiodrink.style.display = "block";
    acaraPiodrink.style.padding = '20px';
    acaraPiodrink.style.margin = '20px';

    const acaraMinumSehat = document.querySelector(".acaraMinumSehat");
    acaraMinumSehat.style.display = "block";
    acaraMinumSehat.style.padding = '20px';
    acaraMinumSehat.style.margin = '20px';
    acaraMinumSehat.style.backgroundColor = "#80ff80";
    acaraMinumSehat.style.border = "2px solid #ccc";
    acaraMinumSehat.style.borderRadius = '15px';


    const footer = document.querySelector("footer");
    footer.style.cssText = `
        padding: 20px;
        color: #404040;
        background-color: #01b23b;
        border-top: 8px solid #80ff80;
    `;
    
});
