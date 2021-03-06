import { useState } from 'react';

const daysShortArr = [
  'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'
];

const daysArr = [
  'Domimgo','Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sabado'
];

const monthNamesArr = [
  'Janeiro', 'Fevereiro', 'Março', 'abril',
  'Maio', 'Junho', 'Julho', 'Agosto',
  'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const useCalendar = (daysShort = daysShortArr, monthNames = monthNamesArr) => {
  const today = new Date();
  const todayFormatted = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  const daysInWeek = [1, 2, 3, 4, 5, 6, 0];
  const [selectedDate, setSelectedDate] = useState(today);
  const selectedMonthLastDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
  const prevMonthLastDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0);
  const daysInMonth = selectedMonthLastDate.getDate();
  const firstDayInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
  const startingPoint = daysInWeek.indexOf(firstDayInMonth) + 1;
  let prevMonthStartingPoint = prevMonthLastDate.getDate() - daysInWeek.indexOf(firstDayInMonth) + 1;
  let currentMonthCounter = 1;
  let nextMonthCounter = 1;
  const rows = 6;
  const cols = 7;
  const calendarRows = {};

  for(let i = 1; i < rows + 1; i++) {
    for(let j = 1; j < cols + 1; j++) {
      if(!calendarRows[i]) {
        calendarRows[i] = [];
      }

      if(i === 1) {
        if(j < startingPoint) {
          calendarRows[i] = [...calendarRows[i], {
            classes: 'in-prev-month',
            date: `${prevMonthStartingPoint}-${selectedDate.getMonth() === 0 ? 12 : selectedDate.getMonth()}-${selectedDate.getMonth() === 0 ? selectedDate.getFullYear() - 1 : selectedDate.getFullYear()}`,
            value: prevMonthStartingPoint
          }];
          prevMonthStartingPoint++;
        }else {
          calendarRows[i] = [...calendarRows[i], {
            classes: '',
            date: `${currentMonthCounter}-${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`,
            value: currentMonthCounter
          }];
          currentMonthCounter++;
        }
      }else if( i > 1 && currentMonthCounter < daysInMonth + 1 ) {
        calendarRows[i] = [...calendarRows[i], {
          classes: '',
          date: `${currentMonthCounter}-${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`,
          value: currentMonthCounter
        }];
        currentMonthCounter++;
      }else {
        calendarRows[i] = [...calendarRows[i], {
          classes: 'in-next-month',
          date: `${nextMonthCounter}-${selectedDate.getMonth() + 2 === 13 ? 1 : selectedDate.getMonth() + 2}-${selectedDate.getMonth() + 2 === 13 ? selectedDate.getFullYear() + 1 : selectedDate.getFullYear()}`,
          value: nextMonthCounter
        }];
        nextMonthCounter++;
      }
    }
  }

  const getPrevMonth = (props) => {
    setSelectedDate(prevValue => new Date(prevValue.getFullYear(), prevValue.getMonth() - 1, 1));
    if (props?.week) props.week((new Date(selectedDate.getFullYear(), selectedDate.getMonth(), -1)).getDate())
  }

  const getNextMonth = (props) => {
    console.log()
    // if (props?.num==12) return setSelectedDate(prevValue => new Date(prevValue.getFullYear(), 12, 1));
    if (props?.num||props?.num==0) return setSelectedDate(prevValue => new Date(prevValue.getFullYear(), props.num, 1));
    setSelectedDate(prevValue => new Date(prevValue.getFullYear(), prevValue.getMonth() + 1, 1));
  }

  const getTodayMonth = () => {
    setSelectedDate(new Date());
  }

  return {
    daysShort,
    daysArr,
    monthNames,
    todayFormatted,
    calendarRows,
    selectedDate,
    getPrevMonth,
    getNextMonth,
    getTodayMonth
  }
}

export default useCalendar;
