(function($, window, document){



    const spa={
        init(){
            this.header();
            this.section1();
            this.section6();
            this.section4();
        },



        header(){
            //패럴랙스 구현

            //내려가면 배경 어두워지고, 높이도 짧아짐
            //pal-on, off 클래스 추가


            let newScroll=$(window).scrollTop();//스크롤 했을 때 좌표값 확인
            let oldScroll=newScroll;// 이전 스크롤값 저장용

            $(window).scroll(function(e){//스크롤 이벤트 발생하는 동안
                newScroll=$(window).scrollTop();

                if(newScroll-oldScroll > Math.abs(0)){
                    $('#header').addClass('pal-on');
                    $('#header').removeClass('pal-off');
                }
                if(newScroll===0){
                    $('#header').removeClass('pal-on');
                    $('#header').addClass('pal-off');
                }



            })
            

            console.log(newScroll);



        },
        section1(){

            let cnt=0;//카운트용
            let setId=0;//

            //1. 메인 슬라이드

            function mainSlide(){
                //선택자,         멈춤,  움직인다 , 왼쪽으로 보낸다 100%씩, 1초에
                $('.slide-wrap').stop().animate({left: `${-100*cnt}%`}, 1000, 'easeInOutExpo', function(){
                    if(cnt > 2) cnt=0;//슬라이드가 3개라 0 1 2, 초과하면 0으로 돌려줌
                    if(cnt < 0) cnt=2;//반대방향으로 이동하면 음수되지 말고 2로 돌려줌(마지막 슬라이드)
                    $('.slide-wrap').stop().animate({left: `${-100*cnt}%`}, 0); //처음으로 리턴
                })

                //원리 31231 에서 마지막 1까지 갔다가 cnt=3이었다가 0이 되면서 초기로 돌아가는데 이 때 시간을 0을 줘서 사람이 눈치 못채게 한다
                console.log(cnt);
                pageNation();
                

            }

            //2. 카운트함수
            function nextCount(){
                cnt++;
                mainSlide();//cnt변화시키고 메인슬라이드 함수에 전달
            }

            function prevCount(){
                cnt--;
                mainSlide();
            }

            //3.자동타이머 함수
            function autoTimer(){
                setId=setInterval(nextCount, 4000);//3초간격으로 실행
            }
            autoTimer();//로딩되면 일단 실행







            //페이지 함수부터

            function pageNation(){//이건 cnt가 돌아갈때마다 실행해줘야 하므로 메인슬라이드로 보내줌
                $('.page-btn').removeClass('on');//초기값이 1번 버튼에 on 클래스가 붙어있으므로 제거
                $('.page-btn').eq(cnt > 2 ? 0 : cnt).addClass('on');//2를 초과한다면 한 바퀴 넘어간 것이므로 0으로 초기화
            }


            //페이지 클릭한 부분으로 가게

            /* $('.page-btn').eq(0).on({
                click(e){
                    e.preventDefault();
                    clearInterval(setId);//클릭하는 순간은 정지하도록
                    cnt=1;//증감연산자 쓰면 안 됨 원하는 곳으로 가야하니까
                    mainSlide();//메인슬라이드에 연결해줘야 함. 나머지 페이지도 이하동문
                }
            }) */

            $('.page-btn').each(function(idx){
                $(this).on({//내가 선택한 클래스에 대해
                    click(e){
                        e.preventDefault();//새로고침 막기
                        clearInterval(setId);
                        cnt=idx;//선택한 클래스의 인덱스 넘버
                        mainSlide();
                        autoTimer();
                    }
                })


            })




        },

        //트리트먼트 페이드 인 페이드 아웃 구현
        section4(){
           const menuBtn=$('#section4 .menu-btn');
           const caseAddIn=$('#section4 .case');//case에 클래스 in을 추가할 변수
           let btnNumber=0;//버튼의 인덱스 넘버
           let caseHeight=0//트리트먼트 메뉴 상자
            //버튼 클릭 시 버튼의 인덱스 넘버 반환
            /* each함수 구문: 선택자.each(function(idx, item){
                함수 내용
            }) */
            
            //초기상태
            caseAddIn.css('display', 'none');
            caseAddIn.eq(0).fadeIn();

            menuBtn.each(
                function(idx){
                    //선택된 버튼에 대해(인덱스까지 구분됨)
                    
                    $(this).click(function(e){
                        caseAddIn.stop().fadeOut(100);
                        e.preventDefault();
                        menuBtn.removeClass('on');//모든 메뉴버튼에 대해 초기화
                        $(this).addClass('on');//해당버튼에 대해서
                        btnNumber=idx;//버튼넘버가 인덱스 넘버로 설정 됨
                        fadeFn();
                    })
                }
                
            )
             function fadeFn(){
                    caseAddIn.eq(btnNumber).stop().fadeIn(1000)
                } 


            
        },

        //카운터 함수
        section6(){
            const num=$('#section6 .num');//섹션6의 num클래스가 있는 태그 선택자
            let countNum=[7655, 65444, 5658, 55542277];
            let countSum=[0, 0, 0, 0];
            let setId=0;

            let numForComma=0;//,삽입용 변수

            //,찍기용 일단 급한대로 복붙
            const regexp=/(^\d+)(\d{3})/g;

            function commaFn(value){
                numForComma=String(value);//숫자를 문자열로
                while(regexp.test(String(numForComma))){
                    numForComma=numForComma.replace(regexp, '$1,$2');//반복해서 최대한 , 삽입하는 식
                    
                }
                return numForComma;
            }

            //카운터 계산용
            function countFn(){
                for(let i=0; i<countNum.length; i++){
                    countSum[i]+=(countNum[i]/1000);
                }
                if(countSum[0]>countNum[0]){//총합이 실제 값보다 커지면
                    clearInterval(setId);
                }
                for(let i=0; i<countNum.length; i++){
                    //n번째(인덱스기준)num클래스에 대해 내용물 삽입
                    num.eq(i).html(commaFn(Math.round(countSum[i])) )//합에서 반올림한 값을 전달해줌
                }
            }

            setId=setInterval(countFn, 1);
        }






    }



















    spa.init();//스파라는 객체에서 init이라는 메소드를 실행하겠다

})(jQuery, window, document);