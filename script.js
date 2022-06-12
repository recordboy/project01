// 엘레베이터 만들기
let global = [];

window.onload = function () {
    init();
}

// 초기화
function init() {
    addEvent();
}

// 이벤트 추가
function addEvent() {

    const btnCreate = document.getElementById('btn_create');
    const btnElevator = document.getElementById('elevator_btn');



    btnCreate.addEventListener('click', function (e) {
        let data = getElevatorData();
        createElevator(data);
    });


    btnElevator.addEventListener('click', function (e) {
        let btnId = e.target.id;
        let btnIdx = Number(btnId.substring(9));
        moveElevator(btnIdx);
    });
    

}


// 엘레베이터 정보 가져오기
function getElevatorData() {

    let data = {};

    data.floorVal = document.getElementById('txt_floor').value;
    data.numberVal = document.getElementById('txt_number').value;

    // 유효성 검사
    // if (!data.floorVal || !data.numberVal) {
    //     alert('값을 넣어주세요');
    //     return;
    // }

    return data;
}

// 엘레베이터 만들기
function createElevator(data) {

    const elevator = document.getElementById('elevator');
    const elevatorBtn = document.getElementById('elevator_btn');

    var tower = null;
    var towerFloor = null;
    var towerBtn = null;
    var towerBtnTxt = '';

    // 엘레베이터 버튼 생성
    for (let i = data.numberVal; i > 0; i--) {

        // 엘레베이터 버튼 생성
        towerBtn = document.createElement('button');
        towerBtn.id = 'tower_btn' + i;
        towerBtnTxt = document.createTextNode(i + '층');
        towerBtn.appendChild(towerBtnTxt);
        elevatorBtn.appendChild(towerBtn);
    }

    // 엘레베이터 생성
    for (let i = 0; i < data.numberVal; i++) {

        // 엘레베이터 생성
        tower = document.createElement('div');
        tower.classList = 'tower';
        elevator.appendChild(tower);

        for (let j = data.floorVal; j > 0; j--) {
            towerFloor = document.createElement('div');

            // 각 층 값 넣기
            if (j === 1) {
                global.push(j);
                towerFloor.classList = 'on';
            }
            tower.appendChild(towerFloor);
        }
    }
}


function moveElevator(idx) {

    const elevator = document.getElementById('elevator');
    const elevatorChilds = elevator.childNodes;
    

    for (let i = 0; i < elevatorChilds.length; i++) {
        
    }
}




