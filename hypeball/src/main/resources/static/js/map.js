var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(37.521670, 126.990769), // 지도의 중심좌표
        level: 7 // 지도의 확대 레벨
    };

// 지도를 생성합니다.
var map = new kakao.maps.Map(mapContainer, mapOption);

// 마커 이미지의 이미지 주소입니다
var imageSrc = '/image/Group 3.png', // 마커이미지의 주소입니다
    imageSize = new kakao.maps.Size(30, 50), // 마커이미지의 크기입니다
    imageOption = {offset: new kakao.maps.Point(17, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

$(document).ready(function() {

    const url = window.location.href

    if (url.endsWith("/map/home")) {
        $.ajax({
            url: '/map/home',
            type: 'POST',
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    createMarker(data[i]);
                }
            },
            error: function () {
            }
        });
    } else if (url.endsWith("/member/myLike")) {
        $.ajax({
            url: '/member/myLike',
            type: 'POST',
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    createMarker(data[i]);
                }
            },
            error: function () {
            }
        });
    }
});

function createMarker(data) {
    // 마커 이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(data.lat, data.lng), // 마커를 표시할 위치
        title: data.name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage // 마커 이미지
    });

    // 커스텀 오버레이를 생성합니다
    var customOverlay = new kakao.maps.CustomOverlay({
        map: map,
        position: new kakao.maps.LatLng(data.lat, data.lng),
        content: '<div class="customoverlay" onclick="createModal('+ data.storeId +')" data-bs-toggle="modal" data-bs-target="#store-modal">' +
            '  <p>' +
            '    <span class="title">' + data.name + '</span>' +
            '  </p>' +
            '</div>',
        yAnchor: 1
    });
}





