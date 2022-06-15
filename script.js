function elevator() {

    const MOVE_TIME = 20;                                        // 엘레베이터 이동 속도
    const WAITING_TIME = 2000;                                   // 엘레베이터 대기 시간

    const elevator = document.getElementById('elevator');        // 엘레베이터 묶음
    const elevatorTower = elevator.childNodes;                   // 각 엘레베이터 타워
    const btnCreate = document.getElementById('btn_create');     // 엘레베이터 생성 버튼
    const btnElevator = document.getElementById('elevator_btn'); // 엘레베이터 층수 버튼

    let elevatorData = [];                                       // 각 엘리베이터 정보를 기록하는 배열
    let moveBln = true;                                          // 현재 이동 가능 여부

    // 이벤트 초기화
    addEvent();

    function addEvent() {

        // 엘레베이터 생성
        btnCreate.addEventListener('click', function (e) {

            // 엘레베이터 초기화
            while (elevator.hasChildNodes()) {
                elevator.removeChild(elevator.firstChild);
            }

            // 엘레베이터 버튼 초기화
            while (btnElevator.hasChildNodes()) {
                btnElevator.removeChild(btnElevator.firstChild);
            }


            let data = getElevatorData();
            createElevator(data);
        });

        // 엘레베이터 층수 버튼
        btnElevator.addEventListener('click', function (e) {
            let btnId = e.target.id;
            let btnIdx = Number(btnId.substring(9));

            moveElevator(btnIdx);

            // 버튼 비활성화, 이동이 불가한경우 클릭시 비활성화 안함
            if (moveBln) {
                e.target.disabled = true;
            }
        });
    }

    // 엘레베이터 정보 가져오기
    function getElevatorData() {

        let data = {};
        data.floorVal = document.getElementById('txt_floor').value;
        data.numberVal = document.getElementById('txt_number').value;

        // input 값이 없는 경우
        if (!data.floorVal || !data.numberVal) {
            alert('값을 넣어주세요');
            return;
        }

        // 인풋 초기화
        document.getElementById('txt_floor').value = '';
        document.getElementById('txt_number').value = '';

        return data;
    }

    // 엘레베이터 만들기
    function createElevator(data) {

        let tower = null;
        let towerFloor = null;
        let towerBtn = null;
        let towerBtnTxt = '';
        let room = null;
        let doorL = null;
        let doorR = null;

        // 엘레베이터 버튼 생성
        for (let i = data.numberVal; i > 0; i--) {

            // 엘레베이터 버튼 생성
            towerBtn = document.createElement('button');
            towerBtn.id = 'tower_btn' + i;
            towerBtnTxt = document.createTextNode(i + '층');
            towerBtn.appendChild(towerBtnTxt);
            btnElevator.appendChild(towerBtn);
        }

        // 각 엘레베이터 타워 생성
        for (let i = 0; i < data.numberVal; i++) {

            // 엘레베이터 타워 생성
            tower = document.createElement('div');
            tower.classList = 'tower';
            elevator.appendChild(tower);

            for (let j = data.floorVal; j > 0; j--) {

                // 각 타워 층 생성
                towerFloor = document.createElement('div');

                // 각 타워 층 값 넣기(각 타워 층 데이터 초기화)
                if (j === 1) {
                    elevatorData.push([j, false]);
                }

                // 각 타워 층 추가
                tower.appendChild(towerFloor);
            }

            // 엘레베이터 룸 생성
            room = document.createElement('div');
            doorL = document.createElement('div');
            doorR = document.createElement('div');
            room.classList = 'room';
            doorL.classList = 'door_l';
            doorR.classList = 'door_r';
            tower.appendChild(room);
            room.appendChild(doorL);
            room.appendChild(doorR);
        }
    }

    // 엘레베이터 이동
    function moveElevator(floorIdx) {

        function func(arr) {

            let floorArr = [];  // 각 엘레베이터 층 수 배열
            let near = 0;       // 배열중 가장 격차가 작은 수
            let nearIdx = 0;    // 격차가 작은수의 인덱스

            // 각 엘레베이터 층 수를 배열에 담는다
            for (let i = 0; i < arr.length; i++) {
                floorArr.push(elevatorData[i][0]);
            }

            recursion();

            // 가장 가까운 층 수 찾기
            function recursion() {

                // 배열중 가장 가까운 값 찾기
                near = getMinNum(floorArr, floorIdx);

                // 가장 가까운 값 배열의 인덱스
                nearIdx = floorArr.indexOf(near);

                // 가장 가까운 엘레베이터가 현재 층 수 일경우 제외(N)함
                if (near === floorIdx) {
                    floorArr.splice(nearIdx, 1, 'N');

                    // 다시 가장 가까운 층 수를 찾음(재귀호출)
                    recursion();
                }
            }

            // 격차가 작은수의 인덱스
            return nearIdx;
        }

        // 가장 가까운 엘레베이터 타워의 인덱스
        let towerIdx = func(elevatorTower);

        // 이동 가능 여부
        moveBln = true;

        // 이동이 불가한 경우
        if (towerIdx === -1) {
            moveBln = false;
            return;
        }

        // 가장 가까운 엘레베이터 이동
        if (elevatorData[towerIdx][1] === false) {
            moveAnimate(towerIdx, floorIdx);

            // 가장 가까운 엘레베이터가 이동중에는 다른 층수 클릭시 멈춰있는 엘레베이터 호출
        } else {
            for (let j = 0; j < elevatorTower.length; j++) {
                if (elevatorData[j][1] === false) {
                    moveAnimate(j, floorIdx);
                    return;
                }
            }
        }
        // 배열중 가장 가까운 값 찾기
        function getMinNum(arr, floorIdx) {

            let data = arr;
            let target = floorIdx;
            let near = 0;
            let abs = 0;
            let min = 50;

            for (let i = 0; i < data.length; i++) {

                if ((data[i] - target) < 0) {
                    abs = -(data[i] - target);
                } else {
                    abs = data[i] - target;
                }

                if (abs < min) {
                    min = abs;
                    near = data[i];
                }
            }

            // 가까운 값
            return near;
        }
    }

    // 엘레베이터 이동 모션
    function moveAnimate(towerIdx, floorIdx) {
        const room = elevatorTower[towerIdx].querySelector('.room'); // 선택된 타워의 엘베
        let moveY = (elevatorData[towerIdx][0] - 1) * 50;            // 현재 좌표(실시간 이동 좌표)
        let afterY = (floorIdx - 1) * 50;                            // 이동할 좌표

        room.classList.add('move');


        // 이동 인터벌
        let interval = setInterval(function () {
            elevatorData[towerIdx][1] = true;

            // 이동할 좌표가 현재 좌표보다 클경우 올라감
            if (moveY < afterY) {
                moveY++;

                // 이동할 좌표가 현재 좌표보다 작을경우 내려감
            } else {
                moveY--;
            }

            // 도달하면 엘레베이터 멈춤
            if (moveY === afterY) {
                stop();
            }

            // 이동
            room.style.bottom = moveY + 'px';

        }, MOVE_TIME);

        // 엘레베이터 멈춤
        function stop() {
            clearInterval(interval);
            console.log(elevatorData);
            room.classList.remove('move');
            room.classList.add('waiting');

            // 엘레베이터 대기
            waiting();
        }

        // 도착하고 2초동안 대기
        function waiting() {

            setTimeout(function () {
                room.classList.remove('waiting');
                elevatorData[towerIdx][0] = floorIdx;
                elevatorData[towerIdx][1] = false;
                console.log(elevatorData);

                let btnIdNum = '';

                for (let i = 0; i < btnElevator.childNodes.length; i++) {
                    btnIdNum = btnElevator.childNodes[i].id.substring(9);

                    if (Number(btnIdNum) === floorIdx) {
                        btnElevator.childNodes[i].disabled = false;
                    }

                }

            }, WAITING_TIME);
        }
    }
}

// 엘레베이터 함수 실행
window.onload = function () {
    elevator();
}
