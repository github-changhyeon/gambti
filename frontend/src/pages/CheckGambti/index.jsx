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
    1: {
      title: '게임 중 친구가 지인을 불러도 되냐고 물어본다.',
      type: 'EI',
      A: "'그래그래~ 게임 하면서 친해지는 것이지~'\r\n흔쾌히 알겠다고 한다.",
      B: "'아... 좀 어색할 것 같은데...'\r\n분위기상 거절하지 못하고 알겠다고 한다.",
    },
    2: {
      title: '게임에서 처음 만난 사람들과 소통을 하는 경우에',
      type: 'EI',
      A: "'즐겁게 하면 좋지~!!' 같이 하는 사람들과\r\n많이 대화하며 잡담을 즐긴다.",
      B: "'게임은 비즈니스 관계야!'\r\n필요하지 않은 말은 되도록 하지 않는다.",
    },
    3: {
      title: '오랜만에 정말 재미있는 게임을 찾았을 때',
      type: 'EI',
      A: "'어머어머 혼자 알고 있을 수는 없지!!'\r\n동네방네 인생 게임이라며 추천한다.",
      B: "'흠.. 재미있군...'\r\n정말 재미있다고 혼자 생각한다.",
    },
    4: {
      title: '게임을 하는 과정에서',
      type: 'SN',
      A: '숲보다 나무를 본다.',
      B: '나무보다 숲을 본다.',
    },
    5: {
      title: '흥미로운 신작 게임을 발견했다.',
      type: 'SN',
      A: "'이건 못참지 ~!!!'\r\n신작 게임을 바로 다운받는다.",
      B: '궁금하긴 하지만\r\n내가 원래 하던 게임을 한다.',
    },
    6: {
      title: '게임을 할 때 필요한 감각은',
      type: 'SN',
      A: '오감에 의존!!\r\n실제로 쌓아온 경험을 중요하게 생각한다.',
      B: '육감 내지 영감에 의존!!!\r\n몸이 가는 대로 행동하며 가능성을 추구한다.',
    },
    7: {
      title: '게임에서 패배하고 자책하는 친구를 볼 때',
      type: 'TF',
      A: '실제 게임에서 적용 가능한\r\n스킬들을 조언해주는 편이다.',
      B: '감정적으로 공감해주는 편이다.',
    },
    8: {
      title: '피곤한데 한 판 더 하자는 친구들을 볼 때',
      type: 'TF',
      A: '미안해 피곤해서 그만해야겠어~',
      B: '아유 그래그래 !! 한 판 더 하자 !!',
    },
    9: {
      title: '게임 도중 친구가 다른 사람과 시비가 붙었다. 하지만 내 친구가 먼저 잘못한 듯하다.',
      type: 'TF',
      A: '화가 난 친구에게\r\n그래도 너의 잘못이라고 말한다.',
      B: '화가 난 친구를 진정시킨 뒤\r\n돌려서 말한다.',
    },
    10: {
      title: '게임을 시작하기 전에',
      type: 'JP',
      A: '게임을 더 확실하게 즐기기 위해\r\n커뮤니티에서 게임 정보를 a-z 수집한다.',
      B: '튜토리얼도 정말 필요한 부분 외에는\r\nskip 하고 일단 시작한다.',
    },
    11: {
      title: '게임 진행에 있어서',
      type: 'JP',
      A: '게임의 진행, 세부 계획 등을 꼼꼼하게\r\n시뮬레이션을 돌리면서 게임을 하는 편이다.',
      B: '대략적인 진행사항을 정해두고\r\n유연하게 대처하는 것을 선호한다.',
    },
    12: {
      title: '안부 연락 도중 다음에 게임 한 번 같이 하자는 친구, 나의 답장은?',
      type: 'JP',
      A: '그래! 내일 저녁에 들어올 수 있어?',
      B: '좋아! 시간 날 때 한 번 하자~',
    },
  };
  var result = {
    ISTJ: {
      gambti: '소리 없는 영웅',
      maxim:
        '“가치 있는 것을 성취하기 위한 가장 큰 필수 핵심 세 가지는 첫째로, 열심히 일하기; 둘째, 끈기; 셋째, 상식을 갖추는 것이다.” - Thomas A. Edison',
      explain:
        '소리없는 영웅은 대한민국에 가장 많이 분포되어있는 유형으로, 체계적이고 정확하며 책임감이 뛰어나 맡은 일을 끝까지 해내는 조직에 꼭 필요한 사람입니다. 집중력과 끈기, 노력이 요구되는 반복적인 작업을 잘 하고 원리원칙주의자로서 사실에 근거하여 사고합니다.',
    },
    ISFJ: {
      gambti: '진정한 동반자',
      maxim:
        '"아직 이 세상엔 선이 남아 있다는 믿음이겠죠. 그리고 그건 싸울 가치가 있는 것이고요." - Sam(반지의 제왕)',
      explain:
        '진정한 동반자는 주변사람을 한결같이 아껴주는 사람입니다. 상대방의 이야기에 경청하며 은혜를 잊지 않는 의리파이지만 본인의 고민이나 감정을 잘 드러내지 않아 남 모르게 스트레스를 받곤 합니다. 소중한 사람을 위해서라면 희생을 마다하지 않으며 혹여 자신이 피해를 입더라도 갈등을 피하기 위해 양보를 많이 합니다.',
    },
    INFJ: {
      gambti: '선의의 선지자',
      maxim:
        '"모든 인간은 창의적인 이타주의의 빛 속을 걸을 것인지, 아니면 파괴적인 이기주의의 노선을 걸을 것인지 중 하나를 선택해야 합니다." - Martin Luther King',
      explain:
        '선의의 선지자는 다소 내향적이나 감성적입니다. 미래에 대한 상상을 좋아하며 다른 사람의 내면을 꿰뚫어보는 재능이 있습니다. 전 세계에 1% 밖에 없는 인류애 넘치는 유형이지만 외유내강(外柔內剛) 겉은 부드러워 보이나 안은 누구보다 강인하며, 질풍경초 (疾風勁草) 자신의 신념 앞에서는 모진 바람에도 꺾이지 않는 풀처럼 끝까지 투쟁합니다.',
    },
    INTJ: {
      gambti: '치밀한 전략가',
      maxim: '“게임은 흥미로운 선택의 연속이다.” - Sid Mier',
      explain:
        '치밀한 전략가는 뛰어난 전략적 사고와 상상력을 바탕으로 머릿속에서 시뮬레이션을 돌릴 수 있는 뛰어난 안목을 가지고 있습니다. 그리고 게임 디자인부터 플레이까지 자신이 하면 더욱 잘 할 수 있다고 믿습니다. 때로는 다른 유형의 사람들과 함께 게임을 할 때 우월감을 느끼는 동시에 답답해하기도 합니다. 게임 전 공략을 찾아 볼 때가 많으며 자신의 플레이 하나 하나에 의미를 부여합니다. 그래서 자신이 세운 전략의 한계와 실용성을 시험해 볼 수 있는 전략게임이 가장 잘 맞습니다.',
    },
    ISTP: {
      gambti: '도전적인 완벽주의자',
      maxim: '“바람을 조정할 수는 없지만, 돛은 조정할 수 있습니다.” - Thomas S. Monson',
      explain:
        '도전적인 완벽주의자는 객관적이고 효율을 중시하는 원리원칙주의자입니다. 언뜻 보면 기계처럼 느껴질 수 있지만 역설적이게도 호기심이 많고 창의력이 뛰어나며 한계에 도전하는 것을 좋아하기 때문에 장인이 많습니다. 대체로 과묵하고 직설적이어서 사람들이 다가가기 힘들어하기도 합니다.',
    },
    ISFP: {
      gambti: '감각적인 예술가',
      maxim:
        '“꽃은 옆에 있는 꽃과의 경쟁을 생각하지 않습니다. 꽃은 그저 피어날 뿐입니다.” - Zen Shin',
      explain:
        '감각적인 예술가는 물 흐르듯이 살며 현재의 삶을 있는 그대로 즐기는 YOLO 정신을 가지고 있는 유형입니다. 얽매이는 것을 싫어하고 스스로 한계점을 정의하지 않아 무궁무진한 가능성이 있습니다. 경쟁보다는 화합과 협업을 선호하는 경향이 있으며 기존의 것을 재해석하고 새로운 것을 발견하는데에 재능이 있습니다.',
    },
    INFP: {
      gambti: '낭만적인 이상주의자',
      maxim:
        '“논리는 A에서 B로 갈 수 있게 한다. 상상력은 어디든지 갈 수 있게 한다.” - Albert Einstein',
      explain:
        '낭만적인 이상주의자는 긍정적이고 상냥한 성격의 이타주이자입니다. 겉으로는 조용하지만 타인을 생각하는 배려심이 깊어 남을 지배하거나 경쟁하는 것을 좋아하지 않는 반면, 자유로운 것을 좋아해 상상력이 뛰어나고 자신이 하는 일에 의미를 찾고자 하는 경향이 강합니다.',
    },
    INTP: {
      gambti: '논리적인 혁신가',
      maxim:
        '“지식을 많이 가지게 된다고 해서 경이감이나 신비감이 사라지는 것은 아니다. 언제나 그 이상의 신비가 존재한다.” - Anais Nin',
      explain:
        '논리적인 혁신가는 논리적이고 사고적이어서 생각이 많은 타입이지만 대체로 설명을 잘하는 편은 아닙니다. 평범함을 거부하며 어떠한 난재를 마주하더라도 이들만의 독특한 관점으로 해결합니다. 그래서 이들은 인류 역사의 수많은 철학적/과학적 발전을 이끌기도 했습니다. 흥미로운 주제에 사로잡힐 때에는 누구보다 열정적이지만 이로 인해 다른 것들이 전부 하찮아 보일 때도 있습니다.',
    },
    ESTP: {
      gambti: '화끈한 도박사',
      maxim: '“인생이란 대담한 모험이거나 아무것도 아니다.” - Helen, Keller',
      explain:
        '화끈한 도박사는 어디서든 적응을 잘하고 유머러스하여 어디서든 분위기 메이커입니다. 직접 경험하고 행동하는 것을 좋아하며 스릴있는 것과 자극적인 것을 좋아해 즉흥성이 높고 경쟁하는 것을 즐깁니다. 반면 효율성을 중요시하여 복잡하거나 간접적인 것을 좋아하지 않습니다. 반복되는 일상과 업무에 쉽게 싫증을 느끼기도 합니다.',
    },
    ESFP: {
      gambti: '최고의 엔터테이너',
      maxim: '“내일은 내일의 태양이 뜬다.” - Margaret Mitchell',
      explain:
        '최고의 엔터테이너는 사람들의 관심을 한 몸에 받는 것을 즐기며 미래를 생각하기보다 매 순간 즐거움을 찾는 단순한 면모를 가지고 있습니다. 계산된 행동이 아닌 순수한 호감으로 사람들에게 다가가기 때문에 주변 사람들에게 인기가 많습니다. 또 경쟁보다는 모두가 어우러져 서로를 응원하고 즐기는 밝은 분위기를 좋아합니다.',
    },
    ENFP: {
      gambti: '즉흥적인 이상가',
      maxim: '“방황하는 자들이 모두 길을 잃은 것은 아니다.” - J.R.R. Tolkien',
      explain:
        '즉흥적인 이상가는 사람들과 어울리기를 좋아하며 다양한 분야에 관심이 많습니다. 기존의 것에 얽매이지 않는 자유로운 영혼으로 어떠한 환경에서도 쉽게 적응 할 수 있으나 집중력이 부족하고 쉽게 질려하는 경향이 있습니다. 또 변화를 두려워하지 않기 때문에 위기대처능력이 뛰어납니다. 가끔은 혼자만의 시간을 필요로 해 갑작스럽게 잠수를 타기도 합니다.',
    },
    ENTP: {
      gambti: '유쾌한 혁명가',
      maxim:
        '“가시밭길이더라도 자주적 사고를 하는 이의 길을 가십시오. 비판과 논란에 맞서서 당신의 생각을 당당히 밝히십시오." - Thomas J. Watson',
      explain:
        '유쾌한 혁명가는 불합리한 전통을 거부하고 기존의 틀을 깨부수곤 합니다. 또 재치 있는 입담과 이를 지탱하는 풍부한 지식을 바탕으로 항상 논쟁의 중심에 있는 경우가 많으며 남들이 별다른 의구심을 품지 않을 때 “왜?” 라고 말할 수 있는 개척정신을 가지고 있습니다. 이 때문에 게임 내에서 가장 "트롤링"을 많이 하는 유형이지만 창의력이 넘치는 이들이 있기에 새로운 메타들이 나오는 것은 명백한 사실입니다.',
    },
    ESTJ: {
      gambti: '철저한 관리자',
      maxim:
        '“야망이 없다면 아무것도 시작하지 못한다. 행하지 않으면 아무것도 끝내지 못한다. 보상은 우리에게 주어지는 것이 아니라 우리가 획득해야 한다.” - Ralph Waldo Emerson',
      explain:
        '철저한 관리자는 실질적이고 현실감각이 뛰어나 일을 계획하고 추진시키는 능력이 뛰어납니다. 자기관리가 철저하고 의미없는 시간을 보내는 것을 싫어하기 때문에 게임을 ‘시간낭비’라며 비효율적으로 바라보는 경향이 있어 모든 유형들 중 가장 게임에 시간을 할애하지 않습니다.',
    },
    ESFJ: {
      gambti: '활발한 사교가',
      maxim:
        '“서로 용기를 북돋아 주고 치켜세우며 힘이 되어주세요. 한 사람이 받은 긍정의 에너지가 곧 모든 이에게 전달될 테니까요.” - Deborah Day',
      explain:
        '활발한 사교가는 마음씨가 따뜻하고 공감능력이 뛰어납니다. 모든 유형들 중 가장 외향적이고 사교성이 뛰어나 인싸중에 인싸로 인기가 많습니다. 혼자 있을 때보다 여럿이 같이 있을 때 에너지를 얻는 유형입니다. 개인의 이익보다 집단의 이익을 중요하게 생각하며 타인의 시선에 매우 민감해 SNS를 수시로 확인하곤 합니다.',
    },
    ENFJ: {
      gambti: '정의로운 주인공',
      maxim:
        '“나는 애정을 받을 엄청난 욕구와, 그것을 베풀 엄청난 욕구를 타고났다.” - Audrey Hepburn',
      explain:
        '정의로운 주인공은 인화를 중시하는 진정한 리더입니다. 사람들을 좋아하고 사회성이 뛰어나 항상 주변에 자신을 따르는 사람들에게 둘러 쌓인 만화영화의 주인공과 같은 유형입니다. 공감능력이 매우 뛰어나 동정심이 많고 타인의 이야기를 진정으로 들어주지만 정이 너무 많아서 상처를 받고 가슴앓이를 하기도 합니다. 남들에게는 관대하지만 본인에게는 엄격하여 책임감이 강한 스타일이며 여러분야에 관심이 많고 뭐든 직접 해봐야 직성이 풀리기 때문에 추진력이 강합니다. 그래서 그룹 내에서 자연스럽게 리더 역할을 맡을 때가 많습니다.',
    },
    ENTJ: {
      gambti: '천재적인 사령관',
      maxim: '“내 사전에 불가능이란 단어는 없다.” - Napoléon Bonaparte',
      explain:
        '천재적인 사령관은 넘치는 카리스마로 공동의 목표를 달성하기 위해 진두지휘합니다. 또 대를 위한 소의 희생을 아끼지 않는 냉철한 판단력을 바탕으로 획기적인 전략을 짤 수 있는 능력을 가졌습니다. 보통 사람이라면 포기할 만한 일이라도 끝까지 포기하지 않는 강한 의지의 소유자이기도 합니다.',
    },
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

  const [propsMbti, setPropsMbti] = useState('');
  const [propsMbtiSub, setPropsMbtiSub] = useState('');

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
      $('.result_img').attr('src', result[mbti]['img']);
      $('.gambti').html(result[mbti]['gambti']);
      $('.maxim').html(result[mbti]['maxim']);
      $('.explain').html(result[mbti]['explain']);
      setPropsMbti(mbti); // signup으로 넘겨줄 mbti
      setPropsMbtiSub(result[mbti]['gambti']); // signup으로 넘겨줄 mbti 설명
      console.log(mbti + ' ' + result[mbti]['gambti']); // 최종 결과 : mbti, 해당 mbti 역할
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
              <div className="gambti" style={{ display: 'inline-block', paddingLeft: '25px' }}>
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
              <div className={styles.result_maxim}>
                <p className="maxim">격언</p>
              </div>
              <div className={styles.result_explain}>
                <p className="explain">설명</p>
              </div>
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
                  history.push({
                    pathname: routerInfo.PAGE_URLS.SIGNUP,
                    state: { mbti: propsMbti, mbtiSub: propsMbtiSub },
                  });
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
