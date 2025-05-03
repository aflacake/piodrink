
function bukaDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("PiodrinkDB", 1);

        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            db.createObjectStore("konsumsiHarian", { keyPath: "tanggal" });
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

function ambilDataHariIni(store, tanggal) {
    return new Promise((resolve, reject) => {
        const request = store.get(tanggal);
        request.onsuccess = () => resolve(request.result || { tanggal, total: 0 });
        request.onerror = reject;
    });
}

async function simpanKonsumsiHarian(jumlah) {
    const db = await bukaDatabase();
    const tx = db.transaction("konsumsiHarian", "readwrite");
    const store = tx.objectStore("konsumsiHarian");
    const tanggal = new Date().toISOString().split("T")[0];

    const data = await ambilDataHariIni(store, tanggal);
    data.total += jumlah;

    store.put(data);
    tx.oncomplete = () => db.close();
}
