function elevator() {

    // 각 엘리베이터 정보를 기록하는 배열
    let elevatorData = [];

    const elevator = document.getElementById('elevator');        // 엘레베이터 묶음
    const elevatorTower = elevator.childNodes;                   // 각 엘레베이터 타워
    const btnCreate = document.getElementById('btn_create');     // 엘레베이터 생성 버튼
    const btnElevator = document.getElementById('elevator_btn'); // 엘레베이터 층수 버튼

    // 이벤트 초기화
    addEvent();

    function addEvent() {

        // 
        btnCreate.addEventListener('click', function (e) {
            let data = getElevatorData();
            createElevator(data);
        });

        btnElevator.addEventListener('click', function (e) {


            let btnId = e.target.id;

            e.target.disabled = true;

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

        // input 값이 없는 경우
        if (!data.floorVal || !data.numberVal) {
            alert('값을 넣어주세요');
            return;
        }

        return data;
    }

    // 엘레베이터 만들기
    function createElevator(data) {

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
                    elevatorData.push([j, false]);
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


        function func(arr) {

            let floorArr = [];  // 각 엘레베이터 층 수 배열
            let near = 0;       // 배열중 가장 격차가 작은 수
            let nearIdx = 0;    // 격차가 작은수의 인덱스

            // 각 엘레베이터 층 수를 배열에 담는다
            for (let i = 0; i < arr.length; i++) {
                floorArr.push(elevatorData[i][0]);
            }

            // 재귀 호출
            recursion();
            function recursion() {

                near = getMinNum(floorArr, floorIdx);
                nearIdx = floorArr.indexOf(near);

                if (near === floorIdx) {
                    floorArr.splice(nearIdx, 1, 'N');
                    recursion();
                }

            }
            return nearIdx;
        }





        let targetIdx = func(elevatorTower);

        if (elevatorData[targetIdx][1] === false) {
            moveAnimate(targetIdx, floorIdx);

        } else {


            for (let j = 0; j < elevatorTower.length; j++) {


                if (elevatorData[j][1] === false) {


                    moveAnimate(j, floorIdx);
                    return;



                }
            }
        }

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

    function moveAnimate(towerIdx, floorIdx) {
        const room = elevatorTower[towerIdx].querySelector('.room'); // 선택된 타워의 엘베
        let moveY = (elevatorData[towerIdx][0] - 1) * 50;             // 현재 좌표(실시간 이동 좌표)
        let afterY = (floorIdx - 1) * 50;                            // 이동할 좌표

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

        }, 20);

        // 멈춤
        function stop() {
            clearInterval(interval);
            console.log(elevatorData);
            room.classList.add('waiting');

            // 대기
            waiting();

        }

        // 도착하고 2초동안 대기
        function waiting() {

            setTimeout(function () {
                room.classList.remove('waiting');
                elevatorData[towerIdx][0] = floorIdx;
                elevatorData[towerIdx][1] = false;
                console.log(elevatorData);

                const elevatorBtn = document.getElementById('elevator_btn');


                let btnIdNum = '';

                for (let i = 0; i < elevatorBtn.childNodes.length; i++) {

                    btnIdNum = elevatorBtn.childNodes[i].id.substring(9);

                    if (Number(btnIdNum) === floorIdx) {
                        elevatorBtn.childNodes[i].disabled = false;
                    }

                }


            }, 2000);
        }

    }

}


window.onload = function () {
    elevator();
}