- react-datepicker(v7.6.0)
```tsx
/*
	- https://github.com/Hacker0x01/react-datepicker/
	- https://reactdatepicker.com/
	- https://velog.io/@h1225hs/react-datepicker-%EA%B0%84%EB%8B%A8%ED%95%9C-%EC%82%AC%EC%9A%A9%EB%B0%A9%EB%B2%95
	- https://velog.io/@kkoom/React-Datepicker-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC%EC%97%90-%EC%BA%98%EB%A6%B0%EB%8D%94-%EC%95%84%EC%9D%B4%EC%BD%98-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
	- https://velog.io/@nahsooyeon/20220109
	- https://minsun309.tistory.com/entry/React-Datepicker
	- https://minf.tistory.com/entry/ReactTypeScript-react-datePicker-Icon%EA%B3%BC-%EA%B0%99%EC%9D%B4-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
	- 아이콘 위치는 제어 불가능
		- label 태그로 묶은 후 positioning으로 달력 아이콘 위치 고정 처리
			<label htmlFor="datePicker">
				<DatePicker id="datePicker />
				<Image />
			</label>
	- locale="ko" 적용을 위해서는 선행될 작업이 존재
		- pnpm add date-fns
		- import { ko } from "date-fns/esm/locale";
	- 커스텀 헤더 구현 및 한글화 가능하나 일정 상 추후 개발 예정
*/

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerSample = () => {
	const [startDate, setStartDate] = useState(new Date());
	const handleCalendarClose = () => console.log("Calendar closed");  
	const handleCalendarOpen = () => console.log("Calendar opened");
	const isWeekday = (date) => {
	    const day = getDay(date);    
	    return day !== 0 && day !== 6;  
	};
	
  return (
    <DatePicker 
	    // 현재 선택된 날짜
	    selected={startDate} 
	    // 날짜 변경 세터 함수
	    onChange={(date) => setStartDate(date)} 
	    // 아이콘 노출
	    showIcon
	    // 커스텀 아이콘 사용
	    icon={CalendarIcon}
	    // 아이콘 클릭 시 캘린더 오픈 제어
	    toggleCalendarOnIconClick
	    // 캘린더 열림 시 콜백 
	    onCalendarOpen={handleCalendarOpen}
	    // 캘린더 닫힘 시 콜백
	    onCalendarClose={handleCalendarClose}
	    // 스크롤 시 캘린더 닫힘
	    closeOnScroll={true}
	    // 연월일 포맷 정의
		dateFormat="yyyy/MM/dd"
		// 캘린더 내부 연월일 포맷 정의
		dateFormatCalendar="yyyy년 MM월"
		// 비활성화 처리
		disabled
		// 날짜 선택 후 캘린더 닫힘 제어 
		shouldCloseOnSelect={false}
		// 선택 불가 날짜 설정
		excludeDates={[new Date(), subDays(new Date(), 1)]}
		// 가능한 날짜만 선택 가능
		filterDate={isWeekday}
		// 한국 시간 적용
		locale="ko"
		// 오늘 날짜 기준으로 선택 가능한 이전 날짜 정의
		minDate={subDays(new Date(), 5)}
		// 오늘 날짜 기준으로 선택 가능한 이후 날짜 정의
		maxDate={addDays(new Date(), 3)}
		// 가이드 문구
		placeholderText="날짜를 선택하세요."
		// 클릭 시 오늘 날짜로 이동 제어
		todayButton="오늘"
		// 캘린더 열림 시 화살표 표시 제거
		showPopperArrow={false}
		
	    // 날짜 범위
	/>
  );
};
```