document.addEventListener('DOMContentLoaded', (event) => {
    // Lấy số lần truy cập từ Local Storage
    let visitCount = localStorage.getItem('visitCount');

    // Nếu chưa có giá trị thì đặt là 0
    if (visitCount === null) {
        visitCount = 0;
    }

    // Tăng số lần truy cập lên 1
    visitCount++;

    // Cập nhật giá trị trong Local Storage
    localStorage.setItem('visitCount', visitCount);

    // Hiển thị số lần truy cập trên trang
    document.getElementById('visitCount').innerText = visitCount;
});



window.addEventListener('load', function() {
    var audio = document.getElementById('background-music');
    audio.play();
});