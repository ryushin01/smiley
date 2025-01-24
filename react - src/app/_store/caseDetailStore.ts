import { atomWithStorage, createJSONStorage } from "jotai/utils";

const initResInfo = {
  resData: false,
  title: null,
  body: null,
};
const initValue: TDetailInfo = {
  regType: null,
  rgstrGbCd: "",
  bnkBranchCd: "",
  bnkBranchNm: null,
  bnkBrnchPhno: null,
  orgBrnchNm: null,
  clsBtnYn: "",
  crtDtm: "",
  dbtrBirthDt: "",
  dbtrHpno: "",
  dbtrNm: "",
  elregBizNo: null,
  elregReptOfficeNm: null,
  elregOfficeTelNo: null,
  execAmt: 0,
  execDt: "",
  kndCd: "",
  kndNm: null,
  lndPrdtNm: "",
  lndThngAddr: "",
  loanNo: "",
  slPrc: 0,
  statCd: "",
  statNm: "",

  progGbInfo: {
    currProgCd: "",
    currProgNum: "",
    currProgNm: "",
    currProgDesc: "",
    nextProgCd: "",
    nextProgNum: "",
    nextProgNm: "",
    nextProgDesc: "",
    prevProgList: [],
  },
  resDateRfdRegd: initResInfo,
  resEltnSecurd: initResInfo,
  resEstbsCntrFn: initResInfo,
  resEstmCnfm: initResInfo,
  resEstmRegd: initResInfo,
  resExecAmtChngd: initResInfo,
  resExecDateCheck: initResInfo,
  resLndAmtPay: initResInfo,
  resPayRegd: initResInfo,
  resRevisionCheck: initResInfo,
  resRfdRegd: initResInfo,
  resRgstrRegd: initResInfo,
};
const storage = createJSONStorage<TDetailInfo>(() => sessionStorage);
const caseDetailAtom = atomWithStorage<TDetailInfo>(
  "caseDetail",
  initValue,
  storage
);

export { caseDetailAtom };
