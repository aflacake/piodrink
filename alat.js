console.log("Bahasa Browser" + navigator.language);

// Status koneksi
document.addEventListener("DOMContentLoaded", function() {
function checkConnection() {
    const tidakAdaKoneksiDiv = document.getElementById("tidakAdaKoneksi");
    if (navigator.onLine) {
        tidakAdaKoneksiDiv.style.display="none";
    } else {
        tidakAdaKoneksiDiv.style.display="block";
    }
}
checkConnection();
window.addEventListener('online', checkConnection);
window.addEventListener('offline', checkConnection);
});
