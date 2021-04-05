import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import $ from 'jquery';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { convertColorToString } from 'material-ui/utils/colorManipulator';

export default function CheckInfo() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const [num, setNum] = useState(1);

  const [value, setValue] = useState('');

  const [checked, setChecked] = useState([]);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('선택해주세요.');

  const [checkedTags, setCheckedTags] = useState([]);

  const handleChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };

  const handleNext = (event) => {
    if (num <= 3) {
      if (value == '') {
        setHelperText('선택 후 다음으로 이동 가능합니다.');
        setError(true);
      } else {
        setChecked([...checked, value]);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setNum((num) => num + 1);
        setValue('');
      }
    } else {
      if (checkedTags.length < 3) {
        setHelperText('3가지 이상 선택하세요.');
        setError(true);
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  //   setNum((num) => num - 1);
  // };

  const handleReset = () => {
    setError(false);
    setActiveStep(0);
    setNum(1);
    setChecked([]);
    setCheckedTags([]);
  };

  const [step, setStep] = useState({
    1: {
      title: '성별을 선택하세요.',
      value: { A: 'MALE', B: 'FEMALE' },
      label: { A: '남자', B: '여자' },
    },
    2: {
      title: '연령대를 선택하세요.',
      value: { A: '10', B: '20', C: '30', D: '40' },
      label: { A: '10대', B: '20대', C: '30대', D: '40대 이상' },
    },
    3: {
      title: '선호하는 가격대를 선택하세요.',
      value: {
        A: '0',
        B: '5000',
        C: '20000',
        D: '40000',
        E: '100000',
        F: '-1',
      },
      label: {
        A: '무료',
        B: '0 ~ 5천원',
        C: '5천원 ~ 2만원',
        D: '2 ~ 4만원',
        E: '4 ~ 10만원',
        F: '10만원 이상',
      },
    },
    4: {
      title: '관심있는 게임 태그 3가지 이상을 선택하세요.',
      tags: [
        { value: 19, label: 'Action' },
        { value: 9, label: 'Single player' },
        { value: 21, label: 'Adventure' },
        { value: 1, label: 'Simulation' },
        { value: 12, label: 'Strategy' },
        { value: 55, label: 'Casual' },
        { value: 15, label: 'RPG' },
        { value: 17, label: 'Multiplayer' },
        { value: 42, label: 'Atmospheric' },
        { value: 4, label: '2D' },
        { value: 28, label: 'Great Soundtrack' },
        { value: 36, label: 'Story Rich' },
        { value: 90, label: 'Anime' },
        { value: 48, label: 'Puzzle' },
        { value: 47, label: 'Co-op' },
        { value: 26, label: 'First-Person' },
        { value: 39, label: 'Difficult' },
        { value: 46, label: 'Funny' },
        { value: 61, label: 'Horror' },
      ],
    },
  });

  function getSteps() {
    return ['Gender', 'Age Group', 'Price Range', 'Tags'];
  }

  const onClickTag = (event, index_tag) => {
    const exists = checkedTags.find((c) => c === index_tag.value);
    if (exists)
      return setCheckedTags(checkedTags.filter((checkedTags) => checkedTags !== index_tag.value)); // 태그 선택 토글

    setCheckedTags([...checkedTags, index_tag.value]); // 선택 태그 추가
  };

  useEffect(() => {
    console.log('checkedTags: ' + checkedTags);
    console.log('checkedTags.length: ' + checkedTags.length);
  }, [checkedTags]);

  useEffect(() => {
    if (num <= 4) {
      $('.title').html(step[num]['title']);
    } else if (num == 5) {
      console.log(checked);
    }
  }, [num]);

  useEffect(() => {
    if (activeStep === steps.length) {
      console.log('성별: ' + checked[0]);
      console.log('연령: ' + parseInt(checked[1]));
      console.log('가격: ' + parseInt(checked[2]));
      console.log('태그: ' + checkedTags);
    }
  }, [activeStep]);

  return (
    <div className={styles.background}>
      <div className={styles.stepper_root}>
        <Stepper alternativeLabel activeStep={activeStep}>
          {steps.map((index_step) => (
            <Step key={index_step}>
              <StepLabel>{index_step}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <>
              <div className={styles.question_root}>
                <div className={styles.question_title}>
                  <p>모든 정보 등록이 완료되었습니다.</p>
                </div>
                <div style={{ color: 'white', listStyle: 'none' }}>
                  <li>성별 : {checked[0]}</li>
                  <li>연령대 : {checked[1]}</li>
                  <li>가격대 : {checked[2]}</li>
                  <li>
                    선호 태그 :{' '}
                    {checkedTags.map((t) => {
                      return t + ' / ';
                    })}
                  </li>
                </div>
              </div>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleReset}
                className={styles.button}
              >
                다시 선택
              </Button>
              <Button variant="contained" color="primary" className={styles.button}>
                회원가입
              </Button>
            </>
          ) : (
            <>
              <div className={styles.question_root}>
                <div className={styles.question_title}>
                  <p className="title">문제 제목</p>
                </div>
                <div className="option" style={{ color: 'white' }}>
                  {num === 1 && (
                    <FormControl component="fieldset" error={error}>
                      <RadioGroup
                        aria-label="option"
                        value={value}
                        name="customized-radios"
                        onChange={handleChange}
                        style={{ color: 'white' }}
                      >
                        <div className="option_gender">
                          <FormControlLabel
                            value={step[num]['value']['A']}
                            control={<NeonRadio />}
                            label={step[num]['label']['A']}
                          />
                          <FormControlLabel
                            value={step[num]['value']['B']}
                            control={<NeonRadio />}
                            label={step[num]['label']['B']}
                          />
                        </div>
                      </RadioGroup>
                      <FormHelperText style={{ textAlign: 'center' }}>{helperText}</FormHelperText>
                    </FormControl>
                  )}

                  {num === 2 && (
                    <FormControl component="fieldset" error={error}>
                      <RadioGroup
                        aria-label="option"
                        value={value}
                        name="customized-radios"
                        onChange={handleChange}
                        style={{ color: 'white' }}
                      >
                        <div className="option_age">
                          <FormControlLabel
                            value={step[num]['value']['A']}
                            control={<NeonRadio />}
                            label={step[num]['label']['A']}
                          />
                          <FormControlLabel
                            value={step[num]['value']['B']}
                            control={<NeonRadio />}
                            label={step[num]['label']['B']}
                          />
                          <FormControlLabel
                            value={step[num]['value']['C']}
                            control={<NeonRadio />}
                            label={step[num]['label']['C']}
                          />
                          <FormControlLabel
                            value={step[num]['value']['D']}
                            control={<NeonRadio />}
                            label={step[num]['label']['D']}
                          />
                        </div>
                      </RadioGroup>
                      <FormHelperText style={{ textAlign: 'center' }}>{helperText}</FormHelperText>
                    </FormControl>
                  )}
                  {num === 3 && (
                    <FormControl component="fieldset" error={error}>
                      <RadioGroup
                        aria-label="option"
                        value={value}
                        name="customized-radios"
                        onChange={handleChange}
                        style={{ color: 'white' }}
                      >
                        <div className="option_price">
                          <FormControlLabel
                            value={step[num]['value']['A']}
                            control={<NeonRadio />}
                            label={step[num]['label']['A']}
                          />
                          <FormControlLabel
                            value={step[num]['value']['B']}
                            control={<NeonRadio />}
                            label={step[num]['label']['B']}
                          />
                          <FormControlLabel
                            value={step[num]['value']['C']}
                            control={<NeonRadio />}
                            label={step[num]['label']['C']}
                          />
                          <FormControlLabel
                            value={step[num]['value']['D']}
                            control={<NeonRadio />}
                            label={step[num]['label']['D']}
                          />
                          <FormControlLabel
                            value={step[num]['value']['E']}
                            control={<NeonRadio />}
                            label={step[num]['label']['E']}
                          />
                          <FormControlLabel
                            value={step[num]['value']['F']}
                            control={<NeonRadio />}
                            label={step[num]['label']['F']}
                          />
                        </div>
                      </RadioGroup>
                      <FormHelperText style={{ textAlign: 'center' }}>{helperText}</FormHelperText>
                    </FormControl>
                  )}
                </div>
                {num === 4 && (
                  <FormControl error={error}>
                    <div>
                      {step[4].tags.map((index_tag, idx) => {
                        return (
                          <button
                            className={
                              checkedTags.find((checkedTags) => checkedTags === index_tag['value'])
                                ? styles.button_true
                                : styles.button_false
                            }
                            value={index_tag}
                            key={idx}
                            onClick={(event) => onClickTag(event, index_tag)}
                          >
                            {index_tag['label']}
                          </button>
                        );
                      })}
                      <FormHelperText style={{ textAlign: 'center' }}>{helperText}</FormHelperText>
                    </div>
                  </FormControl>
                )}
              </div>
              <div>
                {/* <Button
                  variant="contained"
                  color="secondary"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={styles.button}
                >
                  이전
                </Button> */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={styles.button}
                >
                  {activeStep === steps.length ? '등록' : '다음'}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const NeonRadio = withStyles({
  root: {
    color: 'rgba(255,255,255,0.5)',
    '&$checked': {
      color: '#ccff00',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);
