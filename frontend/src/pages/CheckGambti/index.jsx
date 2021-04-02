import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import ButtonComp from 'src/components/ButtonComp/ButtonComp';
import { useHistory } from 'react-router';
import routerInfo from 'src/constants/routerInfo';
import $ from 'jquery';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Signup from 'src/pages/Signup/index';

import LinearProgress from '@material-ui/core/LinearProgress';

export default function CheckGambti() {
  const classes = useStyles();

  const history = useHistory();

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
    1: { title: '게임 중 친구가 지인을 불러도 되냐고 물어본다.', type: 'EI', A: '\'그래그래~ 게임 하면서 친해지는 것이지~\'\r\n흔쾌히 알겠다고 한다.', B: '\'아... 좀 어색할 것 같은데...\'\r\n분위기상 거절하지 못하고 알겠다고 한다.' },
    2: { title: '게임에서 처음 만난 사람들과 소통을 하는 경우에', type: 'EI', A: '\'게임에서도 찐친을 만날 수 있지?\'\r\n같이 하는 사람들과 많이 대화하며 잡담을 즐긴다.', B: '\'게임은 비즈니스 관계야!\'\r\n필요하지 않은 말은 되도록 하지 않는다.' },
    3: { title: '오랜만에 정말 재미있는 게임을 찾았을 때', type: 'EI', A: '\'어머어머 혼자 알고 있을 수는 없지!!\'\r\n동네방네 인생 게임이라며 추천한다.', B: '\'흠.. 재미있군...\'\r\n정말 재미있다고 혼자 생각한다.' },
    4: { title: '게임을 하는 과정에서', type: 'SN', A: '숲보다 나무를 본다.', B: '나무보다 숲을 본다.' },
    5: { title: '흥미로운 신작 게임을 발견했다.', type: 'SN', A: '\'이건 못참지 ~!!!\'\r\n신작 게임을 바로 다운받는다.', B: '궁금하긴 하지만 내가 원래 하던 게임을 한다.' },
    6: { title: '게임을 할 때 필요한 감각은', type: 'SN', A: '오감에 의존!!\r\n실제로 쌓아온 경험을 중요하게 생각한다.', B: '육감 내지 영감에 의존!!!\r\n몸이 가는 대로 행동하며 가능성을 추구한다.' },
    7: { title: '게임에서 패배하고 자책하는 친구를 볼 때', type: 'TF', A: '실제 게임에서 적용 가능한\r\n스킬들을 조언해주는 편이다.', B: '감정적으로 공감해주는 편이다.' },
    8: { title: '피곤한데 한 판 더 하자는 친구들을 볼 때', type: 'TF', A: '미안해 피곤해서 그만해야겠어~', B: '아유 그래그래 !! 한 판 더 하자 !!' },
    9: { title: '게임 도중 친구가 다른 사람과 시비가 붙었다. 하지만 내 친구가 먼저 잘못한 듯하다.', type: 'TF', A: '화가 난 친구에게\r\n그래도 너의 잘못이라고 말한다.', B: '화가 난 친구를 진정시킨 뒤\r\n돌려서 말한다.' },
    10: { title: '게임을 시작하기 전에', type: 'JP', A: '게임을 더 확실하게 즐기기 위해\r\n커뮤니티에서 게임 정보를 a-z 수집한다.', B: '튜토리얼도 정말 필요한 부분 외에는\r\nskip 하고 일단 시작한다.' },
    11: { title: '게임 진행에 있어서', type: 'JP', A: '게임의 진행, 세부 계획 등을\r\n꼼꼼하게 시뮬레이션을 돌리면서 게임을 하는 편이다.', B: '대략적인 진행사항을 정해두고\r\n유연하게 대처하는 것을 선호한다.' },
    12: { title: '안부 연락 도중 다음에 게임 한 번 같이 하자는 친구, 나의 답장은?', type: 'JP', A: '그래! 내일 저녁에 들어올 수 있어?', B: '좋아! 시간 날 때 한 번 하자~' },
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
