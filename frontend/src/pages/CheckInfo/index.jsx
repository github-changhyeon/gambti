import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import $ from 'jquery';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

export default function CheckInfo() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const [num, setNum] = useState(1);

  const [value, setValue] = useState('');

  const [checked, setChecked] = useState([]);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('선택해주세요.');

  const handleChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };

  const handleNext = (event) => {
    if (value == '') {
      setHelperText('선택 후 다음으로 이동 가능합니다.');
      setError(true);
    } else {
      setChecked([...checked, value]);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setNum((num) => num + 1);
      setValue('');
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
  };

  var step = {
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
  };

  function getSteps() {
    return ['Gender', 'Age Group', 'Price Range'];
  }

  useEffect(() => {
    if (num <= 3) {
      $('.title').html(step[num]['title']);

      if (num == 1) {
        $('.option_gender').show();
        $('.option_age').hide();
        $('.option_price').hide();
      } else if (num == 2) {
        $('.option_gender').hide();
        $('.option_age').show();
        $('.option_price').hide();
      } else if (num == 3) {
        $('.option_gender').hide();
        $('.option_age').hide();
        $('.option_price').show();
      }

      // $('.option').attr('defaultValue', step[num]['option']['A']);
      // $('.option').attr('label', step[num]['option']['A']);
      // $('.option').attr('value', step[num]['option']['A']);

      // setValue(step[num]['option']['A']);
      // setLabel(step[num]['option']['A']);
    } else if (num == 4) {
      console.log(checked);
    }
  }, [num]);

  return (
    <div className={styles.background}>
      <div className={styles.stepper_root}>
        <Stepper alternativeLabel activeStep={activeStep}>
          {steps.map((index) => (
            <Step key={index}>
              <StepLabel>{index}</StepLabel>
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
                  <FormControl component="fieldset" error={error}>
                    <RadioGroup
                      aria-label="option"
                      value={value}
                      name="customized-radios"
                      onChange={handleChange}
                    >
                      <p className="option_gender">
                        <FormControlLabel
                          value={step[num]['value']['A']}
                          control={<Radio />}
                          label={step[num]['label']['A']}
                        />
                        <FormControlLabel
                          value={step[num]['value']['B']}
                          control={<Radio />}
                          label={step[num]['label']['B']}
                        />
                      </p>
                      <p className="option_age">
                        <FormControlLabel
                          value={step[num]['value']['A']}
                          control={<Radio />}
                          label={step[num]['label']['A']}
                        />
                        <FormControlLabel
                          value={step[num]['value']['B']}
                          control={<Radio />}
                          label={step[num]['label']['B']}
                        />
                        <FormControlLabel
                          value={step[num]['value']['C']}
                          control={<Radio />}
                          label={step[num]['label']['C']}
                        />
                        <FormControlLabel
                          value={step[num]['value']['D']}
                          control={<Radio />}
                          label={step[num]['label']['D']}
                        />
                      </p>
                      <p className="option_price">
                        <FormControlLabel
                          value={step[num]['value']['A']}
                          control={<Radio />}
                          label={step[num]['label']['A']}
                        />
                        <FormControlLabel
                          value={step[num]['value']['B']}
                          control={<Radio />}
                          label={step[num]['label']['B']}
                        />
                        <FormControlLabel
                          value={step[num]['value']['C']}
                          control={<Radio />}
                          label={step[num]['label']['C']}
                        />
                        <FormControlLabel
                          value={step[num]['value']['D']}
                          control={<Radio />}
                          label={step[num]['label']['D']}
                        />
                        <FormControlLabel
                          value={step[num]['value']['E']}
                          control={<Radio />}
                          label={step[num]['label']['E']}
                        />
                        <FormControlLabel
                          value={step[num]['value']['F']}
                          control={<Radio />}
                          label={step[num]['label']['F']}
                        />
                      </p>
                    </RadioGroup>
                    <FormHelperText style={{ textAlign: 'center' }}>{helperText}</FormHelperText>
                  </FormControl>
                </div>
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
                  {activeStep === steps.length - 1 ? '등록' : '다음'}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
});
