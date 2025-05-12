document.addEventListener('DOMContentLoaded', function () {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.fontFamily = "Times New Roman";

   
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
        color: #404040;
        background-color: #01b23b;
    `;
     document.querySelector("header > p").style.marginTop = '-20px';
    
    
    const kontenPopUpNotif = document.querySelector(".popUpNotif");
    kontenPopUpNotif.style.display = "flex";
    kontenPopUpNotif.style.flexDirection = "row";
    kontenPopUpNotif.style.padding = '20px';
    kontenPopUpNotif.style.margin = '20px';
    kontenPopUpNotif.style.backgroundColor= "#80ff80";
    kontenPopUpNotif.style.border = "2px solid #ccc";
    kontenPopUpNotif.style.borderRadius = "15px";

    const kontenPopUpNotifP = document.querySelector(".popUpNotif > p");
    kontenPopUpNotifP.style.paddingTop = '10px';
    
    
    const container = document.querySelector(".container");
    container.style.padding = '20px';
    container.style.textAlign = "center";
    
    
    
    const gambarPio = document.getElementById("gambarPio");
    gambarPio.style.position = "relative";
    gambarPio.style.transition = "transform 0.3s ease";    

    gambarPio.addEventListener("mouseenter", function() {
        gambarPio.style.transform = "scale(1.5)"
    });
    gambarPio.addEventListener("mouseleave", function() {
        gambarPio.style.transform = "scale(1)"
    });

    let posisiGambarPio = 30;
    let arahGambarPio = 0.5;
    const kecepatanGambarPio = 1;
    const batasAtasGambarPio = 0;
    const batasBawahGambarPio = 40;

    function animasiNaikTurun() {
        posisiGambarPio += arahGambarPio * kecepatanGambarPio;

        if (posisiGambarPio >= batasBawahGambarPio || posisiGambarPio <= batasAtasGambarPio) {
            arahGambarPio *= -1;
        }
        gambarPio.style.top = posisiGambarPio + "px";
        requestAnimationFrame(animasiNaikTurun);
    }
    window.onload = animasiNaikTurun;


    const progressKonsumsi = document.getElementById("progressKonsumsi");
    progressKonsumsi.style.setProperty('--progress-bar-color', '#404040');

    progressKonsumsi.addEventListener("input", function() {
        progressKonsumsi.style.setProperty('--progress-bar-color', '#80ff80');
    });

    const minumBtn = document.getElementById("minumBtn");
    minumBtn.style.padding = "10px";
    minumBtn.style.marginBottom = '40px';
    minumBtn.style.fontFamily = "Times New Roman";
    minumBtn.style.fontSize = '24px';
    minumBtn.style.color = "#E0FFFF"; 
    minumBtn.style.backgroundColor = "#00BFFF";
    minumBtn.style.border = "none";
    minumBtn.style.borderRadius = '15px';
    
    const menuTanaman = document.querySelector(".menuTanaman");
    menuTanaman.style.padding = '20px';
    menuTanaman.style.margin = '20px';

    const analitikTanaman = document.getElementById("analitikTanaman");
    analitikTanaman.style.padding = '20px';
    analitikTanaman.style.marginBottom = '20px';
    analitikTanaman.style.border = "2px solid #ccc";
    analitikTanaman.style.borderRadius = '15px';

    const totalAirMinum = document.getElementById("totalAirMinum");
    totalAirMinum.style.padding = '20px';
    totalAirMinum.style.border = "2px solid #ccc";
    totalAirMinum.style.borderRadius = '15px';
    
    
    const footer = document.querySelector("footer");
    footer.style.cssText = `
        padding: 20px;
        color: #404040;
        background-color: #01b23b;
        border-top: 8px solid #80ff80;
    `;
    
});
