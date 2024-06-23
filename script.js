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




















   // Hàm lấy dữ liệu từ Binance API
function fetchCryptoData() {
    var url = 'https://api.binance.com/api/v3/ticker/price';

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Đã xảy ra lỗi:', error);
        });
}

// Hàm hiển thị dữ liệu tỉ giá thị trường crypto
function displayCryptoData(data) {
    var cryptoPricesElement = document.getElementById('cryptoPrices');
    cryptoPricesElement.innerHTML = ''; // Xóa nội dung cũ trước khi thêm dữ liệu mới

    for (const coin of data) {
        var cryptoSymbol = coin.symbol;
        var cryptoPrice = parseFloat(coin.price).toFixed(2);
        var listItem = document.createElement('li');
        listItem.classList.add('crypto-item');
        listItem.innerHTML = `<span class="crypto-symbol">${cryptoSymbol}</span>: <span class="crypto-price">$${cryptoPrice}</span>`;
        cryptoPricesElement.appendChild(listItem);
    }
}

// Hàm cập nhật dữ liệu giá crypto
function updateCryptoPrices() {
    fetchCryptoData()
        .then(data => {
            displayCryptoData(data);
            displayLastUpdatedTime();
        });
}

// Hàm hiển thị thời gian cập nhật
function displayLastUpdatedTime() {
    var lastUpdatedElement = document.getElementById('lastUpdated');
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    var day = currentTime.getDate();
    var month = currentTime.getMonth() + 1; // Số tháng tính từ 0
    var year = currentTime.getFullYear();

    // Định dạng thời gian cập nhật
    var updateTime = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds) + ' ' + day + '/' + month + '/' + year;
    lastUpdatedElement.textContent = 'Dữ liệu được cập nhật lúc: ' + updateTime;
}

// Cập nhật giá crypto khi trang web được load lại
updateCryptoPrices();
// Cập nhật giá crypto mỗi 5 phút
setInterval(updateCryptoPrices, 300000); // 300000 milliseconds = 5 minutes
