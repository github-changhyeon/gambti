import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import ButtonComp from 'src/components/ButtonComp/ButtonComp';
import { useHistory } from 'react-router';
import routerInfo from 'src/constants/routerInfo';
import $ from 'jquery';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import LinearProgress from '@material-ui/core/LinearProgress';

export default function CheckGambti() {
  const classes = useStyles();

  const history = useHistory();

  // const goLink = (event) => {
  //   history.push('/checkgambti');
  // };

  const [num, setNum] = useState(1);

  const [questionTitle, setQuestionTitle] = useState('문제');
  const [type, setType] = useState('EI');
  const [buttonA, setButtonA] = useState('Primary');
  const [buttonB, setButtonB] = useState('Primary');
  const [valueEI, setValueEI] = useState(0);
  const [valueSN, setValueSN] = useState(0);
  const [valueTF, setValueTF] = useState(0);
  const [valueJP, setValueJP] = useState(0);

  const [percent, setPercent] = useState(1);
  var q = {
    1: { title: '문제 1번', type: 'EI', A: '질문A', B: '질문B' },
    2: { title: '문제 2번', type: 'EI', A: '질문A', B: '질문B' },
    3: { title: '문제 3번', type: 'EI', A: '질문A', B: '질문B' },
    4: { title: '문제 4번', type: 'SN', A: '질문C', B: '질문D' },
    5: { title: '문제 5번', type: 'SN', A: '질문C', B: '질문D' },
    6: { title: '문제 6번', type: 'SN', A: '질문C', B: '질문D' },
    7: { title: '문제 7번', type: 'TF', A: '질문E', B: '질문F' },
    8: { title: '문제 8번', type: 'TF', A: '질문E', B: '질문F' },
    9: { title: '문제 9번', type: 'TF', A: '질문E', B: '질문F' },
    10: { title: '문제 10번', type: 'JP', A: '질문G', B: '질문H' },
    11: { title: '문제 11번', type: 'JP', A: '질문G', B: '질문H' },
    12: { title: '문제 12번', type: 'JP', A: '질문G', B: '질문H' },
  };
  var result = {
    ISTJ: { gambti: '청렴결백 논리주의자', explain: 'ISTJ 설명', img: '/images/joystick.png' },
    ISFJ: { gambti: '용감한 수호자', explain: 'ISFJ 설명', img: '/images/joystick.png' },
    INFJ: { gambti: '선의의 옹호자', explain: 'INFJ 설명', img: '/images/joystick.png' },
    INTJ: { gambti: '용의주도한 전략가', explain: 'INTJ 설명', img: '/images/joystick.png' },
    ISTP: { gambti: '만능 재주꾼', explain: 'ISTP 설명', img: '/images/joystick.png' },
    ISFP: { gambti: '호기심 많은 예술가', explain: 'ISFP 설명', img: '/images/joystick.png' },
    INFP: { gambti: '열정적인 중재자', explain: 'INFP 설명', img: '/images/joystick.png' },
    INTP: { gambti: '논리적인 사색가', explain: 'INTP 설명', img: '/images/joystick.png' },
    ESTP: { gambti: '모험을 즐기는 사업가', explain: 'ESTP 설명', img: '/images/joystick.png' },
    ESFP: { gambti: '자유로운 영혼의 연예인', explain: 'ESFP 설명', img: '/images/joystick.png' },
    ENFP: { gambti: '재기발랄한 활동가', explain: 'ENFP 설명', img: '/images/joystick.png' },
    ENTP: { gambti: '논쟁을 즐기는 변론가', explain: 'ENTP 설명', img: '/images/joystick.png' },
    ESTJ: { gambti: '엄격한 관리자', explain: 'ESTJ 설명', img: '/images/joystick.png' },
    ESFJ: { gambti: '사교적인 외교관', explain: 'ESFJ 설명', img: '/images/joystick.png' },
    ENFJ: { gambti: '정의로운 사회운동가', explain: 'ENFJ 설명', img: '/images/joystick.png' },
    ENTJ: { gambti: '대담한 통솔자', explain: 'ENTJ 설명', img: '/images/joystick.png' },
  };
  // 시작 버튼을 눌렀을 때
  function start() {
    $('.start').hide();
    $('.question').show();
    next();
  }

  const clickButtonA = () => {
    var nowType = q[num - 1]['type'];
    if (nowType == 'EI') {
      setValueEI(valueEI + 1);
    } else if (nowType == 'SN') {
      setValueSN(valueSN + 1);
    } else if (nowType == 'TF') {
      setValueTF(valueTF + 1);
    } else if (nowType == 'JP') {
      setValueJP(valueJP + 1);
    }
    next();
  };

  const clickButtonB = () => {
    next();
  };

  // 다음 문제로 이동
  function next() {
    // if (num == 13) {
    // $('.question').hide();
    // $('.result').show();
    // // mbti 구하는 최종 로직
    // var mbti = '';
    // valueEI < 2 ? (mbti += 'I') : (mbti += 'E');
    // valueSN < 2 ? (mbti += 'N') : (mbti += 'S');
    // valueTF < 2 ? (mbti += 'F') : (mbti += 'T');
    // valueJP < 2 ? (mbti += 'P') : (mbti += 'J');
    // alert(mbti);
    // $('.img').attr('src', result[mbti]['img']);
    // $('.gambti').html(result[mbti]['gambti']);
    // $('.explain').html(result[mbti]['explain']);
    // } else {
    // 문제랑 버튼들이 다음 문제에 해당하는 것으로 변경
    // $('.progress-bar').attr('style', 'width: calc(100/12*' + num + '%)');
    if (num < 13) {
      setQuestionTitle(q[num]['title']);
      setType(q[num]['type']);
      setButtonA(q[num]['A']);
      setButtonB(q[num]['B']);
      setPercent((100 / 12) * num);
      console.log(percent);
    }
    setNum(num + 1);
    // }
  }

  useEffect(() => {
    if (num == 14) {
      $('.question').hide();
      $('.result').show();
      // mbti 구하는 최종 로직
      var mbti = '';
      valueEI < 2 ? (mbti += 'I') : (mbti += 'E');
      valueSN < 2 ? (mbti += 'N') : (mbti += 'S');
      valueTF < 2 ? (mbti += 'F') : (mbti += 'T');
      valueJP < 2 ? (mbti += 'P') : (mbti += 'J');
      alert(mbti);
      $('.result_img').attr('src', result[mbti]['img']);
      $('.gambti').html(result[mbti]['gambti']);
      $('.explain').html(result[mbti]['explain']);
    }
  }, [num]);

  return (
    <div className={styles.background}>
      <div>
        {/* 시작 화면 */}
        <article className="start">
          <div className={styles.start_title}>
            <div>Let's find your</div>
            <img className={styles.start_logo} src="/images/gambti/gambti_logo.png" alt="logo" />
          </div>
          <ButtonComp size="xlarge" textvalue="START" color="#CCFF00" onClick={start}></ButtonComp>
        </article>
        {/* 문제 화면 */}
        <article className="question" style={{ display: 'none' }}>
          <div className={styles.question_top_text}>
            What is your
            <img
              className={styles.question_top_icon}
              src="/images/gambti/gambti_logo.png"
              alt="logo"
            />
            ?
          </div>
          {/* Progress Bar */}
          <div className={classes.progress}>
            <BorderLinearProgress variant="determinate" value={percent} />
          </div>
          <div className={styles.question_title}>
            <div className={styles.question_title_deco} />
            <div className={styles.question_title_text}>{questionTitle}</div>
            <div className={styles.question_title_deco} />
          </div>
          <p style={{ display: 'none' }}>{type}</p>

          <div className={styles.buttons}>
            <div className={styles.button} onClick={clickButtonA}>
              {buttonA}
            </div>
            <div className={styles.button} onClick={clickButtonB}>
              {buttonB}
            </div>
          </div>
        </article>
        {/* 결과 화면 */}
        <article className="result" style={{ display: 'none' }}>
          <div className={styles.result_title}>
            This is your
            <img
              className={styles.question_top_icon}
              src="/images/gambti/gambti_logo.png"
              alt="logo"
            />
            !
          </div>
          {/* 결과 이미지 */}
          {/* <img className={styles.result_img} src="/images/joystick.png" alt="gambti" /> */}
          <div className={styles.result_concept_container}>
            <div className={styles.result_concept_deco}>
              <div
                className={styles.result_concept_deco_bar}
                style={{ transform: 'rotate(-30deg)' }}
              />
              <div
                className={styles.result_concept_deco_bar}
                style={{ transform: 'rotate(30deg)' }}
              />
            </div>
            <div className={styles.result_concept}>
              당신은
              <div className="gambti" style={{ display: 'inline-block', paddingLeft: '10px' }}>
                유형 이름
              </div>
              !!
            </div>
            <div className={styles.result_concept_deco}>
              <div
                className={styles.result_concept_deco_bar}
                style={{ transform: 'rotate(210deg)' }}
              />
              <div
                className={styles.result_concept_deco_bar}
                style={{ transform: 'rotate(150deg)' }}
              />
            </div>
          </div>
          <div className={styles.result_detail}>
            <div className={styles.result_recommend}>
              <p className="explain">설명</p>
            </div>
            <div className={styles.result_genre}>
              <p className="explain">설명</p>
            </div>
          </div>

          <div className={styles.result_buttons}>
            <div className={styles.result_button}>
              <ButtonComp
                size="bold"
                textvalue="Home"
                color="#CCFF00"
                onClick={() => {
                  history.push(routerInfo.PAGE_URLS.HOME);
                }}
              ></ButtonComp>
            </div>
            <div className={styles.result_button}>
              <ButtonComp
                className={styles.result_button}
                size="bold"
                textvalue="Sign up"
                color="#CCFF00"
                onClick={() => {
                  history.push(routerInfo.PAGE_URLS.SIGNUP);
                }}
              ></ButtonComp>
            </div>
          </div>
        </article>
        {/* mbti 타입별 점수를 내부적으로 저장 */}
        {/* <p>{valueEI}</p>
        <p>{valueSN}</p>
        <p>{valueTF}</p>
        <p>{valueJP}</p> */}
      </div>
    </div>
  );
}

const BorderLinearProgress = withStyles({
  root: {
    width: '70%',
    height: 24,
    borderRadius: 2,
    margin: '0 auto',
  },
  colorPrimary: {
    backgroundColor: '#ddd',
  },
  bar: {
    borderRadius: 2,
    backgroundColor: '#f80',
  },
})(LinearProgress);

const useStyles = makeStyles({
  progress: {
    flexGrow: 1,
  },
});
