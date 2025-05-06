document.addEventListener('DOMContentLoaded', function () {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.fontFamily = "Times New Roman";
    document.body.style.backgroundColor = "";

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
       link.style.paddingTop = '20px';
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
    navbarAirPutih.style.marginTop = '50vh';
    navbarAirPutih.style.width = '100%';
    navbarAirPutih.style.paddingTop = '20px';

    document.querySelector("header").style.display = "flex";
    document.querySelector("header").style.flexDirection = "column"
    document.querySelector("header").style.textAlign = "center";
    document.querySelector("header").style.justifyContent = "center";
    document.querySelector("header").style.borderBottom = "8px solid #80ff80"
    document.querySelector("header").style.padding = '20px';
    document.querySelector("header > p").style.marginTop = '-20px';
    document.querySelector("header").style.color = "#80ff80";
    document.querySelector("header").style.backgroundColor = "#01b23b";

    const kontenTentang = document.querySelector(".tentang");
    kontenTentang.style.padding = '20px';
    kontenTentang.style.margin = '20px';
    
    const tautan = document.querySelectorAll(".tentang a");
    tautan.forEach(link => {
        link.style.textDecoration = "none";
        link.style.color = "#01b23b";
    });

    const penilaian = document.querySelector(".penilaian");
    penilaian.style.padding = '20px';
    penilaian.style.margin = '20px';
    penilaian.style.border = "2px solid #ccc";
    penilaian.style.borderRadius = '15px';

    const kontenPenilaian = document.getElementById("kontenPenilaian");
    kontenPenilaian.style.display = "flex";
    kontenPenilaian.style.flexDirection = "column";
    kontenPenilaian.style.padding = '20px';
    kontenPenilaian.style.margin = '20px';
    kontenPenilaian.style.border = "2px solid #ccc";
    kontenPenilaian.style.borderRadius = '15px';

    const rating = document.querySelector(".rating");
    rating.style.marginTop = '25px';

//    const ratingBintang = document.querySelectorAll(".rating .checked");
//    console.log("Jumlah bintang ditemukan:", ratingBintang.length);
//    ratingBintang.forEach(star => {
//        if (star && star.style) {
//        ratingBintang.style.color = "#01b23b";
//        }
//    });

    const listshare = document.querySelector(".listshare");
    listshare.style.padding = '20px';
    listshare.style.margin = '20px';
    listshare.style.border = "2px solid #ccc";
    listshare.style.borderRadius = '15px';
    
    const links = listshare.querySelectorAll("a");
    links.forEach(link => {
        link.style.textDecoration = "none";
        link.style.color = "#01b23b";
    });



    document.querySelector("footer").style.padding = '20px';
    document.querySelector("footer").style.color = "#80ff80";
    document.querySelector("footer").style.backgroundColor = "#01b23b";
    document.querySelector("footer").style.borderTop = "8px solid #80ff80";
});
