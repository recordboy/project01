// 엘레베이터 만들기
// 일단 러프하게 작업

// 각 엘리베이터 정보를 기록하는 배열
let elevatorArr = [];

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

    // 테스트
    let data = getElevatorData();
    createElevator(data);

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

    let tower = null;
    let towerFloor = null;
    let towerBtn = null;
    let towerBtnTxt = '';
    let room = null;

    // 엘레베이터 버튼 생성
    for (let i = data.numberVal; i > 0; i--) {

        // 엘레베이터 버튼 생성
        towerBtn = document.createElement('button');
        towerBtn.id = 'tower_btn' + i;
        towerBtnTxt = document.createTextNode(i + '층');
        towerBtn.appendChild(towerBtnTxt);
        elevatorBtn.appendChild(towerBtn);
    }

    // 각 엘레베이터 타워 생성
    for (let i = 0; i < data.numberVal; i++) {

        // 엘레베이터 층 생성
        tower = document.createElement('div');
        tower.classList = 'tower';
        elevator.appendChild(tower);
        for (let j = data.floorVal; j > 0; j--) {
            towerFloor = document.createElement('div');

            // 각 층 값 넣기
            if (j === 1) {
                elevatorArr.push([j, false]);
            }
            tower.appendChild(towerFloor);
        }

        // 엘레베이터 룸 생성
        room = document.createElement('div');
        room.classList = 'room';
        tower.appendChild(room);
    }
}


function moveElevator(floorIdx) {

    // 엘레베이터 객체
    const elevator = document.getElementById('elevator');
    const elevatorTower = elevator.childNodes;

    for (let i = 0; i < elevatorTower.length; i++) {

        if (elevatorArr[i][0] !== floorIdx) {
            moveAnimate(i, floorIdx);
            return;
        }
    }
}

function moveAnimate(towerIdx, floorIdx) {

    // 엘레베이터 객체
    const elevator = document.getElementById('elevator');
    const elevatorTower = elevator.childNodes;

    // 선택된 타워의 엘베
    const room = elevatorTower[towerIdx].querySelector('.room');

    let moveCount = 0;
    let spaceNum = (floorIdx - 1) * 50;

    // 이동 인터벌
    let interval = setInterval(function() {
        elevatorArr[towerIdx][1] = true;
        moveCount++;
        room.style.bottom = moveCount + 'px';

        if (moveCount > spaceNum) {
            clearInterval(interval);
            elevatorArr[towerIdx][0] = floorIdx;
            elevatorArr[towerIdx][1] = false;
            console.log(elevatorArr)
        }

    }, 10);

}
