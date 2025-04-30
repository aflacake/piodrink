document.addEventListener('DOMContentLoaded', function () {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.fontFamily = "Times New Roman";
    document.body.style.backgroundColor = "";

    document.querySelector("header").style.display = "flex";
    document.querySelector("header").style.flexDirection = "column"
    document.querySelector("header").style.textAlign = "center";
    document.querySelector("header").style.justifyContent = "center";
    document.querySelector("header").style.borderBottom = "8px solid #80ff80"
    document.querySelector("header").style.padding = '20px';
    document.querySelector("header > p").style.marginTop = '-20px';
    document.querySelector("header").style.color = "#80ff80";
    document.querySelector("header").style.backgroundColor = "#01b23b";

   const navbar = document.getElementById("navbar");
   
   navbar.style.display = "flex";
   navbar.style.flexDirection = "column";
   navbar.style.width = '50px';
   navbar.style.padding = '10px';
   navbar.style.height = '100vh';
   navbar.style.top = '0';
   navbar.style.right = '0';
   navbar.style.backgroundColor = "white";
   navbar.style.justifyContent = "flex-start";
   navbar.style.alignItems = "flex-start";
   navbar.style.position = "fixed";
   
   const linkNavbar = navbar.querySelectorAll("a");
   linkNavbar.forEach(link => {
       link.style.display = "block";
       link.style.width = '100%';
       link.style.padding = '10px';
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

    const kontenTentang = document.querySelector(".tentang");
    kontenTentang.style.padding = '20px';
    kontenTentang.style.margin = '20px';
    
    const tautan = document.querySelectorAll(".tentang a");
    tautan.forEach(link => {
        link.style.textDecoration = "none";
        link.style.color = "#01b23b";
    });

    document.querySelector("footer").style.padding = '20px';
    document.querySelector("footer").style.color = "#80ff80";
    document.querySelector("footer").style.backgroundColor = "#01b23b";
    document.querySelector("footer").style.borderTop = "8px solid #80ff80";
});
